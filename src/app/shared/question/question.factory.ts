import { Injectable } from '@angular/core';
import { TManuscript, TManuscriptItem, TManuscriptVoterGuideAlternative } from "../manuscript/manuscript.types";
import { THdoCategory } from "../hdo-category/hdo-category.types";
import { Question } from "./question.class";
import { Alternative } from "../alternative/alternative.class";

@Injectable()
export class QuestionFactory {
  public createQuestionFromPromise(text: string, answer: boolean): Question<boolean> {
    const question = new Question(text, answer);
    question.addAlternative(new Alternative(true, 'Holdt', 'btn btn-success'));
    question.addAlternative(new Alternative(false, 'Ikke holdt', 'btn btn-danger'));
    return question;
  }

  // public createQuestionFromMultiple(text: string, alternatives: IManuscriptEntryMultipleAlternativeEntry[]) {
  //   const question = new Question(text, null);
  //   alternatives.forEach(data => {
  //     question.addAlternative(new Alternative(data.id, data.text));
  //   });
  //   return question;
  // }

  public createQuestionFromQuickReply(entry: TManuscriptItem): Question<TManuscriptItem> {
    const question = new Question(entry.text, null);
    question.addAlternative(this.createQuickReplyAlternative(entry.reply_action_1, entry.reply_text_1));
    if (entry.reply_text_2 !== '') {
      question.addAlternative(this.createQuickReplyAlternative(entry.reply_action_2, entry.reply_text_2));
    }
    if (entry.reply_text_3 !== '') {
      question.addAlternative(this.createQuickReplyAlternative(entry.reply_action_3, entry.reply_text_3));
    }
    return question;
  }

  public createQuestionFromVoterGuideCategories(entry: TManuscriptItem, categories: string[]) {
    const question = new Question<string>(entry.text, null);
    categories.forEach((category) => {
      question.addAlternative(new Alternative(category, category));
    });
    return question;
  }

  public createVoterGuideQuestion(manuscript: TManuscript) {
    const question = new Question<TManuscriptVoterGuideAlternative>(null, null);
    manuscript.voter_guide_alternatives.forEach(alternative => {
      question.addAlternative(new Alternative<TManuscriptVoterGuideAlternative>(alternative, alternative.text));
    });
    return question;
  }

  private createQuickReplyAlternative(reply_action: number, reply_text: string) {
    if (reply_action) {
      return new Alternative(reply_action, reply_text, null, {
        next: reply_action.toString()
      });
    }
    return new Alternative(reply_action, reply_text);
  }

  // public createQuestionFromRandom(questionText: string, random: TManuscriptRandom, items: TManuscriptRandomItem[]): Question<TManuscriptRandomItem> {
  //   const selection: TManuscriptRandomItem[] = [];
  //   while (selection.length < random.selection && items.length > 0) {
  //     const index = Math.floor(Math.random()*items.length);
  //     const item = items.splice(index, 1);
  //     selection.push(item[0]);
  //   }
  //   let text = `<p>${questionText}</p><ol>`;
  //   selection.forEach(item => text += `<li>${item.text}</li>`);
  //   text += '</ol>';
  //   const question = new Question(text, null);
  //   selection.forEach((item, index) => question.addAlternative(new Alternative(item, `Valg #${index+1}`, 'btn btn-primary', item.links)));
  //   // question.addAlternative(items.length > 0 ?
  //   //   new Alternative(RandomSpecialAlternatives.ShowMeMore, random.texts.more, 'btn') :
  //   //   new Alternative(RandomSpecialAlternatives.NoneAreInteresting, random.texts.end, 'btn'));
  //   return question;
  // }

  // public createQuestionsFromRandom(random: TManuscriptRandom): Question<TManuscriptRandomItem> {
  //   const items = [...random.items];
  //   return this.createQuestionFromRandom(random.texts.introduction, random, items);
  //   // const questions = [this.createQuestionFromRandom(random.texts.introduction, random, items)];
  //   // while (items.length > 0) {
  //   //   questions.push(this.createQuestionFromRandom(random.texts.followup, random, items))
  //   // }
  //   // return questions;
  // }

  // public createOpenQuestion(text: string, alternatives: any[] = []): Question<any> {
  //   const question = new Question(text, null);
  //   alternatives.forEach(data => {
  //     const alternative = new Alternative(data.value, data.text, data.className || 'btn');
  //     question.addAlternative(alternative);
  //   });
  //   return question;
  // }

  public createReloadManuscriptQuestion(timeUntilNextReload: number): Question<any> {
    const question = new Question(`Beklager, jeg får ikke kontakt med serveren akkurat nå =( Vent litt, så skal jeg prøve igjen om ${timeUntilNextReload} sekunder, eller si i fra når du tror jeg skal ha tilgang igjen.`, null);
    const alternative = new Alternative(null, 'Prøv igjen nå');
    question.addAlternative(alternative);
    return question;
  }
}
