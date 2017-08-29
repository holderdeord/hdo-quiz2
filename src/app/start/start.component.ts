import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { VoterGuideFactory } from "../shared/voter-guide/voter-guide.factory";
import { TManuscript } from "../shared/manuscript/manuscript.types";

@Component({
  selector: 'hdo-start',
  template: require('./start.component.html')
})
export class StartComponent {
  constructor(private router: Router,
              private voterGuideFactory: VoterGuideFactory) {
  }

  ngOnInit() {
    this.voterGuideFactory.create(null)
      .then(voterGuide => {
        const startManuscript: TManuscript = voterGuide.hasStartedAnswering() ?
          voterGuide.getCategoryManuscript() :
          voterGuide.getStartManuscript();
        if (!startManuscript) {
          throw new Error('No default manuscript were found');
        }
        this.router.navigate(['quiz/', startManuscript.pk]);
      });
  }
}
