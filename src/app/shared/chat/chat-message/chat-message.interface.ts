export interface IChatMessage {
  type: any;
  resolve(callback: Function): void;
  toText(): string;
}
