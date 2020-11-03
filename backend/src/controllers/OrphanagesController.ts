import {getRepository} from 'typeorm';
import Orphanage from '../models/orphanage';
import {Request, Response, response} from 'express';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

export default {
    async show(request: Request, response: Response){

        const {id} = request.params;

        const orphanagesRepository = getRepository(Orphanage);
        
        const orphanage = await orphanagesRepository.findOneOrFail(id, {relations: ['images']});

        return response.status(200).json(orphanageView.render(orphanage));
    },
    async index(request: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.status(200).json(orphanageView.renderMany(orphanages));
    },

    async create(request: Request,response: Response){

        console.log(request.files)
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename}
        })
    
        const orphanagesRepository = getRepository(Orphanage);

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            opening_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                }))
        });

        await schema.validate(data, {
            abortEarly: false,
        });
    
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        });
    
        await orphanagesRepository.save(orphanage);
    
        console.log(request.body);
        return response.status(201).json(orphanage)
        
    }
    
};