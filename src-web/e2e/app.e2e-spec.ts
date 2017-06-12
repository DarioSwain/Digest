import { SrcWebPage } from './app.po';

describe('src-web App', () => {
  let page: SrcWebPage;

  beforeEach(() => {
    page = new SrcWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
