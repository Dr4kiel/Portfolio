function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (__, j) => (i === 0 ? j : j === 0 ? i : 0))
  )

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
      }
    }
  }

  return dp[m][n]
}

// Character-sequence score (VSCode-style): characters must appear in order
export function fuzzyMatch(query: string, candidate: string): number {
  if (query.length === 0) return 1
  if (candidate.length === 0) return 0

  const q = query.toLowerCase()
  const c = candidate.toLowerCase()

  let qi = 0
  let score = 0
  let consecutiveBonus = 0
  let lastMatch = -1

  for (let ci = 0; ci < c.length && qi < q.length; ci++) {
    if (c[ci] === q[qi]) {
      const isConsecutive = lastMatch === ci - 1
      consecutiveBonus = isConsecutive ? consecutiveBonus + 1 : 0
      score += 1 + consecutiveBonus
      lastMatch = ci
      qi++
    }
  }

  if (qi < q.length) return 0
  return score / (candidate.length + query.length)
}

export function fuzzyFilter(query: string, candidates: string[]): string[] {
  if (!query.trim()) return candidates

  return candidates
    .map((c) => ({ c, score: fuzzyMatch(query, c) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ c }) => c)
}

export function didYouMean(input: string, candidates: string[]): string | null {
  const q = input.toLowerCase()
  let best: string | null = null
  let bestDist = Infinity

  for (const candidate of candidates) {
    const dist = levenshtein(q, candidate.toLowerCase())
    if (dist < bestDist && dist <= 3) {
      bestDist = dist
      best = candidate
    }
  }

  return best
}
