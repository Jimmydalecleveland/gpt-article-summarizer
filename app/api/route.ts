import OpenAI from 'openai'
import { parse } from 'node-html-parser'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const allowedDomain = 'https://blog.jimmydc.com'

export async function GET(request: NextRequest) {
  // Get Search Param URL to scrape and ensure it exists.
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')
  if (!url) {
    return new Response('Please provide a full URL (including "https://").', { status: 400 })
  }

  // Parse the URL and ensure it is a valid URL.
  let parsedUrl: URL
  try {
    parsedUrl = new URL(url)
  } catch (_) {
    return new Response('Invalid URL.', { status: 400 })
  }

  if (parsedUrl.origin !== allowedDomain) {
    return new Response(
      'Invalid domain. Only `https://blog.jimmydc.com` is allowed.', 
      { status: 400 }
    )
  }

  try {
    const res = await fetch(url)
    const text = await res.text()

    const root = parse(text)
    const title = root.querySelector('title')?.text
    const body = root.querySelector('body')?.text

    const completion = await openai.chat.completions.create({
      stream: true,
      messages: [{
        role: 'user',
        content: `Summarize the following article for me, with a maximum of 2 paragraphs, using the first person point of view. The author is always Jimmy Cleveland. The title is: ${title}, and the body is ${body}`,
      }],
      // New model as of 2023-11-06
      model: 'gpt-3.5-turbo-1106',
    })

    return new Response(completion.toReadableStream())
  } catch (err) {
    return Response.json({ error: err })
  }
}

