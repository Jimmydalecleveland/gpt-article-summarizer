'use client'
import * as React from "react"
import { ChatCompletionStream } from "openai/lib/ChatCompletionStream"
import invariant from 'tiny-invariant'

export default function Home() {
  const [summary, setSummary] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

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

            setIsLoading(true)
            setError(null)
            setSummary(' ') // Space so we always render "Summary:" title after first attempt
            const res = await fetch(`/api?url=${url}`)
            if (!res.ok || !res.body) {
              throw new Error(`Unexpected response: ${res.statusText}`)
            }
            const runner = ChatCompletionStream.fromReadableStream(res.body)

            /**
             * As each chunk of the stream comes in, we can simply update state
             * with the snapshot as it is what we have received so far. The delta
             * is the difference between the previous snapshot and the current
             * snapshot.
             */
            runner.on('content', (_delta, snapshot) => {
              setSummary(snapshot)
            })

            // Wait for the stream to finish to unset the loading state
            await runner.finalChatCompletion()
            setIsLoading(false)
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
          <h2 className="text-2xl">Summary: {isLoading && "Loading..."}</h2>
          <p className="text-xl">{summary}</p>
        </div>
      )}
    </main>
  )
}

