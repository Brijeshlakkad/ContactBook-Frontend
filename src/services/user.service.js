import axios from "axios";
import { dbData } from '../config';
import { User } from "../models/User";
import queryString from 'query-string';
// import { http } from "../services";
const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
export default class UserService {
    async logout() {
        localStorage.removeItem('user');
    }

    async login(email, password) {
        // http.baseUrl = dbData.loginUrl;
        let user;
        await axios.post(dbData.loginUrl, queryString.stringify({
            email: email,
            password: password
        }), config).then(res => {
            user = new User(res.data);
        });
        return user;
    }
    async register(form) {
        const { name, email, password } = form;
        let user;
        await axios.post(dbData.registerUrl, queryString.stringify({
            name: name,
            email: email,
            password: password
        }), config).then(res => {
            user = new User(res.data);
        });
        return user;
    }
}