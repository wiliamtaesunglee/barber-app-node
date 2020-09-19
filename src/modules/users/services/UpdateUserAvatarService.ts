import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import upladConfig from '@config/upload';

import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import Users from '../infra/typeorm/entities/Users';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateuserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<Users> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  };
}

export default UpdateuserAvatarService;
