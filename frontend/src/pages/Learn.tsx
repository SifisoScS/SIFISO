import { levels } from '../data/levels'
import { ExerciseRunner } from '../components/ExerciseRunner'

export function Learn() {
  const curriculumKey = 'pcep'

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ExerciseRunner
        levels={levels}
        curriculumKey={curriculumKey}
      />
    </div>
  )
}
