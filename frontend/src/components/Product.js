import React, {Component} from 'react';
import {Card, Form} from "react-bootstrap";
import axios from "axios";

const APIProducts = 'http://localhost:3000/products/';

export class Product extends Component {
    //fetch products from db
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            user: [],
            name: "",
            description: "",
            price: ""
        };
    }

    componentDidMount() {
        fetch(APIProducts)
            .then(response => response.json())
            .then(data => this.setState({products: data.products}));
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const {name, description, price} = this.state;
        axios
            .post(
                "http://localhost:3000/products",
                //TODO: add headers for authent
                {
                    name: name,
                    description: description,
                    price: price
                },
                {withCredentials: true}
            )
            .then(response => {
                //TODO: return user via setState
                if (response.data.status === "created") {
                    console.log("The product was successfully created");
                }
            })
            .catch(error => {
                console.log("product creation error", error);
            });

        event.preventDefault();
    }

    render() {
        const {products} = this.state;

        const user = this.props.user;
        console.log(user)

        let form;

        if (user) {
            form =
                <Form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="productName">Product Name</label>
                        <input type="text" className="form-control" id="productName" name="name"
                               value={this.state.name}
                               onChange={this.handleChange} required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name="description"
                               value={this.state.description}
                               onChange={this.handleChange} required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="text" className="form-control" id="price" name="price"
                               value={this.state.price}
                               onChange={this.handleChange} required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </Form>
        } else {
            form = <div className="alert alert-info">Log in to add a product</div>
        }

        return (
            <div>
                {form}
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
            </div>

        );
    }
}

export default Product;