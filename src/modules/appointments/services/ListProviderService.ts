import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Users from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<Users[]> {
    let users = await this.cacheProvider.recover<Users[]>(`providers-list:${user_id}`);

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        execpt_user_id: user_id,
      });
    }

    console.log('A query no banco foi feita')

    await this.cacheProvider.save(`providers-list:${user_id}`, users)

    return users;
  };
}

export default ListProviderService;
