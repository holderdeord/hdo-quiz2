import { TChatResponseLinks } from "../chat/chat-response/chat-response.types";
export class Alternative<T> {
  constructor(public value: T, public text: string, public className?: string, public links?: TChatResponseLinks) {}
}
