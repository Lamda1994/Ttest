import queryaxios from 'axios';

const axios = queryaxios.create({
    baseURL : 'http://localhost:4000'
});

export default axios;