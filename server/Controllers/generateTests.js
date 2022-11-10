/*
This file was created to populate dummy data to the db originally.

This is for setting up test cases in the db.json file. We need JSON images, but don't want to write them by hand.
This isn't called by anything. You have to run it separate. 
*/



// import fs from 'fs';
// import path from 'path';
const fs = require('fs');
const path = require('path');

async function makeExamples(){
    console.log('Make some test cases in the DB');

    const testCases = [{
        "id": 000000001,
        "issue": "Pontential OOMKill",
        "status": "new",
        "node": "gke-khartes-default-pool-051f007c-mt19",
        "pod": "deployment-memoryuser-564878964b-pfctt",
        "container": "",
        "metric": 200000,
        "limit": 200000,
        "historicalMetrics": [
          [
              1667512028.505,
              "37163008"
          ],
          [
              1667512088.239,
              "37163008"
          ],
          [
              1667512160.554,
              "37163008"
          ],
          [
              1667512216.947,
              "37163008"
          ],
          [
              1667512267.320,
              "37163008"
          ]
      ],
        "oldYaml": 'yaml string',
        "newYaml": 'yaml string',
      },
      
      {
        "id": 000000002,
        "issue": "Pontential Persistant Volume Disk Full",
        "status": "new",
        "node": "gke-khartes-default-pool-051f007c-jw75",
        "pod": "deployment-polo-67cd6dd5cf-54vbd",
        "container": "",
        "metric": 15000,
        "limit": 15000,
        "historicalMetrics": [],
        "oldYaml": 'yaml string',
        "newYaml": 'yaml string',
      },
      
      {
        "id": 000000003,
        "issue": "Potential Node Burst config",
        "status": "new",
        "node": "gke-khartes-default-pool-051f007c-mt19",
        "pod": "deployment-memoryuser-564878964b-pfctt",
        "container": "",
        "metric": 200000,
        "limit": 200000,
        "historicalMetrics": [],
        "oldYaml": 'yaml string',
        "newYaml": 'yaml string',
      },
    
      {
        "id": 000000004,
        "issue": "Potential Node Burst config",
        "status": "new",
        "node": "gke-khartes-default-pool-051f007c-mt19",
        "pod": "deployment-memoryuser-564878964b-pfctt",
        "container": "",
        "metric": 200000,
        "limit": 200000,
        "historicalMetrics": [],
        "oldYaml": 'yaml string',
        "newYaml": 'yaml string',
      }]

    await fs.writeFileSync(path.join(__dirname, '../../server/db.json'), JSON.stringify(testCases));
}

makeExamples();