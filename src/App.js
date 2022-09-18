import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <>
      <img src="logo512.png" class="rotate" />
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <ProductList />
            </Route>
            <Route path="/add">
              <AddProduct />
            </Route>
            <Route path="/edit/:id">
              <EditProduct />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
