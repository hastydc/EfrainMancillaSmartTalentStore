import { TranslateLoaderMock } from './utils.mock';

describe('UtilsMockFile', () => {
  it('getTranslation', () => {
    const mock = new TranslateLoaderMock();
    const response = mock.getTranslation('');

    expect(response).toBeDefined();
  });
});
