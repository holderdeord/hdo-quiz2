import { Chat, ChatUserFactory } from './index';
import { inject } from '../../../../testing';

describe('Chat, class (shared)', () => {
  let chat, subjectUser, participantA;
  let clock;

  beforeEach(() => clock = sinon.useFakeTimers());
  afterEach(() => clock.restore());

  beforeEach(inject([ChatUserFactory], chatUserFactory => {
    subjectUser = chatUserFactory.createAnonymousUser();
    participantA = chatUserFactory.createAnonymousUser();
    chat = new Chat(subjectUser);
  }));

  describe('addMessage', () => {
    let result;

    beforeEach(() => {
      result = chat.addMessage(subjectUser, 'message 1');
      clock.tick(1);
    });

    it('creates a new entry', () => expect(chat.entries.length).toBe(1));

    it('adds to previous entry if same user writes next message', () => {
      chat.addMessage(subjectUser, 'message 2');
      expect(chat.entries.length).toBe(1);
    });

    it('adds a new entry if another participant writes next message', () => {
      chat.addMessage(participantA, 'message 2');
      expect(chat.entries.length).toBe(2);
    });

    it('postpones message if someone else then subject user adds message', () => {
      expect(chat.entries[0].messages.length).toBe(1);

      chat.addMessage(subjectUser, 'message 2');

      expect(chat.entries[0].messages.length).toBe(1);

      clock.tick(1);

      expect(chat.entries[0].messages.length).toBe(2);

      chat.addMessage(participantA, 'message 3');

      expect(chat.entries[1].messages.length).toBe(0);

      clock.tick(1);

      expect(chat.entries[1].messages.length).toBe(0);

      clock.tick(Chat.DEFAULT_TIME_BEFORE_MESSAGE);

      expect(chat.entries[1].messages.length).toBe(1);
    });

    it('returns a promise', () => expect(result).toEqual(jasmine.any(Promise)));
  });

  describe('addParticipant', () => {
    beforeEach(() => chat.addParticipant(participantA));

    it('adds participant', () => expect(chat.participants).toEqual([subjectUser, participantA]));
  });

  it('exposes property entries', () => expect(chat.entries).toEqual([]));

  it('exposes property participants', () => expect(chat.participants).toEqual([subjectUser]));
});
