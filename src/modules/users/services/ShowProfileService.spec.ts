import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);

  });

  it('should be able to show the profile', async () => {
    const { id: user_id } = await fakeUsersRepository.create({
      name: 'wiliam',
      email: 'wil@teste.com',
      password: '123123',
    });

    const updatedUser = await showProfile.execute({ user_id });

    expect(updatedUser.name).toBe('wiliam');
    expect(updatedUser.email).toBe('wil@teste.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
})
