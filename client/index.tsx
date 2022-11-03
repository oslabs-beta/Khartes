import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot, Root } from 'react-dom/client';
import App from "./App"

// We are grabbing our element with the ID 'root' and making sure the element grabbed is not null
const rootElement: HTMLElement | null = document.getElementById('root');
if (!rootElement) throw new Error('Failed to get root element in index.ts');

// Creating root to be the type Root (from react) and made it the root element
const root: Root = createRoot(rootElement);

// The root we are rendering is App.jsx
root.render(<App />);





// Extra notes, should remove
// export default function Index () {

    //function to call the fetch request to the server
    // const getPolo = () => {
    //     console.log("Reached getPolo function.");
    //     fetch('http://localhost:8000/polo')
    //         .then(() => alert("Fetching..."))
    //         // .then(res => res.json())
    //         // .then((data) => console.log(data))
    //         .catch(err => `"Error found in getPolo fetch request: "${err}`);
    // }

    // return (
    //     <HashRouter hashType="hashbang">
    //             <h1>Welcome to Khartes!</h1>
    //             <h3>Make sure your Kubectl is connected to your K8s.</h3>
    //             {/* renders <a href="/Khartes/Home"> */}
    //             {/* <Link to="/Home"/>  */}
    //              {/* renders <a href="/Khartes/Alerts"> */}
    //             {/* <Link to="/Alerts"/> */}
    //             {/* <button>Home</button> */}
    //             {/* <App /> */}
    //         <App />
    //         <button onClick={getPolo}>Marco!</button>
    //     </HashRouter>
    // )
// };
 
// ReactDOM.createRoot(document.getElementById("root")).render(
//     <RouterProvider router={router} />
//   );
// ReactDOM.render(<Index />, document.getElementById('root'));