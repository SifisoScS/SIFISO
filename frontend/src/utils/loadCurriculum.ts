import type { Curriculum } from '../data/curriculum.schema'
import { PCEP_OBJECTIVES } from '../data/pcepObjectives'
import type { CurriculumKey } from '../data/curricula'
import { CURRICULA } from '../data/curricula'

export async function loadCurriculum(
  key: CurriculumKey
): Promise<Curriculum> {
  const module = await CURRICULA[key]()
  const curriculum = module.default as Curriculum

  if (!curriculum.meta?.version) {
    throw new Error('Curriculum missing version.')
  }

  if (!curriculum.levels?.length) {
    throw new Error('Curriculum contains no levels.')
  }

  curriculum.levels.forEach((level, i) => {
    if (!level.objectives?.length) {
      throw new Error(`Level ${i + 1} has no objectives.`)
    }

    level.objectives.forEach((obj) => {
      if (!PCEP_OBJECTIVES.includes(obj)) {
        throw new Error(
          `Invalid objective "${obj}" in level ${i + 1}.`
        )
      }
    })
  })

  return curriculum
}
