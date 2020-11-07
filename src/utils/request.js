import axios from 'axios';
import mockData from '../mock/index'
const service = axios.create({
    timeout: 5000
});
let pageIndex
service.interceptors.request.use(
    config => {
        console.log(config);
        pageIndex = config.params.pageIndex
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            console.log(response);
            response.data = mockData(pageIndex)
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);


export default service;
