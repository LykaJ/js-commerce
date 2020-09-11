import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter, Switch, Route} from "react-router-dom";

import './App.css';
import Account from "./components/Account";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Nav from "./components/Nav";

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
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

    handleLogin(data) {
        this.setState({
            loggedInStatus: "LOGGED_IN",
            user: data.user
        });
    }

    handleLogout() {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
        })
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Nav user={this.state.user} loggedInStatus={this.state.loggedInStatus}
                         handleLogout={this.handleLogout}/>
                    <Switch>
                        <Route
                            exact
                            path={"/"}
                            render={props => (
                                <Home
                                    {...props}
                                    user={this.state.user}
                                />
                            )}
                        />
                        <Route
                            exact
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
                            exact
                            path={"/dashboard"}
                            render={props => (
                                <Dashboard
                                    {...props}
                                    loggedInStatus={this.state.loggedInStatus}
                                    user={this.state.user}
                                />
                            )}
                        />
                        <Route
                            path={'/logout'}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
