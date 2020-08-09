import { uuid } from 'uuidv4';

class Appoinment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appoinment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appoinment;
