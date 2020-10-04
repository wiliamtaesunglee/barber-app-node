import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProviderService(fakeUsersRepository);

  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'wiliam',
      email: 'wil@teste.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'wiliam1',
      email: 'wil1@teste.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'wiliam2',
      email: 'wil2@teste.com',
      password: '123123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
})
