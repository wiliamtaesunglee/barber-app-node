import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositories';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
};

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRpository: IAppointmentsRepository,

    @inject('CacheProvider')
    private CacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year
  }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.CacheProvider.recover('redis');

    console.log(cacheData);

    const appointments = await this.appointmentsRpository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year
      },
    );

    // await this.CacheProvider.save('redis', 'running');

    return appointments;
  };
}

export default ListProviderAppointmentsService;
