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
            <h1>Welcome to Khartes!</h1>
            <h3>Make sure your Kubectl is connected to your K8s.</h3>
            <h1>test</h1>
            <h2>test2</h2>

        <button onClick={getPolo}>Marco!</button>
        </div>
    )
};
 
ReactDOM.render(<Index />, document.getElementById('root'));