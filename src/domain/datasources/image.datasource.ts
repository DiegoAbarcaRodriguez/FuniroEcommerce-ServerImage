import { UploadedFile } from "express-fileupload";

export abstract class ImageDatasource {
    abstract getImage(name: string): string;
    abstract saveImage(file: UploadedFile, id?: number): Promise<string>;
    abstract deleteImage(id: number): Promise<void>;
}