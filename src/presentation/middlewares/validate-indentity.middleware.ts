import { Response, Request, NextFunction } from "express";
import { JwtAdapter } from "../../config/jwt.apdapter";
import { prismaClient } from "../../data";

export class ValidateIdentityMiddleware {
    static async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const authorization = req.header('Authorization');
            if (!authorization) return res.status(401).json({ ok: false, message: 'Token not provided' });
            if (!authorization?.startsWith('Bearer')) return res.status(401).json({ ok: false, message: 'Token not valid' });

            const token = authorization?.split(' ').at(1);
            if (!token) return res.status(400).json({ ok: false, message: 'Token not valid' });

            const payload = await JwtAdapter.validateJwt(token!);

            if (!payload) return res.status(401).json({ ok: false, message: 'There was not payload associated to the token' });

            const { id } = payload!;

            const user = await prismaClient.user.findUnique({
                where: { id }
            });

            if (!user) return res.status(401).json({ ok: false, message: 'The id provided does not belong to any user' });

            next();


        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false, message: 'Internal server error' });
        }
    }
}