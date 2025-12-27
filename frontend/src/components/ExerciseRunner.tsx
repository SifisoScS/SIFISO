import { useState, useEffect, useRef, useTransition } from 'react'
import { CodeEditor } from './CodeEditor'
import { FeedbackPanel } from './FeedbackPanel'
import { LevelViewer } from './LevelViewer'
import { ProgressBar } from './ProgressBar'
import { HintsPanel } from './HintsPanel'
import { LevelSelector } from './LevelSelector'
import type { Level } from '../models/Level'
import { EXECUTION_SERVER_URL } from '../config'
import { computeReadiness } from '../utils/computeReadiness'

interface ExerciseRunnerProps {
  levels: Level[]
  curriculumKey: string
}

interface RunResult {
  output: string | null
  error: string | null
}

export function ExerciseRunner({
  levels,
  curriculumKey,
}: ExerciseRunnerProps) {
  const STORAGE_KEY = `sifiso_${curriculumKey}_current_level`
  
  const [currentLevelIndex, setCurrentLevelIndex] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = Number(raw)

    if (!Number.isInteger(parsed)) return 0
    if (parsed < 0) return 0
    if (parsed >= levels.length) return levels.length - 1

    return parsed
  })

  const [code, setCode] = useState('')
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [revealedHints, setRevealedHints] = useState(0)
  const [masteredLevels, setMasteredLevels] = useState<number[]>([])

  // Phase 12 — exam mode
  const [examMode, setExamMode] = useState(false)
  
  // Phase 12 — educator mode
  const [educatorMode, setEducatorMode] = useState(false)

  // Phase 11 — streak & confidence
  const [streak, setStreak] = useState(0)
  const [hasUsedHint, setHasUsedHint] = useState(false)

  const advanceTimeoutRef = useRef<number | null>(null)
  const [, startTransition] = useTransition()

  const level = levels[currentLevelIndex]
  
  // Compute readiness for exam
  const readiness = computeReadiness(levels, masteredLevels)

  /* Persist progress */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentLevelIndex.toString())
  }, [currentLevelIndex])

  /* Reset editor + state when level changes */
  useEffect(() => {
    startTransition(() => {
      setCode(level.starterCode)
      setOutput(null)
      setError(null)
      setRevealedHints(0)
      setHasUsedHint(false)
    })
  }, [level, startTransition])

  /* Cleanup delayed advance */
  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current !== null) {
        clearTimeout(advanceTimeoutRef.current)
      }
    }
  }, [])

  const handleRun = async () => {
    // Exam mode: lock retries after first submission
    if (examMode && output !== null) return
    
    // Any attempt resets confidence unless success is earned
    setStreak(0)

    try {
      const response = await fetch(`${EXECUTION_SERVER_URL}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })

      let data: RunResult | null = null

      if (
        response.headers
          .get('content-type')
          ?.includes('application/json')
      ) {
        data = await response.json()
      }

      if (!response.ok) {
        setOutput(null)
        setError(
          data?.error ??
            `${response.status} ${response.statusText}`
        )
        return
      }

      setOutput(data?.output ?? null)
      setError(data?.error ?? null)
    } catch {
      setOutput(null)
      setError(
        'Failed to execute code. Please check your connection.'
      )
    }
  }

  const handleSuccess = () => {
    if (!hasUsedHint) {
      setMasteredLevels((prev) =>
        prev.includes(currentLevelIndex)
          ? prev
          : [...prev, currentLevelIndex]
      )
    }

    setStreak((prev) => (hasUsedHint ? 0 : prev + 1))
    setHasUsedHint(false)

    if (currentLevelIndex >= levels.length - 1) return

    advanceTimeoutRef.current = window.setTimeout(() => {
      setCurrentLevelIndex((i) => i + 1)
    }, 800)
  }


  return (
    <div className="space-y-6">
      <ProgressBar
        current={currentLevelIndex + 1}
        total={levels.length}
      />

      <div className="text-sm text-gray-700">
        Exam readiness: <strong>{readiness.score}%</strong>
      </div>
      
      {readiness.weak.length > 0 && (
        <div className="text-xs text-gray-500">
          Focus areas: {readiness.weak.join(', ')}
        </div>
      )}

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={examMode}
          onChange={() => setExamMode((v) => !v)}
        />
        Exam mode
      </label>
      
      <label className="flex items-center gap-2 text-xs text-gray-500">
        <input
          type="checkbox"
          checked={educatorMode}
          onChange={() => setEducatorMode((v) => !v)}
        />
        Educator mode
      </label>

      {streak > 0 && (
        <div className="text-sm text-green-700">
          🔥 Current streak: {streak}
        </div>
      )}

      <LevelSelector
        levels={levels}
        currentIndex={currentLevelIndex}
        masteredLevels={masteredLevels}
        onSelect={(index) => {
          setCurrentLevelIndex(index)
          setOutput(null)
          setError(null)
          setRevealedHints(0)
          setHasUsedHint(false)
        }}
      />

      <LevelViewer level={level} />
      
      {educatorMode && (
        <div className="text-xs text-gray-500">
          Objectives: {level.objectives.join(', ')}
        </div>
      )}

      <CodeEditor
        value={code}
        onChange={setCode}
        onRunClick={handleRun}
      />

      <FeedbackPanel
        output={output}
        error={error}
        expectedOutput={level.expectedOutput}
        examMode={examMode}
        onSuccess={handleSuccess}
      />

      {!examMode && (
        <HintsPanel
          hints={level.hints}
          revealedCount={revealedHints}
          onRevealNext={() => {
            setRevealedHints((count) => count + 1)
            setHasUsedHint(true)
          }}
        />
      )}
    </div>
  )
}