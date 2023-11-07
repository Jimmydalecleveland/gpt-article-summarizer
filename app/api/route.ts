import { parse } from 'node-html-parser'

export async function GET() {
  const res = await fetch('https://blog.jimmydc.com/git-bisect/')
  const text = await res.text()

  const root = parse(text)
  const title = root.querySelector('title')?.text
  const body = root.querySelector('body')?.text

  return Response.json({ title: title, body: body })
}

