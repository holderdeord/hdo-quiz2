import { ChatMessageEntry, ChatMessageEntryComponent, ChatUserFactory } from '../';
import { inject } from '../../../../../testing';

describe('ChatMessageEntry, class (shared)', () => {
  let clock, entry, originUser;

  beforeEach(() => clock = sinon.useFakeTimers());
  afterEach(() => clock.restore());

  beforeEach(inject([ChatUserFactory], chatUserFactory => {
    originUser = chatUserFactory.createAnonymousUser();
    entry = new ChatMessageEntry(originUser);
    clock.tick(1);
  }));

  it('exposes property isWritingMessage', () => expect(entry.isWritingMessage).toBe(false));
  it('exposes property messages', () => expect(entry.messages).toEqual([]));
  it('exposes property type', () => expect(entry.type).toBe(ChatMessageEntryComponent));

  describe('addMessage', () => {
    it('adds a new message', () => {
      entry.addMessage('new message');
      clock.tick(1);
      expect(entry.messages).toEqual(['new message']);
    });

    it('returns a promise', done => {
      let result = entry.addMessage('new message');

      expect(result).toEqual(jasmine.any(Promise));
      expect(result.__zone_symbol__state).toBeNull();

      result
        .then(() => expect(result.__zone_symbol__state).toBe(true))
        .then(done);
      clock.tick(1);
    });

    it('can postpone adding message', () => {
      entry.addMessage('new message', 1000);
      expect(entry.messages.length).toBe(0);
      expect(entry.isWritingMessage).toBe(true);

      clock.tick(1000);

      expect(entry.messages.length).toBe(1);
      expect(entry.isWritingMessage).toBe(false);
    });
  });
});
