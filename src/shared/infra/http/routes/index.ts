import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRoute from '@modules/appointments/infra/http/routes/providers.routes';
import usersRoute from '@modules/users/infra/http/routes/users.route';
import sessionsRoute from '@modules/users/infra/http/routes/sessions.routes';
import passwordRoute from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRoute);
routes.use('/users', usersRoute);
routes.use('/sessions', sessionsRoute);
routes.use('/password', passwordRoute);
routes.use('/profile', profileRouter);

export default routes;
