import * as React from 'react';

const AlertsPage = () => {

    // this component will display graphs, issue descript and two buttons auto-fix or fix options
    // buttons may need to be updated with new content based on our shifting MVP
        return(
          <div>
            <NavBar />
           <Chart />
           <div> Description of Issues </div>
           <button> Auto-fix </button>
           <button> Fix options </button>
            
          </div>
        )
      }
      
      export default AlertsPage;
