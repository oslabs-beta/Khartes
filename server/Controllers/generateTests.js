/*
This is for setting up test cases in the db.json file. We need JSON images, but don't want to write them by hand.
This isn't called by anything. You have to run it separate. 
*/



const fs = require('fs');
const path = require('path');

async function makeExamples(){
    console.log('Make some test cases in the DB');

    const testCases = [{
        "issue": "Pontential OOMKill",
        "status": "new",
        "node": "gke-khartes-default-pool-051f007c-mt19",
        "pod": "deployment-memoryuser-564878964b-pfctt",
        "container": "",
        "metrics": "200000",
        "historicalMetrics": [],
        "oldYaml": {},
        "newYaml": {},
      },
      
      {
        "issue": "Pontential Persistant Volume Disk Full",
        "status": "new",
        "node": "gke-khartes-default-pool-051f007c-jw75",
        "pod": "deployment-polo-67cd6dd5cf-54vbd",
        "container": "",
        "metrics": "15000",
        "historicalMetrics": [],
        "oldYaml": {},
        "newYaml": {},
      },
      
      {
        "issue": "Potential Node Burst config",
        "status": "new",
        "node": "gke-khartes-default-pool-051f007c-mt19",
        "pod": "deployment-memoryuser-564878964b-pfctt",
        "container": "",
        "metrics": "200000",
        "historicalMetrics": [],
        "oldYaml": {},
        "newYaml": {},
      }]

    fs.writeFileSync(path.join(__dirname, '../../server/db.json'), JSON.stringify(testCases));
}

makeExamples();