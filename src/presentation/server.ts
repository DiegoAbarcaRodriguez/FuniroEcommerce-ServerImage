import express, { Router } from "express";
import cors from 'cors';
import fileUpload from "express-fileupload";

interface Options {
    port: number,
    public_path?: string,
    routes: Router
}


export class Server {

    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes } = options;
        this.routes = routes;
        this.port = port;
    }


    start = () => {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(fileUpload({
            limits: {
                files: 1,
                fileSize:50 * 1024 * 1024
            }
        }));

        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })



    }
}