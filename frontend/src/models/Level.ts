import type { PCEPObjective } from '../data/pcepObjectives'

export interface Level {
  id: number
  title: string
  concept: string
  instructions: string
  starterCode: string
  expectedOutput: string
  hints: string[]
  objectives: PCEPObjective[]
}
