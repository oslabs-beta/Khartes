import React from "react";

import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import type { ChartData, ChartOptions } from 'chart.js';
import { AlertsInterface, numOrStr, GraphProps } from '../Types';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const Graph = (props: GraphProps):JSX.Element => {
  const xAxis: number[] = [];
  console.log(props);
  console.log(props.alert);
// each el of historical metrics [1667512028.505, '37163008'] [bytes, seconds]
  const yAxis: number[] = props.alert.historicalMetrics!.map((el: numOrStr[]):number => {
    console.log('graph 15: ',el);
    // xAxis.push(el[0]/60/60/24/365.25)
    return 1;
  })
  const data: ChartData<'line'> = {
    labels: [15, 30, 45, 60, 75],
    datasets: [{
      label: 'pod abc',
      data: []
    }]
  }
  const options:ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  return (
    
    <div>
    <h1>Line Chart</h1>
    <Line options={options} data={data} />
  </div>
)
}


export default Graph;




// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import faker from 'faker';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// export function App() {
//   return <Line options={options} data={data} />;
// }
