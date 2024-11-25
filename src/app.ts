import { envs } from "./config/env-var.adapter";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    });

    server.start();
}