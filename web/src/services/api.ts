//exportar a api para fazer as requisições
//axios - facilitar para consumir as api's externas

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api; 