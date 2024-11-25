import { Response, Request, NextFunction } from "express";
import { JwtAdapter } from "../../config/jwt.apdapter";
import { prismaClient } from "../../data";

export class ValidateIdentityMiddleware {
    static async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const authorization = req.header('Authorization');
            if (!authorization) res.status(401).json({ ok: false, message: 'Token not provided' });
            if (!authorization?.startsWith('Bearer')) res.status(401).json({ ok: false, message: 'Token not valid' });

            const token = authorization?.split(' ').at(1);
            if (!token) res.status(400).json({ ok: false, message: 'Token not valid' });

            const payload = await JwtAdapter.validateJwt(token!);

            if (!payload) res.status(401).json({ ok: false, message: 'There was not payload associated to the token' });

            const { id } = payload!;

            const user = await prismaClient.user.findUnique({
                where: { id }
            });

            if (!user) res.status(401).json({ ok: false, message: 'The id provided does not belong to any user' });
          
            next();


        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false, message: 'Internal server error' });
        }
    }
}