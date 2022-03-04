import axios from "axios";
import AuthService from './AuthService';

// select a microservice to get products
//const API_AUTH_URL = "http://localhost:8082/api/"; //SpringBoot Microservice
//const API_AUTH_URL = "https://localhost:8000/api/"; // PHP Microservice
const API_AUTH_URL = "http://localhost:8001/"; // Python Microservice
//const API_AUTH_URL = "https://app-business-python-poc.k8s.letsrebold.com/api/"; // Python Microservice

export class ProductService {
    getProducts() {
        console.log(process.env.REACT_APP_API_AUTH_URL + "products");

        return axios            
            .get(process.env.REACT_APP_API_AUTH_URL + "products", { headers: AuthService.instance.getBearerHeader() })
            .then(response => {
                if (response.status === 200)
                    return response.data;                
            })
            .catch(error => {
                console.log(error);

                return [];
            })            
    }
}