import React, {Component} from "react";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let email;
        let status;
        if (this.props.user) {
            email = <p>{this.props.user.email}</p>
            status = <p>{this.props.loggedInStatus}</p>
        }
        return (
            <div className="container">

                <h1>Dashboard</h1>
                <h2>Your account</h2>
                {email}
                {status}

            </div>
        );
    }


};
