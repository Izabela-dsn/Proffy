import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

//Permitir que aplicações em endereços diferentes acessem um ou outro
//o front vai acessar a nossa api
app.use(cors());

//Avisa para o express para usar o json
app.use(express.json());

//rota
app.use(routes);

// fazer a aplicação ouvir um endereço http - requisições
// parametros: porta
app.listen(3333);
 

