// This file is for our types for typescript
export type numOrStr = number | string;
// types
export interface AlertsInterface {
  id: number | undefined
  issue: string | undefined
  status: string | undefined
  node: string | undefined
  pod: string | undefined
  container: string | undefined
  metric: number | undefined
  limit: number | undefined
  historicalMetrics: any[][] //| undefined            //[[number, string],[number, string]]     //can also create a numberOrString type and use that. 
  oldyaml: string | undefined
  newyaml: string | undefined
}


export interface GraphProps {
  alert: AlertsInterface
}