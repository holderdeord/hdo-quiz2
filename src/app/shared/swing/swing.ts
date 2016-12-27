declare var Card: any;
declare var Stack: any;

import {Card, Stack} from 'swing';

export interface ISwingCard {
  on(event, listener: Function);
  throwIn(x, y);
  throwOut(x, y);
  destroy();
}

export const SwingCard = Card;
export const SwingStack = Stack;