import * as React from 'react';

const YamlView = () => {

  const getYamlFile = () => {
  let fileHandle;
 
document.querySelector(".pick-file").onclick = async () => {
 [fileHandle] = await window.showOpenFilePicker();
 
 const file = await fileHandle.getFile();
 const content = await file.text();
 
 return content;
}

const getYamlFile = () => {
let result = (fetch('/yamlendpoint', {
  headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
  },
  body: JSON.stringify() // body will be used to specify the requested file
})
.then(res => console.log(res)))
.then()
}
    // this component will display a yaml file
        return(
          <div>
            
          </div>
        )
      }
      
      export default YamlView;