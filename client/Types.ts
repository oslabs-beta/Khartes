// This file is for our types for typescript
export type numOrStr = number | string;
// types
export interface AlertsInterface {
  id: number 
  issue: string 
  status: string 
  node: string 
  pod: string 
  container: string 
  metric: number 
  limit: number 
  historicalMetrics: any[][] //| undefined           //[[number, string],[number, string]]     //can also create a numberOrString type and use that. 
  oldyaml: string 
  newyaml: string 
}


export interface GraphProps {
  alert: AlertsInterface
}