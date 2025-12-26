import { ExerciseRunner } from './components/ExerciseRunner'
import type { Level } from './models/Level'

const levels: Level[] = [
  {
    id: 1,
    title: 'Hello, World',
    concept:
      'The print() function outputs text to the screen.',
    instructions:
      'Write a Python program that prints exactly: Hello, World',
    starterCode: 'print("")',
    expectedOutput: 'Hello, World',
    hints: ['Use print()', 'Check spelling and punctuation'],
  },
  {
    id: 2,
    title: 'Printing Numbers',
    concept:
      'print() can also output numbers directly.',
    instructions:
      'Print the number 42',
    starterCode: 'print()',
    expectedOutput: '42',
    hints: ['No quotes needed for numbers'],
  },
]

function App() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <ExerciseRunner levels={levels} />
    </div>
  )
}

export default App
