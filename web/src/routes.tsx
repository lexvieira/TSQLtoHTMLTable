import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import User from "./pages/User";
import SalesDetail from "./pages/SalesDetail";

const Routes = () => {

    return (
        <BrowserRouter>
            <Route component={User} path="/" exact />            
            <Route component={SalesDetail} path="/SalesDetail/:ID"  />            
        </BrowserRouter>
    )
}

export default Routes;