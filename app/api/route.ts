import { parse } from 'node-html-parser'

export async function GET() {
  try {
    const res = await fetch('https://blog.jimmydc.com/git-bisect/')
    const text = await res.text()

    const root = parse(text)
    const title = root.querySelector('title')?.text
    const body = root.querySelector('body')?.text

    return Response.json({ title: title, body: body })
  } catch (err) {
    return Response.json({ error: err })
  }
}

