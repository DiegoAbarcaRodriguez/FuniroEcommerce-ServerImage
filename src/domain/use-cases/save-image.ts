import { UploadedFile } from "express-fileupload";
import { ImageRepository } from "../repositories/image.repository";

interface SaveImageUseCase {
    execute(file: UploadedFile, id: number): Promise<{ ok: boolean, message: string }>
}

export class SaveImage implements SaveImageUseCase {

    constructor(private imageRepository: ImageRepository) { }

    execute = async (file: UploadedFile, id: number): Promise<{ ok: boolean, message: string }> => {
        await this.imageRepository.saveImage(file, id);


        return {
            ok: true,
            message: 'Image correctly uploaded'
        }

    }

}