export const CURRICULA = {
  pcep: () => import('./curriculum.json'),
  // future:
  // pcap: () => import('./pcap.curriculum.json'),
} as const

export type CurriculumKey = keyof typeof CURRICULA
