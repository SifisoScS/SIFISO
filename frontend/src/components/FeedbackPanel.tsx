interface FeedbackPanelProps {
  output: string | null
  error: string | null
  expectedOutput: string
}

export function FeedbackPanel({
  output,
  error,
  expectedOutput,
}: FeedbackPanelProps) {
  if (!output && !error) return null

  if (error) {
    return (
      <div className="mt-4 p-4 border-l-4 border-red-500 bg-red-50">
        <h3 className="font-semibold text-red-700">Error</h3>
        <pre className="text-red-600 mt-2">{error}</pre>
      </div>
    )
  }

  const isCorrect =
  output !== null && output.trim() === expectedOutput.trim()


  return (
    <div
      className={`mt-4 p-4 border-l-4 ${
        isCorrect
          ? 'border-green-500 bg-green-50'
          : 'border-yellow-500 bg-yellow-50'
      }`}
    >
      <h3 className="font-semibold">
        {isCorrect ? 'Correct' : 'Incorrect'}
      </h3>

      {!isCorrect && (
        <p className="mt-2 text-sm text-gray-700">
          Expected output: <strong>{expectedOutput}</strong>
        </p>
      )}
    </div>
  )
}
