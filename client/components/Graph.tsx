import React from "react";

import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import type { ChartData, ChartOptions } from 'chart.js';
import { AlertsInterface, numOrStr, GraphProps } from '../Types';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const Graph = (props: GraphProps):JSX.Element => {
  const timeData: number[] = [];
  console.log(props);
// each el of historical metrics [1667512028.505, '37163008'] <--[seconds since jan 1 1970, bytes]
  
  const metricData: number[] = props.alert.historicalMetrics.map((el):number => {
    console.log('graph 15: ', el);
    const seconds: number = el[0];
    const megabytes: number = Number(el[1])/1000000;
    const time: any = new Date(seconds * 1000).toString().slice(15,28);
    // console.log('date: ', time);
    timeData.push(time);
    return megabytes;
  })

  // (5) [Thu Nov 03 2022 14:47:08 GMT-0700 (Mountain Standard Time)]

  console.log(timeData);
  console.log(metricData);
  const data: ChartData<'line'> = {
    labels: timeData,
    datasets: [{
      label: 'memory',
      data: metricData,
      strokeColor: "rgba(220,220,220,0.8)",
    },
    {
      label: 'limit',
      data: Array(metricData.length).fill(props.alert.limit/1000000)
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
