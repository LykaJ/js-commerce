import React, {Component} from "react";

import Registration from "./Registration";
import Login from "./Login";


export default class Account extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/dashboard");
    }


    render() {
        return (
            <div className="container">
                <h1>Account</h1>
                <h2>Status: {this.props.loggedInStatus}</h2>

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