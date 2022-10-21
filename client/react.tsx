import * as React from 'react';
import * as ReactDOM from 'react-dom';
 
const Index = () => {

    //function to call the fetch request to the server
    const getPolo = () => {
        console.log("Reached getPolo function.");
        fetch('http://localhost:8000/polo')
            .then(() => alert("Fetching..."))
            // .then(res => res.json())
            // .then((data) => console.log(data))
            .catch(err => `"Error found in getPolo fetch request: "${err}`);
    }

    return (
        <div>
        Hello React!
        <button onClick={getPolo}>Marco!</button>
        </div>
    )
};
 
ReactDOM.render(<Index />, document.getElementById('app'));