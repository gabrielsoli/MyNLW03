import OrphanagesController from './controllers/OrphanagesController'
import { Router } from 'express';
import Multer from 'multer';
import uploadConfig from './config/upload';

const routes = Router();
const uploads = Multer(uploadConfig); 

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', uploads.array('images'), OrphanagesController.create);

export default routes;