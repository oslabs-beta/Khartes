import React from "react";
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import type { ChartData, ChartOptions } from 'chart.js';
import { AlertsInterface } from "../../Types";

// creating type for props passed down to Graph component
export interface GraphProps {
  alert: AlertsInterface
}

// chart js tree-shakeable, so it is necessary to import and register the controllers, elements, scales and plugins you are going to use.
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const Graph = (props: GraphProps): JSX.Element => {
 
  // creating an array of timestamps that correspond with metrics to populate our line graph
  // each element of historical metrics property looks like this [1667512028.505, '37163008']
  // where [seconds since jan 1 1970, bytes]
  const timeData: string[] = [];
  const metricData: number[] = props.alert.historicalMetrics.map((el):number => {
    const seconds: number = el[0];
    // converting bytes into megabytes and converting full date string into local hh:mm:ss only
    // full time stamp looks like this - Thu Nov 03 2022 14:47:08 GMT-0700 (Mountain Standard Time)] and will automatically be in your machines timezone
    const megabytes: number = el[1]/1000000;
    const time: string = new Date(seconds * 1000).toString().slice(15,24);
    timeData.push(time);
    return megabytes;
  })


  // to create a Line chart component we need a data object and an options object
  // here we are creating a data object that has a data set for the limit and usage. The x-axis is set to the time stamp data
  const data: ChartData<'line'> = {
    labels: timeData,
    datasets: [{
      label: 'memory',
      data: metricData,
      borderColor: 'rgb(0,0,255)',
      backgroundColor:'rgb(0,0,255)'
    },
    {
      label: 'limit',
      data: Array(metricData.length).fill(props.alert.limit / 1000),
      borderColor: 'rgb(255, 0,0)',
      backgroundColor: 'rgb(255, 0,0)',
    }]
  }

  // finding the users preferrend language used in a x-axis parameter
  const lang: string = navigator.language;
  // here we are creating options object for line component. We set the axis-labels and create the legend
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          padding: 16,
        },
      }
    },
    scales: {
      y: {
        // ticks: {
        //   callback: function(value, i, ticks) {
        //     return value + ' mb';
        //   }
        // },
        title: {
          display: true,
          text: 'megabytes'
        }
      },
       x: {
        title: {
          display: true,
          // utilizing internationalization API to get the local time zone of the machine
          // text: 'time zone: ' + Intl.DateTimeFormat().resolvedOptions().timeZone 
          text:new Date().toLocaleDateString(lang, {timeZoneName: 'long'})
        }
      }
    }
  };
  return (
    <div className="graph-container">
      <h2>Metrics From Prior Hour</h2>
      <Line options={options} data={data} />
    </div>
  )
}


export default Graph;

