import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/', // backend server URL
});

export default instance;
