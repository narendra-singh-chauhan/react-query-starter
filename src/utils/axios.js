// packages
import axios from 'axios';


// config base url
const client = axios.create({ baseURL: 'http://localhost:4000' });

// axios instance
const request = ({ ...options }) => {
    // authorization token
    client.defaults.headers.common.Authorization = `Bearer token`;
    // response handlers
    const onSuccess = response => response;
    const onError = error => {
        // add optional logs to handle error
        return error;
    }

    return client(options).then(onSuccess).catch(onError);
};

export default request;