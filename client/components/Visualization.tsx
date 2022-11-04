import * as React from 'react';
import { useLocation, Link } from "react-router-dom"
import { AlertsInterface } from '../Types';
import Graph from './Graph'

// declare namespace JSX{
//   interface ElementAttributesProperty {
//     props:
//   }
// }

const Visualization = () => {

  // logic for passing down props using location. Location needs a state object
  const location = useLocation();
  const alertObj = location.state;
  // console.log(location);
  console.log(alertObj);

    const fixOptions = () => {
      
    }
  // props: {
  //   alert ?: AlertsInterface;
  // }
    // this component will display graphs, issue descript and two buttons auto-fix or fix options
    // buttons may need to be updated with new content based on our shifting MVP
        return(
          <div>
            <h3> Visualization Page </h3>
            <p> LEFT SIDE: Alert Details</p>
            <p>RIGHT SIDE Chart</p>
            <Graph alert={alertObj} />
            <p>{alertObj.issue}</p>
            <button>Default of 20%?</button>
            <button className="button"> Description of Alerts </button>
            <button className="button" onClick={fixOptions}> Fix options </button>
            <p>input for answers on whatever you want it bumped by</p>
            <div>Suggested YAML</div>
            <Link to="/alerts">Back to Alerts</Link>
          </div>
        )
      }
      
      export default Visualization;
