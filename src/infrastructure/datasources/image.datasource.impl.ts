import { UploadedFile } from "express-fileupload";
import { ImageDatasource } from "../../domain/datasources/image.datasource";
import path from "path";
import fs from 'fs';
import { CustomError } from "../../domain/errors/custom.error";
import { prismaClient } from "../../data";
import { v4 as uuid } from "uuid";

export class ImageDataSourceImpl implements ImageDatasource {

    getImage(name: string): string {
        try {

            const route = __dirname + '/../../../uploads/' + name;

            if (!fs.existsSync(route)) {
                throw CustomError.notFound('Image not found');
            }

            return path.join(route);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    saveImage = async (file: UploadedFile, id?: number): Promise<string> => {
        try {

            let existingImageFile: string = '';
            let existingFurniture: any;

            if (id) {
                existingFurniture = await prismaClient.furniture.findUnique({
                    where: {
                        id
                    }
                });

                if (!existingFurniture) {
                    throw CustomError.notFound(`The furniture with ${id} does not exist`);
                }

                existingImageFile = existingFurniture.image ? `./uploads/${existingFurniture.image}` : '';
            }


            const extension = file.mimetype.split('/').at(1);
            const name = uuid() + '.' + extension;

            file.mv(`./uploads/${name}`, async (error) => {
                if (error) {
                    console.log(error);
                    throw CustomError.internalServer('Encountered and error saving the image into the server');
                }

                if (existingImageFile && fs.existsSync(existingImageFile)) {
                    fs.unlinkSync(existingImageFile);
                }

                if (id) {
                    existingFurniture.image = name;
                    await prismaClient.furniture.update({
                        where: {
                            id
                        },
                        data: existingFurniture
                    })
                }


            });

            return name;
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    deleteImage = async (id: number) => {
        try {
            const existingFurniture = await prismaClient.furniture.findUnique({
                where: { id }
            });

            if (!existingFurniture) {
                throw CustomError.notFound('Furniture not found');
            }

            const imageRoute = './uploads/' + existingFurniture.image;

            if (fs.existsSync(imageRoute)) {
                fs.unlinkSync(imageRoute);
            }

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}