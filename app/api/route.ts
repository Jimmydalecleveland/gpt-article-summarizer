import OpenAI from 'openai'
import { parse } from 'node-html-parser'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET() {
  try {
    const res = await fetch('https://blog.jimmydc.com/git-bisect/')
    const text = await res.text()

    const root = parse(text)
    const title = root.querySelector('title')?.text
    const body = root.querySelector('body')?.text

    const chatCompletion = await openai.chat.completions.create({
      messages: [{
        role: 'user',
        content: `Summarize the following article for me using the first person point of view. The author is always Jimmy Cleveland. The title is: ${title}, and the body is ${body}`,
      }],
      // New model as of 2023-11-06
      model: 'gpt-3.5-turbo-1106',
    })

    console.dir(chatCompletion, { depth: null })

    return Response.json({ summary: chatCompletion.choices[0].message.content })
  } catch (err) {
    return Response.json({ error: err })
  }
}

