import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import upladConfig from '../config/upload';

import AppError from '../errors/AppError';
import Users from '../models/Users';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateuserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<Users> {
    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(upladConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateuserAvatarService;
