import { Injectable } from '@angular/core';

@Injectable()
export class Question {
  constructor(public body: string, public kept: boolean) {
  }
}
