import express from 'express';
import mongoose from "mongoose";
import path from "path";
import routes from './routes';
import cors from "cors";

class App {
    constructor() {
        this.server = express();
        mongoose.set('strictQuery', false);
        mongoose.connect('mongodb+srv://devhouse:devhouse@cluster0.6alh1qb.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        this.middlewares();
        this.routes();
    }

    middlewares() {
        //cors serve para permitir que uma possível aplicação frontend consuma ela
        //Qualquer aplicação frontend agora pode consumir essa api
        this.server.use(cors());
        //Criando um middleware que cria uma rota para acessar as imagens
        //__dirname serve para acessar a raíz do projeto!
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        );

        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;