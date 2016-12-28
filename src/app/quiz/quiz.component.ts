import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuizService, Quiz, QuizState } from '../shared/quiz';
import { ChatService } from '../shared/chat';

@Component({
  selector: 'hdo-quiz',
  styles: [`${require('!raw!sass!./quiz.scss')}`],
  template: require('./quiz.html')
})
export class QuizComponent {
  public responses: boolean[];
  public stack: Quiz;
  public entries: any[] = [];

  constructor(private route: ActivatedRoute,
              private service: QuizService,
              private router: Router,
              private chatService: ChatService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['id'], 10);
      this.responses = [];
      this.service.getStack(id).subscribe(stack => {
        this.stack = stack.start(this.responses);
      });
    });
    this.chatService.entries.subscribe(entry => this.entries.push(entry));
  }

  answer(response: boolean) {
    this.stack.setResponse(response);
    this.responses.push(response);
    if (this.stack.state === QuizState.Complete) {
      this.router.navigate(['/result', this.stack.id, this.stack.getResponsesAsString()]);
    }
  }
}
