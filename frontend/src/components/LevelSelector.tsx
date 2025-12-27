interface LevelSelectorProps {
  levels: { title: string }[]
  currentIndex: number
  masteredLevels?: number[]
  onSelect: (index: number) => void
}

export function LevelSelector({
  levels,
  currentIndex,
  masteredLevels,
  onSelect,
}: LevelSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {levels.map((level, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex
        const isLocked = index > currentIndex

        return (
          <button
            key={index}
            disabled={isLocked}
            onClick={() => onSelect(index)}
            className={[
              'px-3 py-1 rounded text-sm font-medium transition',
              isCurrent && 'bg-blue-600 text-white',
              isCompleted && 'bg-green-200 text-green-800',
              isLocked && 'bg-gray-200 text-gray-400 cursor-not-allowed',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="flex items-center gap-1">
              {index + 1}. {level.title}
              {masteredLevels?.includes(index) && (
                <span className="text-yellow-500">★</span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}