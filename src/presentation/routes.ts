import { Router } from "express";
import { ImageRoutes } from "./image/routes";

export class AppRoutes {
    static get routes() {
        const router = Router();

        router.use('/image', ImageRoutes.routes);

        return router;
    }
}