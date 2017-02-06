import { Chat, ChatEntry, ChatMessageText, ChatUserFactory, IChatUser } from '../';
import { inject } from '../../../../../testing';

describe('ChatEntry, class (shared)', () => {
  let clock;
  let entry: ChatEntry;
  let originUser: IChatUser;
  let chat: Chat;
  let message: ChatMessageText;

  beforeEach(() => clock = sinon.useFakeTimers());
  afterEach(() => clock.restore());

  beforeEach(inject([ChatUserFactory], chatUserFactory => {
    originUser = chatUserFactory.createAnonymousUser();
    chat = new Chat(originUser);
    message = new ChatMessageText(chat, 'new message');
    entry = new ChatEntry(chat, originUser);
    clock.tick(1);
  }));

  it('exposes property isWritingMessage', () => expect(entry.isWritingMessage).toBe(false));
  it('exposes property messages', () => expect(entry.messages).toEqual([]));

  describe('addMessage', () => {
    xit('adds a new message', done => entry.addMessage(message).then(() => {
      expect(entry.messages).toEqual([message]);
      done();
    }));

    it('returns a promise', () => expect(entry.addMessage(message)).toEqual(jasmine.any(Promise)));

    // it('can postpone adding message', () => {
    //   let result = entry.addMessage(message, 1000);
    //   expect(result.__zone_symbol__state).toBeNull();
    //   expect(entry.messages.length).toBe(0);
    //   expect(entry.isWritingMessage).toBe(true);
    //
    //   clock.tick(1000);
    //
    //   expect(result.__zone_symbol__state).toBe(true);
    //   expect(entry.messages.length).toBe(1);
    //   expect(entry.isWritingMessage).toBe(false);
    // });
  });
});
