# Article Summarizer for Jimmy Cleveland's blog

## This repo is nothing special
I'm creating this purely as practice while looking at other people's projects to
see if there is anything I'm missing. It is just your standard API call to openai
that summarizes some content.

This could definitely be used for any articles, I'm just keeping it specific for 
the sake of simplicity. 

Hosted at: [](https://gpt-article-summarizer.vercel.app/)

### To run locally
You will need a `.env.local` with the openai API key. See the `.env.example`.

```bash
npm run dev
```

### Notes about the project
- Uses OpenAI's latest "cheap and fast" model (as of Nov 06, 2023): `gpt-3.5-turbo-1106`
- Uses OpenAI's streaming methods through their npm package.
- You could accomplish this functionality much easier with Vercel's `useChat`, I just wanted to see some of what was involved without it.
- `useReducer` is used for state management here, but debateably overkill. I just prefer it when multiple states are commonly updated together. 

