import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'wiliam',
      email: 'will@teste.com',
      password: '123123'
    });

    const response = await authenticateUser.execute({
      email: 'will@teste.com',
      password: '123123'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'wiliam@teste.com',
        password: '123123'
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'wiliam',
      email: 'will@teste.com',
      password: '1231234'
    });

    await expect(authenticateUser.execute({
      email: 'will@teste.com',
      password: '123123'
    })
    ).rejects.toBeInstanceOf(AppError);
  });
});
