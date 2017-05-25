import { Injectable } from '@angular/core';
import { ChatUser } from './chat-user.class';

@Injectable()
export class ChatUserFactory {
  constructor() {
  }

  createAnonymousUser() {
    return new ChatUser('Anonym', '/assets/img/fallback_avatar.png', false);
  }

  createSystemUser() {
    return new ChatUser('Holder de ord', '/assets/img/oldlogo.png', true);
  }
}
