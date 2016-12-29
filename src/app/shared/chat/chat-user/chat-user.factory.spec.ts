import { inject } from '../../../../../testing';
import { ChatUserFactory, ChatUser } from './';

describe('ChatUser, factory (shared)', () => {
  let factory;

  beforeEach(inject(ChatUserFactory, chatUserFactory => factory = chatUserFactory));

  describe('createAnonymousUser', () => {
    it('creates an anonymous user', () => expect(factory.createAnonymousUser()).toEqual(new ChatUser('Anonym', '/assets/img/fallback_avatar.png')));
  });

  describe('createSystemUser', () => {
    it('creates the system user', () => expect(factory.createSystemUser()).toEqual(new ChatUser('Holder de ord', '/assets/img/oldlogo.png')));
  });
});