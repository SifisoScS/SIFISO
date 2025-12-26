import { useEffect } from 'react'

interface FeedbackPanelProps {
  output: string | null
  error: string | null
  expectedOutput: string
  onSuccess?: () => void
}

export function FeedbackPanel({
  output,
  error,
  expectedOutput,
  onSuccess,
}: FeedbackPanelProps) {
  const isCorrect =
    output !== null &&
    !error &&
    output.trim() === expectedOutput.trim()

  useEffect(() => {
    if (isCorrect && onSuccess) {
      onSuccess()
    }
  }, [isCorrect, onSuccess])

  if (!output && !error) return null

  if (error) {
    return (
      <div className="text-red-600 font-mono">
        Error: {error}
      </div>
    )
  }

  return (
    <div
      className={
        isCorrect ? "text-green-600" : "text-red-600"
      }
    >
      {isCorrect ? "Correct!" : "Incorrect"}
      {!isCorrect && (
        <div className="mt-2 text-sm">
          Expected output: {expectedOutput}
        </div>
      )}
    </div>
  )
}
