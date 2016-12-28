import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService, Quiz } from '../shared/quiz';

@Component({
  selector: 'result',
  template: require('./result.html')
})
export class ResultComponent {
  public stack: Quiz;

  constructor(private route: ActivatedRoute, private service: QuizService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['id'], 10);
      let responses = params['responses'].split('').map(response => response === '1');
      this.service.getStack(id).subscribe(stack => this.stack = stack.start(responses));
    });
  }
}
