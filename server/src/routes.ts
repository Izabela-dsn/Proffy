import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();

//criar as rotas e exportar elas do arquivo

//app -> routes.get : como não vai ser criado um app do zero e não há acesso ao app
// routes.get('/', (request, response) => {
    //return response.send("Hello Bitches");
    //console.log('acessoou otarias')
    //return response.json({ message: "Hello Bitches"});
//});

//foi mandado pro controller que vai fazer e receber as requisições
routes.post('/classes', classesControllers.create);
routes.get('/classes', classesControllers.index);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

export default routes;

//GET: Buscar ou listar uma informação
//POST: Criar alguma nova informaçao
//PUT: Atualizar uma informação existente
//DELETE: Deletar uma informação existente

//Quando fazemos uma requisição ao back temos 3 tipos de paramentros que podemos usar
// Corpo (Request Body): Dados para criação ou atualização de informação
// Route Params(:): Identificar qual recurso eu quero atualizar ou deletar (um recurso da nossa rota)
// Query Params: Listagem, paginação, filtros, ordenação