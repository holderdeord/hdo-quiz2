import { ChatUser } from './chat-user.class';

describe('ChatUser, class (shared)', () => {
  let user;

  beforeEach(() => {
    user = new ChatUser('name', 'pictureUrl');
  });

  it('exposes property name', () => expect(user.name).toEqual('name'));
  it('exposes property pictureUrl', () => expect(user.pictureUrl).toEqual('pictureUrl'));
});