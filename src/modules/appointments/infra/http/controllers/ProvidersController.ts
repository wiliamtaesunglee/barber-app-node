import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderService from '@modules/appointments/services/ListProviderService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listProviders = container.resolve(ListProviderService);

    const provider = await listProviders.execute({
      user_id,
    });

    return response.json(provider);
  }
}
