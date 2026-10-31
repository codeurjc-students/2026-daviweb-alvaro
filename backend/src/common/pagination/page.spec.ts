import { buildPage } from './page.js';

describe('buildPage', () => {
  it('reports more items when the current page is not the last one', () => {
    expect(buildPage(['a'], 11, { page: 0, size: 10 }).hasMore).toBe(true);
  });

  it('reports no more items on the last page', () => {
    expect(buildPage(['a'], 11, { page: 1, size: 10 }).hasMore).toBe(false);
  });

  it('reports no more items when the total fits exactly in the pages read', () => {
    expect(buildPage([], 10, { page: 0, size: 10 }).hasMore).toBe(false);
  });
});
