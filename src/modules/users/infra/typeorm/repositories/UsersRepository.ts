import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsertDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvicers from '@modules/users/dtos/IFindAllProviderDTO';

import User from '@modules/users/infra/typeorm/entities/Users';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    });

    return user;
  }

  public async findAllProviders({
    execpt_user_id
  }: IFindAllProvicers): Promise<User[]> {

    let users: User[];

    if (execpt_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(execpt_user_id)
        }
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async create(userData: ICreateUsertDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user)

    return user
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
