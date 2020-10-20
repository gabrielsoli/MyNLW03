import {getRepository} from 'typeorm';
import Orphanage from '../models/orphanage';
import {Request, Response, response} from 'express';

export default {
    async show(request: Request, response: Response){

        const {id} = request.params;

        const orphanagesRepository = getRepository(Orphanage);
        
        const orphanage = await orphanagesRepository.findOneOrFail(id);

        return response.status(200).json(orphanage);
    },
    async index(request: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find();

        return response.status(200).json(orphanages);
    },

    async create(request: Request,response: Response){
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const orphanagesRepository = getRepository(Orphanage);
    
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        });
    
        await orphanagesRepository.save(orphanage);
    
        console.log(request.body);
        return response.status(201).json(orphanage)
        
    }
    
};