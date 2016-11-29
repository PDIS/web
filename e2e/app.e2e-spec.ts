import { PDISWEBv2Page } from './app.po';

describe('pdis-webv2 App', function() {
  let page: PDISWEBv2Page;

  beforeEach(() => {
    page = new PDISWEBv2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
