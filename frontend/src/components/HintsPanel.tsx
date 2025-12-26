interface HintsPanelProps {
  hints: string[]
  revealedCount: number
  onRevealNext: () => void
}

export function HintsPanel({
  hints,
  revealedCount,
  onRevealNext,
}: HintsPanelProps) {
  if (hints.length === 0) return null

  return (
    <div className="border rounded p-4 bg-blue-50 space-y-3">
      <h3 className="font-semibold text-blue-900">
        Hints
      </h3>

      <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
        {hints.slice(0, revealedCount).map((hint, index) => (
          <li key={index}>{hint}</li>
        ))}
      </ul>

      {revealedCount < hints.length && (
        <button
          onClick={onRevealNext}
          className="text-sm text-blue-700 hover:underline"
        >
          Show another hint
        </button>
      )}
    </div>
  )
}
