import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTEmplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTEmplateProvider;
