
// The function in this file returns a container of a given podname

// additional refactoring: add types for error, stdout, and stderr, it's currently any
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const YAML = require('yaml');


const getPodContainer = async (podname: string) => {
    console.log('doing getPodContainer')
    
    const { stdout, stderr } = await exec(`kubectl get pod ${podname} -o yaml`)
    const yamls = YAML.parse(stdout);
    const containerYaml = yamls.spec.containers;

    return YAML.stringify(containerYaml);
};
//console.log(getPodContainer('deployment-memoryuser-564878964b-8kvtg'));

export default getPodContainer;
// test using one of the podnames



//kubectl get pod (podname) -o yaml