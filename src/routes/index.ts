import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRoute from './users.route';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRoute);

export default routes;
