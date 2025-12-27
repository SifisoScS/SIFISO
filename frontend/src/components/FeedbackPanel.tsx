import { useEffect, useRef } from 'react'
import { normalizeOutput } from '../utils/normalizeOutput'

interface FeedbackPanelProps {
  output: string | null
  error: string | null
  expectedOutput: string
  examMode?: boolean
  onSuccess?: () => void
}

export function FeedbackPanel({
  output,
  error,
  expectedOutput,
  examMode = false,
  onSuccess,
}: FeedbackPanelProps) {
  const hasTriggeredSuccess = useRef(false)

  // Debug logging
  console.log('RAW output:', JSON.stringify(output))
  console.log('RAW expected:', JSON.stringify(expectedOutput))
  console.log(
    'NORMALIZED output:',
    JSON.stringify(output ? normalizeOutput(output) : null)
  )
  console.log(
    'NORMALIZED expected:',
    JSON.stringify(normalizeOutput(expectedOutput))
  )

  const isCorrect =
    output !== null &&
    !error &&
    normalizeOutput(output) === normalizeOutput(expectedOutput)

  useEffect(() => {
    if (isCorrect && onSuccess && !hasTriggeredSuccess.current) {
      hasTriggeredSuccess.current = true
      onSuccess()
    }

    if (!isCorrect) {
      hasTriggeredSuccess.current = false
    }
  }, [isCorrect, onSuccess])

  if (!output && !error) return null

  // Exam mode: minimal feedback for incorrect answers
  if (examMode && !isCorrect) {
    return (
      <div className="text-red-600">
        Incorrect.
      </div>
    )
  }

  const failureType =
    error
      ? 'runtime'
      : output !== null
      ? 'logic'
      : null

  if (error) {
    return (
      <div className="text-red-600 font-mono space-y-1">
        <div>Error: {error}</div>
        <div className="text-sm text-gray-600">
          Your code encountered an error before producing output.
        </div>
      </div>
    )
  }

  return (
    <div
      className={
        isCorrect ? 'text-green-600' : 'text-red-600'
      }
    >
      {isCorrect ? 'Correct!' : 'Incorrect'}

      {!isCorrect && (
        <div className="mt-2 text-sm space-y-1">
          <div>
            Expected output: {expectedOutput}
          </div>

          {failureType === 'logic' && (
            <div className="text-gray-600">
              Your code ran successfully, but the result did not match.
            </div>
          )}
        </div>
      )}
    </div>
  )
}