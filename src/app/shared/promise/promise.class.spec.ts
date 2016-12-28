import { Promise } from './promise.class';

describe('Promise, class (shared)', () => {
  let promise;

  beforeEach(() => promise = new Promise('name', true));

  it('sets property body', () => expect(promise.body).toEqual('name'));
  it('sets property kept', () => expect(promise.kept).toBe(true));
});