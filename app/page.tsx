import { Summarizer } from "@/components/Summarizer";

export default function Home() {
  return (
    <main className="flex flex-col gap-24 items-center justify-between pt-24">
      <h1 className="text-4xl">JimmyDC Blog Article Summarizer</h1>
      <Summarizer />
    </main>
  )
}

