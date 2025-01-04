import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

export class ValidateImageMiddleware {
    static execute(req: Request, res: Response, next: NextFunction) {

        try {

            if (!req.files || Object.keys(req.files).length === 0)
                return res.status(400).json({ ok: false, message: 'Theres is not image uploaded' })

            let image: UploadedFile | UploadedFile[] = req.files!.image;

            if (Array.isArray(image))
                image = image[0];

            const extension = image.mimetype.split('/').at(1);

            const validExtensions = ['png', 'jpg', 'jpeg', 'webp', 'avif'];
            if (!validExtensions.includes(extension!))
                return res.status(400).json({ ok: false, message: 'The extension of the images is not valid, valid extensions:' + validExtensions });

            req.body.image = image;
            next();

        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false, message: 'Internal error server' });
        }


    }
}