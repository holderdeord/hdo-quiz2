import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { QuizService } from "../shared/quiz/quiz.service";

@Component({
  selector: 'hdo-start',
  template: require('./start.component.html')
})
export class StartComponent {
  constructor(private service: QuizService,
              private router: Router) {
  }

  ngOnInit() {
    this.service.getDefaultManuscript()
      .then(startManuscript => {
        if (!startManuscript) {
          throw new Error('No default manuscript were found');
        }
        this.router.navigate(['quiz/', startManuscript.pk]);
      });
  }
}
