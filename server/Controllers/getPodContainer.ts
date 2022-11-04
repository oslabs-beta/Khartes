
// The function in this file returns a container of a given podname

// additional refactoring: add types for error, stdout, and stderr, it's currently any

const { exec } = require('child_process')
const { ModuleFilenameHelpers } = require('webpack');
const YAML = require('yaml');

const getPodContainer = (podname: string) => {
    
  return exec(`kubectl get pod ${podname} -o yaml`, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          // return;
          // it runs an stderr, but it still continues to write code
      }
      const yamls = YAML.parse(stdout);
      const containerYaml = yamls.spec.containers;
      console.log(yamls.spec.containers);

      return YAML.stringify(containerYaml);
});
}

export default getPodContainer;
// test using one of the podnames
// console.log(getPodYaml('deployment-memoryuser-564878964b-8kvtg'));


//kubectl get pod (podname) -o yaml