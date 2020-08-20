import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";

export default class Nav extends Component {

    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.handleLogoutClick()
    }

    render() {
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
                       {/* <li className="nav-item">
                            <Link className="nav-link">
                                Logout
                            </Link>
                        </li>*/}
                    </ul>
                </div>
            </nav>
        );
    }
}
