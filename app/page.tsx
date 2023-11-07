'use client'
import * as React from "react"
import invariant from 'tiny-invariant'

export default function Home() {
  const [summary, setSummary] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)

  return (
    <main className="flex flex-col gap-24 items-center justify-between pt-24">
      <h1 className="text-4xl">JimmyDC Blog Article Summarizer</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault()
          try {
            const formData = new FormData(event.currentTarget)
            const url = formData.get('url')
            invariant(typeof url === 'string', 'Expected a string for url')

            const res = await fetch(`/api?url=${url}`)
            const data = await res.json()
            setSummary(data.summary)
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message)
            } else {
              setError(String(err))
            }
          }
        }}
        className="flex flex-col items-center justify-center w-full max-w-2xl"
      >
        <label htmlFor="url" className="text-2xl">Enter a URL:</label>
        <input
          id="url"
          name="url"
          type="text"
          className="text-black rounded-lg p-2 m-2 self-stretch"
        />
        {/* space character to avoid jumping button upon error render */}
        <p className="text-red-500">&nbsp;{error}</p>
        <button
          type="submit"
          className="border-2 border-white rounded-lg p-2 m-2"
        >
          Summarize
        </button>
      </form>

      {/* Summary */}
      {summary && (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl">
          <h2 className="text-2xl">Summary:</h2>
          <p className="text-xl">{summary}</p>
        </div>
      )}
    </main>
  )
}

