import * as React from 'react';

const YamlPage = () => {

    // this component will display two yaml files side by side for comparison
    // sub component YamlView these will need props? to pass in correct yaml to render
        return(
          <div className="yamlpagecontents">
          
            <div className="yamlcontents"> 1st YAML</div>
            <div className="yamlcontents"> 2nd YAML </div>
           
          </div>
        )
      }
      
      export default YamlPage;