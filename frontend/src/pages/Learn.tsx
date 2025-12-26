import { useState } from 'react'
import { levels } from '../data/levels'
import { LevelViewer } from '../components/LevelViewer'
import { CodeEditor } from '../components/CodeEditor'
import { FeedbackPanel } from '../components/FeedbackPanel'

export function Learn() {
  const currentLevel = levels[0]

  const [code, setCode] = useState(currentLevel.starterCode)
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function runCode() {
    setError(null)

    // TEMP: Simulated execution
    if (code.includes('print')) {
      const match = code.match(/print\(["'](.+)["']\)/)
      if (match) {
        setOutput(match[1])
      } else {
        setError('SyntaxError: invalid print statement')
        setOutput(null)
      }
    } else {
      setError('NameError: print is not defined')
      setOutput(null)
    }
  }

  return (
    <div className="space-y-8">
      <LevelViewer level={currentLevel} />

      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-xl font-semibold mb-2">
          Write your code
        </h2>

        <CodeEditor code={code} onChange={setCode} />

        <button
          onClick={runCode}
          className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-blue-700"
        >
          Run Code
        </button>

        <FeedbackPanel
          output={output}
          error={error}
          expectedOutput={currentLevel.expectedOutput}
        />
      </div>
    </div>
  )
}
