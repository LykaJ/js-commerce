import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import logo from './logo.svg';
import Login from './User/Login'

import './App.css';
import Product from "./Product";

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/products">
                        <Products/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


function Products() {
    return (
        <div>
            <h2>Products</h2>
            <Product/>
        </div>
        );
}

function Users() {
    return <h2>Users</h2>;
}
