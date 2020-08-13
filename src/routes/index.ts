import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRoute from './users.route';
import sessionsRoute from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRoute);
routes.use('/sessions', sessionsRoute);

export default routes;
