import { EventEmitter } from '@angular/core';
import { Chat, ChatEvent, ChatUserFactory } from './index';
import { inject } from '../../../../testing';

describe('Chat, class (shared)', () => {
  let chat, subjectUser, participantA, eventSpy;

  beforeEach(inject([ChatUserFactory], chatUserFactory => {
    subjectUser = chatUserFactory.createAnonymousUser();
    participantA = chatUserFactory.createAnonymousUser();
    chat = new Chat(subjectUser);
    chat.events.subscribe(eventSpy = jasmine.createSpy('event spy'));
  }));

  describe('addMessage', () => {
    beforeEach(() => chat.addMessage(subjectUser, 'message 1'));

    it('creates a new entry', () => expect(chat.entries.length).toBe(1));

    it('adds to previous entry if same user writes next message', () => {
      chat.addMessage(subjectUser, 'message 2');
      expect(chat.entries.length).toBe(1);
    });

    it('adds a new entry if another writes next message', () => {
      chat.addMessage(participantA, 'message 2');
      expect(chat.entries.length).toBe(2);
    });

    it('emits an event', () => expect(eventSpy).toHaveBeenCalledWith(new ChatEvent('new message')));
  });

  describe('addParticipant', () => {
    beforeEach(() => chat.addParticipant(participantA));

    it('adds participant', () => expect(chat.participants).toEqual([subjectUser, participantA]));

    it('emits an event', () => expect(eventSpy).toHaveBeenCalledWith(new ChatEvent('new participant')));
  });

  it('exposes property entries', () => expect(chat.entries).toEqual([]));

  it('exposes property events', () => expect(chat.events).toEqual(jasmine.any(EventEmitter)));

  it('exposes property participants', () => expect(chat.participants).toEqual([subjectUser]));
});
