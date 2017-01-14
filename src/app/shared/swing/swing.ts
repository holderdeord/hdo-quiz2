import { Card, Stack } from 'swing';

export interface ISwingCard {
  on(event, listener: Function);
  throwIn(x, y);
  throwOut(x, y);
  destroy();
}

export const swingCard = Card;
export const swingStack = Stack;
