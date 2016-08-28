import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StackService, Stack } from '../shared/stack';

@Component({
  selector: 'result',
  styles: [],
  template: require('./result.html')
})
export class ResultComponent {
  public stack: Stack;

  constructor(private route: ActivatedRoute, private service: StackService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['id'], 10);
      let responses = params['responses'].split('').map(response => response === '1');
      this.service.getStack(id).subscribe(stack => this.stack = stack.startQuiz().setResponses(responses));
    });
  }
}
