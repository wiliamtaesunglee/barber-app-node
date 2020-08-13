import { Router } from 'express';

import AuthenticateuserService from '../services/AuthenticateUserService';

const sessionsRoute = Router();

sessionsRoute.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateuserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionsRoute;
