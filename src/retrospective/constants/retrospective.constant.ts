export const SCORE = {
    S_SCORE: 's',
    A_SCORE: 'a',
    B_SCORE: 'b',
    C_SCORE: 'c',
    D_SCORE: 'd'
} as const

export type Scroe = (typeof SCORE)[keyof typeof SCORE]

export const SCORES = Object.values(SCORE)
