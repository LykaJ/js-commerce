import React, {Component} from 'react';
import {Card} from "react-bootstrap";

const APIProducts = 'http://localhost:3000/products/';

export class Product extends Component {
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

    render() {
        const {products} = this.state;

        return (
            <div className="card-columns">
                {products.map(product =>
                    <Card key={product._id}>
                        <div className="card-body">
                            <img className="card-img-top" src={product.imageUrl} alt="Card image cap"></img>
                            <h3 className="card-title">{product.name}</h3>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text">{product.price} €</p>
                            <a href="#" className="btn btn-primary">Buy</a>
                        </div>
                    </Card>
                )}
            </div>
        );
    }
}

export default Product;