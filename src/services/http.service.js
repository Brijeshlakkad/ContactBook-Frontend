import axios from 'axios';

export const http = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})