import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Button} from "react-bootstrap";

import './App.css';
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    checkLoginStatus() {
        axios
            .get("http://localhost:3000/logged",
                {
                    withCredentials: true,
                })
            .then(response => {
                if (
                    response.data.user.token &&
                    this.state.loggedInStatus === "NOT_LOGGED_IN"
                ) {
                    this.setState({
                        loggedInStatus: "LOGGED_IN",
                        user: response.data.user
                    });
                } else if (
                    !response.data.user.token && (this.state.loggedInStatus === "LOGGED_IN")
                ) {
                    this.setState({
                        loggedInStatus: "NOT_LOGGED_IN",
                        user: {}
                    });
                }
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    handleLogoutClick() {
        axios
            .put("http://localhost:3000/logout", {
                withCredentials: true,
            })
            .then(response => {
                this.setState({
                    loggedInStatus: "NOT_LOGGED_IN",
                    user: {}
                });
            })
            .catch(error => {
                console.log("logout error", error);
            });
    }

    handleLogin(data) {
        this.setState({
            loggedInStatus: "LOGGED_IN",
            user: data.user
        });
    }

    render() {
        return (
            <div className="App">
                <Button className="btn-primary" onClick={() => this.handleLogoutClick()}>Logout</Button>
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path={"/"}
                            render={props => (
                                <Home
                                    {...props}
                                    handleLogin={this.handleLogin}
                                    loggedInStatus={this.state.loggedInStatus}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={"/dashboard"}
                            render={props => (
                                <Dashboard
                                    {...props}
                                    loggedInStatus={this.state.loggedInStatus}
                                />
                            )}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
