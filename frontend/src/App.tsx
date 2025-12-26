import { ExerciseRunner } from "./components/ExerciseRunner"
import type { Level } from "./models/Level"

const level1: Level = {
  id: 1,
  title: "Hello, World",
  concept:
    "In Python, the print() function is used to display text or values to the screen. It is often the first function learners encounter because it shows immediate results.",
  instructions:
    "Write a Python program that prints exactly: Hello, World",
  expectedOutput: "Hello, World",
  starterCode: "",
  hints: [
    "Use the print() function.",
    "Text output must be in quotes.",
    "Match the expected output exactly.",
  ],
}

function App() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <ExerciseRunner level={level1} />
    </div>
  )
}

export default App
