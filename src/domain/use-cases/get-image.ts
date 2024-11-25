import { ImageRepository } from "../repositories/image.repository";

interface GetImageUseCase {
    execute(name: string): Promise<string>;
}

export class GetImage implements GetImageUseCase {

    constructor(private imageRepository: ImageRepository) { }

    execute = async (name: string): Promise<string> => {
        const file = this.imageRepository.getImage(name);

        return file;

    }

}