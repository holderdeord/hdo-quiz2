import { Component } from "@angular/core";
import { LocalStorage } from "../shared/local-storage/local-storage.class";
import { ActivatedRoute, Router } from "@angular/router";
import { QuizService } from "../shared/quiz/quiz.service";
import { ChatUserFactory } from "../shared/chat/chat-user/chat-user.factory";
import { QuestionFactory } from "../shared/question/question.factory";
import { LocalStorageService } from "../shared/local-storage/local-storage.service";
import { TManuscript } from "../shared/manuscript/manuscript.types";

@Component({
  selector: 'hdo-start',
  template: require('./start.component.html')
})
export class StartComponent {
  public chatLocalStorage: LocalStorage;

  constructor(private route: ActivatedRoute,
              private service: QuizService,
              private chatUserFactory: ChatUserFactory,
              private questionFactory: QuestionFactory,
              private router: Router,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.service.getManuscripts().subscribe((manuscripts: TManuscript[]) => {
      const startManuscript = manuscripts.filter(manuscript => manuscript.default === 'default');
      if (startManuscript.length === 0) {
        throw new Error('No default manuscript were found');
      }
      this.router.navigate(['quiz/', startManuscript[0].pk]);
    });
  }
}
