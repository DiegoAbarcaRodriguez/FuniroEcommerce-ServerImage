import jwt from "jsonwebtoken";
import { envs } from "./env-var.adapter";
export class JwtAdapter {
    static validateJwt(token: string): Promise<{ id: string } | null> {
        return new Promise(resolve => {
            jwt.verify(token, envs.JWT_SEED, (error, decoded) => {
                if (error) resolve(null);

                resolve(decoded as { id: string })
            });
        });
    }
}