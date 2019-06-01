import React, {Component} from "react";
import api from "../../services/api";
import './styles.css';
import {Link} from 'react-router-dom'

export default class Main extends Component{
    state = {
        products: [],
        info: []
    }

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        this.setState({
            products: response.data.docs,
            total: response.data.total,
            limit: response.data.limit,
            page: response.data.page,
            pages: response.data.pages,
        })
    };

    nextPage = () => {
        if (this.state.page != this.state.pages){
            this.loadProducts(parseInt(this.state.page)+1);
        }
    };

    prevPage = () => {
        if (this.state.page != 1){
            this.loadProducts(parseInt(this.state.page)-1);
        }
    };

    render(){
        return (
            <div className="product-list">
                {this.state.products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div>
                    <button disabled={this.state.page == 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={this.state.page == this.state.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}