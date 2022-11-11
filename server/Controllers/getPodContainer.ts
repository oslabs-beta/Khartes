/*
The function in this file returns the container portion of the pod yaml
*/

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const YAML = require('yaml');


const getPodContainer = async (podname: string) => {
    
    const { stdout, stderr } = await exec(`kubectl get pod ${podname} -o yaml`)
    const yamls = YAML.parse(stdout);
    const containerYaml = yamls.spec.containers;

    return YAML.stringify(containerYaml);
};

export default getPodContainer;
