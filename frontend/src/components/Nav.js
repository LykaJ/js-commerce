import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

export default class Nav extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedInStatus: this.props.loggedInStatus,
            user: this.props.user
        }
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick() {
        axios
            .put("http://localhost:3000/logout", {
                withCredentials: true,
            })
            .then(response => {
                this.props.handleLogout();
            })
            .catch(error => {
                console.log("logout error", error);
            });
    }

    render() {
        const user = this.props.loggedInStatus === 'LOGGED_IN';
        let link;
        if (user) {
            link =
                <Link className="nav-link" onClick={this.handleLogoutClick}>
                    Logout
                </Link>
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to={'/'}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/account'}>
                                Account
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/dashboard'}>
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            {link}
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
