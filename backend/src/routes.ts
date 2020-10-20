import OrphanagesController from './controllers/OrphanagesController'
import { Router } from 'express';

const routes = Router();

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', OrphanagesController.create);

export default routes;