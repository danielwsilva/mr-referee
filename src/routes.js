import { Router } from 'express';

import  ParlamentarController from './app/controllers/ParlamentarController';

const routes = new Router();

routes.post('/add_parlamentar', ParlamentarController.store);
routes.put('/update_parlamentar/:id', ParlamentarController.update)
routes.delete('/remove_parlamentar/:id', ParlamentarController.delete)
routes.get('/get_all_parlamentars', ParlamentarController.index_all);
routes.get('/parlamentar/:id', ParlamentarController.index_one)

export default routes;
