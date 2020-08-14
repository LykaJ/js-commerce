import React, {Component} from 'react';
import {Button, Card} from "react-bootstrap";
import App from "./App";

const APIProducts = 'http://localhost:3000/api/products/';

export class Product extends React.Component {
    //fetch products from db
    constructor(props) {
        super(props);

        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        fetch(APIProducts)
            .then(response => response.json())
            .then(data => this.setState({products: data.products}));
    }

    fetchOneProduct = id => {

        const products = this.state.products.slice();
        const index = products.findIndex(function (product) {
            fetch(APIProducts + product.id)
                .then(response => response.json())
            return product.id === id;
        })

        products.splice(index, 1);
        this.setState({products: products});
    }

    render() {
        const {products} = this.state;

        return (
            <div>
                {products.map(product =>
                    <Card>
                        <div key={product._id}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>{product.price} €</p>
                        </div>
                    </Card>
                )}
            </div>
        );
    }
}

export default Product;