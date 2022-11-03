import React, { useState, useEffect} from 'react';
import NavBar from './NavBar';

import ProblemObject from './problemobject';

const Home = () => {

/* this component will be our home page and possibly a template for other pages
 styling needs: a basic size and set of elements
Sub components:
navbar
list (this is a box, also maybe modular for re-use that will host individual problem objects)
    list can also contain the filer button?
*/

const getAlerts = () => {
  const [alertsList, setAlertsList] = useState({}); // 

  useEffect(() => {
    const intervalId = setInterval(() => { // fetchinterval pings the server every 30 seconds, until the component unmounts
      fetch('localhost:8000/alerts')
      .then(response => response.json()) // refine this, but basically update state with alert list the fetch returns
      .then(data => {
        if (data !== alertsList){
        setAlertsList(data)
      }
    }) 
      .catch()
    }, 30000);

    return () => clearInterval(intervalId); // the return statement will clear the interval when the component unmounts... does the component unmount when we navigate away?
  }, []); // the array has to do with things that will update during the component lifecycle

    return(
      <div>
        {/* <NavBar /> */}
        Home Page Renders!
        <div className="contents">
              {/* <div id="list"> */}
              /* i think here we will have conditional logic that renders one <ProblemObject /> for each element in alertsList
              and we will prop drill details of the individual alert into each problemobject
              for 
              */
                <ProblemObject />
                <ProblemObject />
                <ProblemObject />
                <ProblemObject />
                <ProblemObject />
                <ProblemObject />
                <ProblemObject />
                <ProblemObject />
                <ProblemObject />
                <ProblemObject />
                <ProblemObject />
                <ProblemObject />
              {/* </div> */}
            {/* <NavBar />
           <Chart /> */}
           </div>
      </div>
    )
  }
}
  export default Home;