import { useState } from "react"
import type { Level } from "../models/Level"
import { CodeEditor } from "./CodeEditor"
import { FeedbackPanel } from "./FeedbackPanel"
import { LevelViewer } from "./LevelViewer"

interface ExerciseRunnerProps {
  level: Level
}

export function ExerciseRunner({ level }: ExerciseRunnerProps) {
  const [code, setCode] = useState("")
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function runCode() {
    setLoading(true)
    setOutput(null)
    setError(null)

    try {
      const response = await fetch("http://localhost:8000/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })

      const result = await response.json()

      if (result.error && result.error.trim() !== "") {
        setError(result.error)
      } else {
        setOutput(result.output)
      }
    } catch {
      setError("Unable to reach execution server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <LevelViewer level={level} />

      <CodeEditor code={code} onChange={setCode} />

      <button
        onClick={runCode}
        disabled={loading}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        {loading ? "Running..." : "Run Code"}
      </button>

      <FeedbackPanel
        output={output}
        error={error}
        expectedOutput={level.expectedOutput}
      />
    </div>
  )
}
