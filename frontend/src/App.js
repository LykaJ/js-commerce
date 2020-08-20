import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Button} from "react-bootstrap";

import './App.css';
import Account from "./components/Account";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

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
        const user = this.state.loggedInStatus === "LOGGED_IN";
        let button;
        if(user) {
           button = <Button className="btn-primary" onClick={() => this.handleLogoutClick()}>Logout</Button>
        }
        return (
            <div className="App">
                {button}
                <BrowserRouter>
                    <Switch>
                        <Route
                        exact
                        path={"/"}
                        component={Home}
                        />
                        <Route
                            path={"/account"}
                            render={props => (
                                <Account
                                    {...props}
                                    handleLogin={this.handleLogin}
                                    loggedInStatus={this.state.loggedInStatus}
                                />
                            )}
                        />
                        <Route
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
