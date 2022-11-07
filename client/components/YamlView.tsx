// import * as React from 'react';
// const jsyaml = require('js-yaml');
// const yaml = require('yaml');

// type yamlViewProps = {
//   alertObj: AlertsInterface,
//   fixWasApplied: string,
// };

// const YamlView = (props: yamlViewProps):JSX.element => { // receive the alert object as props from Visualizer

// // extract the yaml bits from alertObj - this may need to become more complex on behalf of StatefulSet
// const display = alertObj.oldYaml;
// const display2 = props.alertObj.newYaml;  

// // if fix gets applied we need to change this, i.e this needs to be part of state


//         return(
//           <div>

//       {fixWasApplied === false &&
//         <div>
//               <div> ORIGINAL YAML, this is conditionally rendered if fixWasApplied = false </div>
//             <pre> {display} </pre>
//             </div>}

//           // this relies on the alertObject having been updated! so we need to be sure to fetch the new alertObject
//           // from the backend after sending them the user input
//             {fixWasApplied === true &&
//         <div>
//               <div> CORRECTED YAML, this is conditionally rendered if fixWasApplied = true </div>
//             <pre> {display2} </pre>
//             </div>}

//             <div>
//             <div> SUGGESTED FIX </div>
//             <pre> {display2} </pre>
//             </div>
            
       

//           </div>
//         )
//       }
    
//       export default YamlView;

//         /* as of 3:09 pm on 11/3 we are going to be getting pod data and storing cpu/memory limits
//   like so,

// items[0]. : 
// spec.container.resources.limits.cpu
// spec.container.resources.limits.memory
// spec.container.resources.requests.cpu
// spec.container.resources.requests.memory
// */