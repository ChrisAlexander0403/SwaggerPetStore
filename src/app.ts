import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import petRoutes from './routes/pet.routes';

export class App {
    app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middleware();
        this.routes();
    }

    private settings() {
        this.app.set("port", this.port || 3000);
    }

    private middleware() {
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    private routes() {
        this.app.use(petRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get("port"), () => {
            console.log("Server ready on port", this.app.get("port"));
        });
    }
}