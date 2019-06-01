import React, {Component} from "react";
import api from "../../services/api";
import './styles.css';

export default class Product extends Component{
    state = {
        product: {},
    }

    componentDidMount(){
        this.loadProduct();
    }

    loadProduct = async () => {
        console.log(this.props.match.params);
        const response = await api.get(`/products/${this.props.match.params['id']}`);
        this.setState({
            product: response.data,
        })
    };

    render(){
        return (
            <div className="product-info">
                <h1>{this.state.product.title}</h1>
                <p>{this.state.product.description}</p>
            </div>
        )
    }
}