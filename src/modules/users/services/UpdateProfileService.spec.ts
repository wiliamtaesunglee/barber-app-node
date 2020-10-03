import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'wiliam',
      email: 'wil@teste.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'wil-i-am',
      email: 'wili_i_am@sas.com.br'
    });

    expect(updatedUser.name).toBe('wil-i-am');
    expect(updatedUser.email).toBe('wili_i_am@sas.com.br');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'wiliam',
      email: 'wil@teste.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'wiliam',
      email: 'wil_i_am@teste.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'wil-i-am',
        email: 'wil@teste.com'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'wiliam',
      email: 'wil@teste.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'wil-i-am',
      email: 'wili_i_am@sas.com.br',
      old_password: '123456',
      password: '123123'
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without passing old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'wiliam',
      email: 'wil@teste.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
      user_id: user.id,
      name: 'wil-i-am',
      email: 'wili_i_am@sas.com.br',
      password: '123123'
    }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wron old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'wiliam',
      email: 'wil@teste.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
      user_id: user.id,
      name: 'wil-i-am',
      email: 'wili_i_am@sas.com.br',
      old_password: '123124',
      password: '123456'
    }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'Test@test.com'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
})
