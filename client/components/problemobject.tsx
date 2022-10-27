import * as React from 'react';

const ProblemObject = () => {

// this component will receive data about particualr pods/pvs etc and be rendered repeatedly in the list on the home page
    return(
      <div>
        <div className="problemobject">
          <div id="left">
           Pod/Volume Alerts 
          </div>
          <div id="right">
          {/* Aut-fix View Details */}
            <button> Auto-fix </button>
            <button> Details </button>
          </div>
        </div>
      </div>    
    )
  }
  
  export default ProblemObject;