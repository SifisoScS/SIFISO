import { ExerciseRunner } from "./components/ExerciseRunner"
import { levels } from "./data/levels"

function App() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <ExerciseRunner level={levels[0]} />
    </div>
  )
}

export default App
