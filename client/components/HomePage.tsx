import * as React from 'react';

const Home = () => {

/* this component will be our home page and possibly a template for other pages
 styling needs: a basic size and set of elements
Sub components:
navbar
list (this is a box, also maybe modular for re-use that will host individual problem objects)
    list can also contain the filer button?
*/
    return(
      <div>
        <NavBar />
        <List />
      </div>
    )
  }
  
  export default Home;