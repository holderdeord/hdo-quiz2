import { Injectable } from '@angular/core';
import { IChatUser } from './chat-user.interface';

@Injectable()
export class ChatUser implements IChatUser {
  constructor(private name: string, private pictureUrl: string) {
  }

  getPictureUrl(): string {
    return this.pictureUrl;
  }

  getName(): string {
    return this.name;
  }
}