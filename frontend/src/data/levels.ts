import type { Level } from '../models/Level'

export const levels: Level[] = [
  {
    id: 1,
    title: 'Hello, World',
    concept:
      'The print() function outputs text to the screen.',
    instructions:
      'Write a Python program that prints exactly: Hello, World',
    starterCode: '',
    expectedOutput: 'Hello, World',
    hints: [
      'Use the print() function.',
      'Wrap the text in quotes.',
    ],
    objectives: ['print', 'strings'],
  },

  {
    id: 2,
    title: 'Printing Numbers',
    concept:
      'Python can print numeric values without quotes.',
    instructions:
      'Print the number 42.',
    starterCode: '',
    expectedOutput: '42',
    hints: [
      'Numbers do not need quotes.',
    ],
    objectives: ['print', 'numbers'],
  },

  {
    id: 3,
    title: 'Variables',
    concept:
      'Variables store values for later use.',
    instructions:
      'Create a variable named x with value 10, then print it.',
    starterCode: '',
    expectedOutput: '10',
    hints: [
      'Assign using =',
      'Print the variable',
    ],
    objectives: ['variables', 'print'],
  },
]
