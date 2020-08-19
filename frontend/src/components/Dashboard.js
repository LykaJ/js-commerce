import React from "react";
import Product from "./Product";

const Dashboard = props => {
    return (
        <div>
            <div>
                <h1>Dashboard</h1>
                <h1>Status: {props.loggedInStatus}</h1>
            </div>
            <Product />
        </div>
    );
};

export default Dashboard;