import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { StackService, Stack, StackState } from '../shared/stack';
import { LocalStorageService } from '../shared/storage';
import { ChatService, IChatEntry, ChatMessageEntryComponent } from '../shared/chat';

@Component({
  selector: 'hdo-quiz',
  styles: [`${require('!raw!sass!./quiz.scss')}`],
  template: require('./quiz.html')
})
export class QuizComponent {
  public responses: boolean[];
  public stack: Stack;
  public entries: any[] = [];

  constructor(private route: ActivatedRoute,
              private service: StackService,
              private router: Router,
              private storageService: LocalStorageService,
              private chatService: ChatService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['id'], 10);
      this.responses = [];
      this.service.getStack(id).subscribe(stack => {
        this.stack = stack.startQuiz(this.responses);
      });
    });
    this.chatService.entries.subscribe(entry => this.entries.push(entry));
  }

  answer(response: boolean) {
    this.stack.setResponse(response);
    this.responses.push(response);
    if (this.stack.state === StackState.Complete) {
      this.router.navigate(['/result', this.stack.id, this.stack.getResponsesAsString()]);
    }
  }
}
