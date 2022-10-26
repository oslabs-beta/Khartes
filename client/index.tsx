import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Link } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import App from "./App"

export default function Index () {

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
        {/* <BrowserRouter basename="/Khartes"> */}
                <h1>Welcome to Khartes!</h1>
                <h3>Make sure your Kubectl is connected to your K8s.</h3>
                {/* renders <a href="/Khartes/Home"> */}
                {/* <Link to="/Home"/>  */}
                 {/* renders <a href="/Khartes/Alerts"> */}
                {/* <Link to="/Alerts"/> */}
                {/* <button>Home</button> */}
                {/* <App /> */}

            <button onClick={getPolo}>Marco!</button>
        {/* </BrowserRouter> */}
        </div>
    )
};
 
// ReactDOM.createRoot(document.getElementById("root")).render(
//     <RouterProvider router={router} />
//   );
// ReactDOM.render(<Index />, document.getElementById('root'));