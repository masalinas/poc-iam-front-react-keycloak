import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Keycloak from 'keycloak-js';

import { classNames } from 'primereact/utils';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import AuthService from '../../services/AuthService';
import { ProductService } from '../../services/ProductService';

class Products extends Component {
    constructor(props) {
        super(props);        
    
        this.state = {
            products: []
        };

        this.verifiedBodyTemplate = this.verifiedBodyTemplate.bind(this);

        this.productService = new ProductService();
    }

    componentDidMount() {
        const keycloak = Keycloak('/keycloak.json');

        keycloak.onTokenExpired = () => {
            console.log('Token expired', keycloak.token, 'at ', new Date());

            keycloak.updateToken(180).then((refreshed) => {
                if (refreshed) {                
                    console.log('Successfully get a new token', keycloak.token, 'at ', new Date());

                    AuthService.instance.init(keycloak);
                }
                else 
                    console.log('Token is still valid');                                
            })
            .catch(() => { 
                console.log('Failed to refresh the token, or the session has expired');
            });
        }

        keycloak.init({onLoad: 'login-required'}).then(authenticated => {
            AuthService.instance.init(keycloak);

            this.getProducts();
        })
        .catch(function() {
            console.log('Failed to initialize');
        });
    }

    getProducts() {
        this.productService.getProducts().then(data => 
            this.setState({ products: data }
        ))
        .catch(() => { 
            console.log('Failed to refresh the products');
        });
    }

    verifiedBodyTemplate(rowData) {
        return <i className={classNames('pi', {'true-icon pi-check-circle': rowData.active, 'false-icon pi-times-circle': !rowData.active})}></i>;
    }

    logoutClick() {
        AuthService.instance.logout().then(
            response => {
                this.props.history.push("/");
            },
            error => {
                console.log(error);

                this.props.history.push("/");
            }
        );      
    }

    render() {
        return (
            <div>
                <div className="p-d-flex p-jc-between card">
                    <Button type="button" label="Get Products" icon="pi pi-search" onClick={(event) => this.getProducts(event)}/>                  
                    <Button type="button" label="Sign Out" icon="pi pi-sign-out" className="p-ml-auto p-button-help" onClick={(event) => this.logoutClick(event)}/>                  
                </div>

                <DataTable value={this.state.products} responsiveLayout="scroll">
                    <Column field="code" header="Code"></Column>
                    <Column field="description" header="Description"></Column>
                    <Column field="price" header="Price" dataType="numeric"></Column>
                    <Column field="active" header="Active" dataType="boolean" body={this.verifiedBodyTemplate}></Column>
                </DataTable>                
            </div>
        )
    }
}

export default withRouter(Products);