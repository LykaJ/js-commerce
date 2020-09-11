import React, {Component} from "react";
import Product from "./Product";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <h1>Home</h1>
                <Product user={this.props.user}/>
            </div>
        );
    }
}