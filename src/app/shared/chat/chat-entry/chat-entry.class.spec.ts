import { ChatEntry, ChatMessageText, ChatUserFactory } from '../';
import { inject } from '../../../../../testing';

describe('ChatEntry, class (shared)', () => {
  let clock, entry: ChatEntry, originUser;
  const message = new ChatMessageText('new message');

  beforeEach(() => clock = sinon.useFakeTimers());
  afterEach(() => clock.restore());

  beforeEach(inject([ChatUserFactory], chatUserFactory => {
    originUser = chatUserFactory.createAnonymousUser();
    entry = new ChatEntry(originUser);
    clock.tick(1);
  }));

  it('exposes property isWritingMessage', () => expect(entry.isWritingMessage).toBe(false));
  it('exposes property messages', () => expect(entry.messages).toEqual([]));

  describe('addMessage', () => {
    it('adds a new message', done => entry.addMessage(message).then(() => {
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
