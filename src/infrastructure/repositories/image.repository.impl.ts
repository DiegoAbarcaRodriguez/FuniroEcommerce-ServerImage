import { UploadedFile } from "express-fileupload";
import { ImageRepository } from "../../domain/repositories/image.repository";
import { ImageDatasource } from "../../domain/datasources/image.datasource";


export class ImageRepositoryImpl implements ImageRepository {

    constructor(private imageDataSource: ImageDatasource) { }

    getImage = (name: string): string => {
        return this.imageDataSource.getImage(name);
    }
    saveImage = async (file: UploadedFile, id?: number): Promise<string> => {
        return this.imageDataSource.saveImage(file, id);
    }

    deleteImage = async (id: number): Promise<void> => {
        return this.imageDataSource.deleteImage(id);
    }

}