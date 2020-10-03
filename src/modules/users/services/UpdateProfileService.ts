import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

import Users from '../infra/typeorm/entities/Users';
import { check } from 'prettier';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string
  password?: string;
}

@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
    ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password
  }: IRequest): Promise<Users> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found');
    };

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in user');
    }

    if (!old_password && password) {
      throw new AppError('You need pass the old password');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      )

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }
    }

    if (password) {
      const newPassword = await this.hashProvider.generateHash(password)
      Object.assign(user, { password: newPassword });
    }

    Object.assign(user, { name, email });

    return this.usersRepository.save(user);
  };
}

export default UpdateProfile;
