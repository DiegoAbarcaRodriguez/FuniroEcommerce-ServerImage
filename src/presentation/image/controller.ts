import { Request, Response } from "express";
import { GetImage } from "../../domain/use-cases/get-image";
import { CustomError } from "../../domain/errors/custom.error";
import { SaveImage } from '../../domain/use-cases/save-image';
import { DeleteImage } from "../../domain/use-cases/delete-image";

export class ImageController {

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ ok: false, message: error.message });
        }
        console.log(error)
        return res.status(500).json({ ok: false, message: 'Internal error server' });
    }

    constructor(
        private getImageUseCase: GetImage,
        private saveImageUseCase: SaveImage,
        private deleteImageUseCase: DeleteImage,
    ) { }

    getImage = (req: Request, res: Response) => {
        const { name } = req.params;

        this.getImageUseCase.execute(name)
            .then(result => res.sendFile(result))
            .catch(error => this.handleError(error, res));
    }

    saveImage = (req: Request, res: Response) => {
        const { image } = req.body;
        const { id } = req.params;

        this.saveImageUseCase.execute(image, +id)
            .then(result => res.json(result))
            .catch(error => this.handleError(error, res));
    }

    deleteImage = (req: Request, res: Response) => {
        const { id } = req.params;

        this.deleteImageUseCase.execute(+id)
            .then(result => res.json(result))
            .catch(error => this.handleError(error, res));
    }

}