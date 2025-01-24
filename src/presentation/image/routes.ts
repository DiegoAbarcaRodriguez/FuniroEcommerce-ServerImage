import { Router } from "express";
import { ImageController } from "./controller";
import { GetImage } from "../../domain/use-cases/get-image";
import { ImageRepositoryImpl } from "../../infrastructure/repositories/image.repository.impl";
import { ImageDataSourceImpl } from "../../infrastructure/datasources/image.datasource.impl";
import { ValidateImageMiddleware } from "../middlewares/validate-image.middleware";
import { SaveImage } from "../../domain/use-cases/save-image";
import { ValidateIdentityMiddleware } from "../middlewares/validate-indentity.middleware";
import { DeleteImage } from "../../domain/use-cases/delete-image";

export class ImageRoutes {
    static get routes() {

        const imageDataSource = new ImageDataSourceImpl();
        const imageRepository = new ImageRepositoryImpl(imageDataSource);

        const getImageUseCase = new GetImage(imageRepository);
        const saveImageUseCase = new SaveImage(imageRepository);
        const deleteImageUseCase = new DeleteImage(imageRepository);

        const imageController = new ImageController(getImageUseCase, saveImageUseCase, deleteImageUseCase);

        const router = Router();

        router.post('/:id', [ValidateImageMiddleware.execute as any,ValidateIdentityMiddleware.execute as any], imageController.saveImage)
        router.post('/', [ValidateImageMiddleware.execute as any, ValidateIdentityMiddleware.execute as any], imageController.saveImage)
        router.get('/:name', imageController.getImage);
        router.delete('/:id',ValidateIdentityMiddleware.execute as any, imageController.deleteImage);

        return router;
    }
}