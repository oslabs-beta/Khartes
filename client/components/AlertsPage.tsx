import * as React from 'react';

import ProblemObject from './problemobject';

const AlertsPage = () => {

    // this component will display graphs, issue descript and two buttons auto-fix or fix options
    // buttons may need to be updated with new content based on our shifting MVP
        return(
          <div>
            <div id="contents">
              <div id="list">
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
              </div>
            {/* <NavBar />
           <Chart /> */}
           </div>
          </div>
        )
      }
      
      export default AlertsPage;
