import { useEffect, useState } from 'react'
import { ExerciseRunner } from './components/ExerciseRunner'
import { loadCurriculum } from './utils/loadCurriculum'
import type { Curriculum } from './data/curriculum.schema'

function App() {
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null)
  const curriculumKey = 'pcep'

  useEffect(() => {
    loadCurriculum(curriculumKey).then(setCurriculum)
  }, [])

  if (!curriculum) {
    return <div className="p-6">Loading curriculum…</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ExerciseRunner
        levels={curriculum.levels}
        curriculumKey={curriculumKey}
      />
    </div>
  )
}


export default App
