import { IChatUser } from './chat-user.interface';

export class ChatUser implements IChatUser {
  constructor(private _name: string, private _pictureUrl: string) {
  }

  public get name() : string {
    return this._name;
  }

  public get pictureUrl(): string {
    return this._pictureUrl;
  }
}
