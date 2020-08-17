import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import './App.css';
import Home from "./components/Home";

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
            .get("http://localhost:3000/api/user", {withCredentials: true})
            .then(response => {
                if (
                    response.data.loggedIn &&
                    this.state.loggedInStatus === "NOT_LOGGED_IN"
                ) {
                    this.setState({
                        loggedInStatus: "LOGGED_IN",
                        user: response.data.user
                    });
                } else if (
                    !response.data.loggedIn && (this.state.loggedInStatus === "LOGGED_IN")
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

    handleLogout(data) {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
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
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path={"/"}
                            render={props => (
                                <Home
                                    {...props}
                                    handleLogin={this.handleLogin}
                                    handleLogout={this.handleLogout}
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
