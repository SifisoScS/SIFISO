import { levels } from '../data/levels'
import { ExerciseRunner } from '../components/ExerciseRunner'

export function Learn() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <ExerciseRunner levels={levels} />
    </div>
  )
}
