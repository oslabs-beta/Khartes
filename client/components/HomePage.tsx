import React, { useState, useEffect } from 'react';

import ProblemObject from './problemobject';

const Home = () => {

/* this component will be our home page and possibly a template for other pages
 styling needs: a basic size and set of elements
Sub components:
navbar
list (this is a box, also maybe modular for re-use that will host individual problem objects)
    list can also contain the filer button?
*/

// function that fetches alerts from server
// get request
// endpoint 'localhost:8000/alerts'
// setInterval for 30seconds

// how do we know if we are leaving or arriving on the page?
// componentDidMount? componentDidUnmount? useEffect?
// if the page refreshes currently running intervals are closed
// how do we use webAPIs with no browser
const getAlerts = () => {
  let id = setInterval(() => {
    (fetch('localhost:8000/alerts'))
      .then()
      .then(data => {})//update context if it is different
      .catch()
  }, 30000)
}


  const [alertsList, setAlertsList] = useState([]); 

  useEffect(() => {
    const intervalId = setInterval(() => { // fetchinterval pings the server every 30 seconds, until the component unmounts
      fetch('localhost:8000/alerts')
      .then(response => response.json()) // refine this, but basically update state with alert list the fetch returns
      .then(data => {
        if (data !== alertsList){
        setAlertsList(data);
      }
    }) 
      .catch() // error handler
    }, 30000);

    return () => clearInterval(intervalId); // the return statement will clear the interval when the component unmounts... does the component unmount when we navigate away?
  }, []); // the array has to do with things that will update during the component lifecycle
  



  // check state against fetch result and update state if different
  // access context to check state, 
  const alerts = [];
  for (let i = 0; i < alertsList.length; i++) {
    alerts.push(<ProblemObject alert={alertsList[i]} />);
  }

    return(
      <div>
        <div className="contents">
              {/* <div id="list"> */}
              /* i think here we will have conditional logic that renders one <ProblemObject /> for each element in alertsList
              and we will prop drill details of the individual alert into each problemobject
              for 
          */
          
          {alerts}
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
  
  export default Home;