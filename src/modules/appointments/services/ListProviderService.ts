import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Users from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<Users[]> {
    const users = await this.usersRepository.findAllProviders({
      execpt_user_id: user_id,
    });

    return users;
  };
}

export default ListProviderService;
