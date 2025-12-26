interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="text-sm text-gray-600 mb-1">
        Level {current} of {total}
      </div>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-primary rounded"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  )
}
