import type { Level } from '../models/Level'

interface LevelViewerProps {
  level: Level
}

export function LevelViewer({ level }: LevelViewerProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-primary">
        {level.title}
      </h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          Concept
        </h2>
        <p className="text-gray-700">
          {level.concept}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          Instructions
        </h2>
        <p className="text-gray-700">
          {level.instructions}
        </p>
      </section>
    </div>
  )
}
