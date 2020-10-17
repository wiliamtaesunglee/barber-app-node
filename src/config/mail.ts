interface IMailConfig {
  driver: 'ethereal' | 'ses',

  defaults: {
    from: {

    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'equipe@elbarbeiro.com.br',
      name: 'Diego da RocketSeat',
    },
  },
} as IMailConfig;
