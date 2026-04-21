import { describe, it, expect } from 'vitest'
import { fuzzyMatch, fuzzyFilter, didYouMean } from './fuzzyMatch'

describe('fuzzyMatch', () => {
  it('returns high score for close match', () => {
    expect(fuzzyMatch('proj', 'projects')).toBeGreaterThan(0)
  })

  it('returns 0 for no match', () => {
    expect(fuzzyMatch('xyz', 'projects')).toBe(0)
  })

  it('returns 1 for empty query', () => {
    expect(fuzzyMatch('', 'anything')).toBe(1)
  })

  it('scores consecutive matches higher', () => {
    const consecutive = fuzzyMatch('pro', 'projects')
    const scattered = fuzzyMatch('pts', 'projects')
    expect(consecutive).toBeGreaterThan(scattered)
  })
})

describe('fuzzyFilter', () => {
  const candidates = ['help', 'about', 'projects', 'experience', 'clear', 'theme']

  it('filters by prefix', () => {
    const results = fuzzyFilter('pro', candidates)
    expect(results[0]).toBe('projects')
  })

  it('returns empty for no matches', () => {
    expect(fuzzyFilter('zzz', candidates)).toHaveLength(0)
  })

  it('returns all candidates for empty query', () => {
    expect(fuzzyFilter('', candidates)).toHaveLength(candidates.length)
  })
})

describe('didYouMean', () => {
  const candidates = ['help', 'about', 'projects', 'experience', 'clear', 'theme']

  it('suggests closest match', () => {
    expect(didYouMean('proejcts', candidates)).toBe('projects')
  })

  it('returns null for completely unrelated input', () => {
    expect(didYouMean('xyzxyzxyz', candidates)).toBeNull()
  })

  it('suggests exact match with distance 0', () => {
    expect(didYouMean('help', candidates)).toBe('help')
  })
})
