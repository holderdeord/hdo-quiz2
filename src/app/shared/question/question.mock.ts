import { Question } from './question.class';

export function mockQuestion(properties?: any): Question {
  const data = Object.assign(mockQuestionData(), properties || {});
  return new Question(data.body, data.kept);
}

function mockQuestionData(): Question {
  return {
    'body': 'Holdt',
    'kept': true
  };
}
