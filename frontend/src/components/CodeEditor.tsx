import { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'

interface RunResult {
  output: string | null
  error: string | null
}

interface CodeEditorProps {
  starterCode: string
  onRun: (result: RunResult) => void
}

export function CodeEditor({ starterCode, onRun }: CodeEditorProps) {
  const [code, setCode] = useState(starterCode)

  // Reset editor when level changes
  useEffect(() => {
    setCode(starterCode)
  }, [starterCode])

  const handleRun = async () => {
    try {
      const response = await fetch('http://localhost:5000/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      onRun({
        output: data.output ?? null,
        error: data.error ?? null,
      })
    } catch {
      onRun({
        output: null,
        error: 'Failed to execute code.',
      })
    }
  }

  return (
    <div className="space-y-3">
      <div className="border rounded overflow-hidden">
        <Editor
          height="300px"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value ?? '')}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
        />
      </div>

      <button
        onClick={handleRun}
        className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
      >
        Run Code
      </button>
    </div>
  )
}
