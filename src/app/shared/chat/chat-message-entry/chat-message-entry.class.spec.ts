import { ChatMessageEntry, ChatMessageEntryComponent, ChatUserFactory } from '../';
import { inject } from '../../../../../testing';
import { async } from '@angular/core/testing';

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
    it('adds a new message', done => entry.addMessage('new message').then(() => {
      expect(entry.messages).toEqual(['new message']);
      done();
    }));

    it('returns a promise', () => expect(entry.addMessage('new message')).toEqual(jasmine.any(Promise)));

    it('can postpone adding message', () => {
      let result = entry.addMessage('new message', 1000);
      expect(result.__zone_symbol__state).toBeNull();
      expect(entry.messages.length).toBe(0);
      expect(entry.isWritingMessage).toBe(true);

      clock.tick(1000);

      expect(result.__zone_symbol__state).toBe(true);
      expect(entry.messages.length).toBe(1);
      expect(entry.isWritingMessage).toBe(false);
    });
  });
});
