// This file is for our types for typescript

// types
export interface AlertsInterface {
  id: number,
  issue: string,
  status: string,
  node: string,
  pod: string,
  container: string,
  //check if metrics is an object
  metrics: object,
  oldYaml: object,
  newYaml: object
}