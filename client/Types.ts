// This file is for our types for typescript
export type numOrStr = number | string;
// types
export interface AlertsInterface {
  id: number,
  issue: string,
  status: string,
  node: string,
  pod: string,
  container: string,
  //check if metrics is an object
  metrics: number,
  oldYaml: object,
  newYaml: object
  historicalMetrics: numOrStr[][],
  limit: number
}


export interface GraphProps {
  alert: AlertsInterface
}