import React, {Component} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";

import Registration from "./Registration";
import Login from "./Login";


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/dashboard");
    }

    handleLogoutClick() {
        axios
            .put("http://localhost:3000/logout", {withCredentials: true})
            .then(response => {
                this.props.handleLogout();
            })
            .catch(error => {
                console.log("logout error", error);
            });
    }

    render() {
        return (
            <div className="container">
                <h1>Home</h1>
                <h2>Status: {this.props.loggedInStatus}</h2>
                <Button className="btn-primary" onClick={() => this.handleLogoutClick()}>Logout</Button>
                <div className="row">
                    <div className="col-6">
                        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                    </div>
                    <div className="col-6">
                        <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                    </div>
                </div>
            </div>
        );
    }
}