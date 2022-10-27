import * as React from 'react';



const AlertsPage = () => {

    const fixOptions = () => {
      
    }

    // this component will display graphs, issue descript and two buttons auto-fix or fix options
    // buttons may need to be updated with new content based on our shifting MVP
        return(
          <div>
            {/* <NavBar />
           <Chart /> */}
           <div> Alert Details </div>
           <button> Description of Alerts </button>
           <button onClick={fixOptions}> Fix options </button>
          </div>
        )
      }
      
      export default AlertsPage;
