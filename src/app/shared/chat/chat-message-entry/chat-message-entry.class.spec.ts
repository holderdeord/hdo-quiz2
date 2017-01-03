import { ChatMessageEntry, ChatMessageEntryComponent, ChatUserFactory } from '../';
import { inject } from '../../../../../testing';

describe('ChatMessageEntry, class (shared)', () => {
  let clock, entry, originUser;

  beforeEach(() => clock = sinon.useFakeTimers());
  afterEach(() => clock.restore());

  beforeEach(inject([ChatUserFactory], chatUserFactory => {
    originUser = chatUserFactory.createAnonymousUser();
    entry = new ChatMessageEntry(originUser, 'test');
    clock.tick(1);
  }));

  it('exposes property isWritingMessage', () => expect(entry.isWritingMessage).toBe(false));
  it('exposes property messages', () => expect(entry.messages).toEqual(['test']));
  it('exposes property type', () => expect(entry.type).toBe(ChatMessageEntryComponent));

  describe('addMessage', () => {
    it('adds a new message', () => {
      entry.addMessage('new message');
      clock.tick(1);
      expect(entry.messages).toEqual(['test', 'new message']);
    });

    it('returns a promise', () => {
      let result = entry.addMessage('new message');
      expect(result).toEqual(jasmine.any(Promise));
    });

    it('can postpone adding message', () => {
      entry.addMessage('new message', 1000);
      expect(entry.messages.length).toBe(1);
      expect(entry.isWritingMessage).toBe(true);

      clock.tick(1000);

      expect(entry.messages.length).toBe(2);
      expect(entry.isWritingMessage).toBe(false);
    });
  });
});
