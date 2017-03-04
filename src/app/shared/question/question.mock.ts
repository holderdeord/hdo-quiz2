import { Question, QuestionFactory } from '..';

const factory = new QuestionFactory();

export function mockQuestion(properties?: any): Question {
  const data = Object.assign(mockQuestionData(), properties || {});
  return new Question(data.text, data.answer);
}

function mockQuestionData(): Question {
  return factory.createQuestionFromPromise('Holdt', true);
}
