import { Injectable } from '@angular/core';
import {
  Alternative,
  IManuscriptEntryMultipleAlternativeEntry,
  TManuscriptRandom,
  TManuscriptRandomItem,
  Question,
  RandomSpecialAlternatives
} from '..';

@Injectable()
export class QuestionFactory {
  public createQuestionFromPromise(text: string, answer: boolean): Question<boolean> {
    const question = new Question(text, answer);
    question.addAlternative(new Alternative(true, 'Holdt', 'btn btn-success'));
    question.addAlternative(new Alternative(false, 'Ikke holdt', 'btn btn-danger'));
    return question;
  }

  public createQuestionFromMultiple(text: string, alternatives: IManuscriptEntryMultipleAlternativeEntry[]) {
    const question = new Question(text, null);
    alternatives.forEach(data => {
      question.addAlternative(new Alternative(data.id, data.text));
    });
    return question;
  }

  public createQuestionFromRandom(questionText: string, random: TManuscriptRandom, items: TManuscriptRandomItem[]): Question<TManuscriptRandomItem> {
    const selection: TManuscriptRandomItem[] = [];
    const numberOfAlternatives = items.length;
    while (selection.length < numberOfAlternatives && items.length > 0) {
      const index = Math.floor(Math.random()*items.length);
      const item = items.splice(index, 1);
      selection.push(item[0]);
    }
    let text = `<p>${questionText}</p><ol>`;
    selection.forEach(item => text += `<li>${item.text}</li>`);
    text += '</ol>';
    const question = new Question(text, null);
    selection.forEach((item, index) => question.addAlternative(new Alternative(item, `Valg #${index+1}`, 'btn btn-primary')));
    // question.addAlternative(items.length > 0 ?
    //   new Alternative(RandomSpecialAlternatives.ShowMeMore, random.texts.more, 'btn') :
    //   new Alternative(RandomSpecialAlternatives.NoneAreInteresting, random.texts.end, 'btn'));
    return question;
  }

  public createQuestionsFromRandom(random: TManuscriptRandom): Question<TManuscriptRandomItem> {
    const items = [...random.items];
    return this.createQuestionFromRandom(random.texts.introduction, random, items);
    // const questions = [this.createQuestionFromRandom(random.texts.introduction, random, items)];
    // while (items.length > 0) {
    //   questions.push(this.createQuestionFromRandom(random.texts.followup, random, items))
    // }
    // return questions;
  }

  public createOpenQuestion(text: string, alternatives: any[]): Question<any> {
    const question = new Question(text, null);
    alternatives.forEach(data => {
      const alternative = new Alternative(data.value, data.text, data.className || 'btn');
      question.addAlternative(alternative);
    });
    return question;
  }

  public createReloadManuscriptQuestion(timeUntilNextReload: number): Question<any> {
    const question = new Question(`Beklager, jeg får ikke kontakt med serveren akkurat nå =( Vent litt, så skal jeg prøve igjen om ${timeUntilNextReload} sekunder, eller si i fra når du tror jeg skal ha tilgang igjen.`, null);
    const alternative = new Alternative(null, 'Prøv igjen nå');
    question.addAlternative(alternative);
    return question;
  }
}
