// src/utils/computeReadiness.ts

import { PCEP_OBJECTIVES } from '../data/pcepObjectives'
import type { PCEPObjective } from '../data/pcepObjectives'
import type { Level } from '../models/Level'

export interface ReadinessResult {
  score: number
  mastered: PCEPObjective[]
  weak: PCEPObjective[]
}

export function computeReadiness(
  levels: Level[],
  masteredLevelIndices: number[]
): ReadinessResult {
  const masteredObjectives = new Set<PCEPObjective>()

  for (const levelIndex of masteredLevelIndices) {
    const level = levels[levelIndex]
    if (!level) continue

    for (const objective of level.objectives) {
      masteredObjectives.add(objective)
    }
  }

  const mastered = Array.from(masteredObjectives)

  const weak = PCEP_OBJECTIVES.filter(
    (objective) => !masteredObjectives.has(objective)
  )

  const score = Math.round(
    (mastered.length / PCEP_OBJECTIVES.length) * 100
  )

  return {
    score,
    mastered,
    weak,
  }
}
