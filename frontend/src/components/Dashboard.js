import React from "react";

const Dashboard = props => {
    return (
        <div>
            <div>
                <h1>Dashboard</h1>
                <h1>Status: {props.loggedInStatus}</h1>
                <h2>Your account</h2>
            </div>
        </div>
    );
};

export default Dashboard;