import type { Level } from '../models/Level'

export interface Curriculum {
  meta: {
    title: string
    version: string
    certification: 'PCEP'
    author?: string
  }
  levels: Level[]
}
