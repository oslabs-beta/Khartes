// This file is for our types for typescript

// global types
export interface AlertsInterface {
  id: number
  issue: string
  status: string
  node: string
  pod: string
  container: string
  metric: number
  limit: number
  historicalMetrics: number[][]
  oldyaml: string
  newyaml: string
  comments: string[]
}
