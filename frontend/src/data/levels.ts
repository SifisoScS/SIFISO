import type { Level } from '../models/Level'

export const levels: Level[] = [
  {
    id: 1,
    title: 'Hello, World',
    concept:
      'In Python, the print() function is used to display text or values to the screen. It is often the first function learners encounter because it shows immediate results.',
    instructions:
      'Write a Python program that prints exactly: Hello, World',
    starterCode: 'print()',
    expectedOutput: 'Hello, World',
    hints: [
      'Use the print function',
      'Text must be inside quotes',
    ],
  },
]
