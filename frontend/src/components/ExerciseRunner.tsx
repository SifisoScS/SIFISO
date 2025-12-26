  import { useState, useEffect } from 'react'
  import { CodeEditor } from './CodeEditor'
  import { FeedbackPanel } from './FeedbackPanel'
  import { LevelViewer } from './LevelViewer'
  import { ProgressBar } from './ProgressBar'
  import type { Level } from '../models/Level'
  import { HintsPanel } from './HintsPanel'


  const STORAGE_KEY = 'sifiso_current_level'

  interface ExerciseRunnerProps {
    levels: Level[]
  }

  export function ExerciseRunner({ levels }: ExerciseRunnerProps) {
    const [currentLevelIndex, setCurrentLevelIndex] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? Number(saved) : 0
  })

    const [output, setOutput] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [revealedHints, setRevealedHints] = useState(0)


    useEffect(() => {
      localStorage.setItem(
        STORAGE_KEY,
        currentLevelIndex.toString()
      )
    }, [currentLevelIndex])

    const level = levels[currentLevelIndex]

    const handleRunResult = (result: {
      output: string | null
      error: string | null
    }) => {
      setOutput(result.output)
      setError(result.error)

      if (
    result.output !== null &&
    result.output.trim() === level.expectedOutput.trim()
  ) {
    setTimeout(() => {
      if (currentLevelIndex < levels.length - 1) {
        setCurrentLevelIndex((i) => i + 1)
        setOutput(null)
        setError(null)
        setRevealedHints(0)
      }
    }, 800)
  }
    }

    return (
      <div className="space-y-6">
        <ProgressBar
          current={currentLevelIndex + 1}
          total={levels.length}
        />

        <LevelViewer level={level} />

        <CodeEditor
          starterCode={level.starterCode}
          onRun={handleRunResult}
        />

        <FeedbackPanel
          output={output}
          error={error}
          expectedOutput={level.expectedOutput}
        />
        <HintsPanel
    hints={level.hints}
    revealedCount={revealedHints}
    onRevealNext={() =>
      setRevealedHints((count) => count + 1)
    }
  />

      </div>
    )
  }
