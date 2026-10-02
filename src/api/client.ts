import axios from 'axios';

const appClient = axios.create({
  baseURL: 'https://3100.api.green-api.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default appClient;