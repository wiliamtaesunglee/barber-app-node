import { getMongoRepository, MongoRepository } from 'typeorm';

import INotifificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class NotificationRepository implements INotifificationRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationRepository;
