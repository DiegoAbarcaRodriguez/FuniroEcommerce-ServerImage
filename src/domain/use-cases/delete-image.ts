import { prismaClient } from "../../data";
import { ImageRepository } from "../repositories/image.repository";

interface DeleteImageUseCase {
    execute(id: number): Promise<{ ok: boolean, message: string }>
}

export class DeleteImage implements DeleteImageUseCase {
    constructor(private imageRepository: ImageRepository) { }

    execute = async (id: number): Promise<{ ok: boolean; message: string; }> => {
        try {
            await this.imageRepository.deleteImage(id);

            return {
                ok: true,
                message: 'Image deleted correctly'
            }

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}