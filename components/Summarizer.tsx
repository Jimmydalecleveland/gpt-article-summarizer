'use client'
import * as React from 'react'
import { ChatCompletionStream } from "openai/lib/ChatCompletionStream"
import invariant from 'tiny-invariant'

type State = {
  summary: string
  error: string | null
  isLoading: boolean
}

type Action = 
  | { type: 'start' }
  | { type: 'update', payload: string }
  | { type: 'success' }
  | { type: 'error', payload: string }

const initialState: State = {
  summary: '',
  error: null,
  isLoading: false,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'start':
      // The `summary` has a space in the string for truthy checks to
      // always show the Summary title after the first submission attempt.
      return { ...state, isLoading: true, error: null, summary: ' ' }
    case 'update':
      return { ...state, summary: action.payload }
    case 'success':
      return { ...state, isLoading: false }
    case 'error':
      return { ...state, isLoading: false, error: action.payload }
    default:
      throw new Error('Unknown action type')
  }
}

export function Summarizer() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const formData = new FormData(event.currentTarget)
      const url = formData.get('url')
      invariant(typeof url === 'string', 'Expected a string for url')

      dispatch({ type: 'start' })

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
        dispatch({ type: 'update', payload: snapshot })
      })

      // Wait for the stream to finish to unset the loading state
      await runner.finalChatCompletion()
      dispatch({ type: 'success' })

    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: 'error', payload: err.message })
      } else {
        dispatch({ type: 'error', payload: String(err) })
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full max-w-2xl"
      >
        <label htmlFor="url" className="text-2xl">Enter a URL:</label>
        <input
          id="url"
          name="url"
          type="text"
          className="text-black rounded-lg p-2 m-2 self-stretch"
          defaultValue="https://blog.jimmydc.com/git-bisect/"
          required
        />
        {/* space character to avoid jumping button upon error render */}
        <p className="text-red-500">&nbsp;{state.error}</p>
        <button
          type="submit"
          className="border-2 border-white rounded-lg p-2 m-2"
        >
          Summarize
        </button>
      </form>

      {/* Summary */}
      {state.summary && (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl">
          <h2 className="text-2xl">Summary: {state.isLoading && "Loading..."}</h2>
          <p className="text-xl">{state.summary}</p>
        </div>
      )}
    </>
  )
}
