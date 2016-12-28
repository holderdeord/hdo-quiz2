import { Question } from './question.class';

export function mockQuestion(): Question {
  const data = mockQuestionData();
  return new Question(data.body, data.kept);
}

function mockQuestionData(): Question {
  return {
    'body': 'Holdt',
    'kept': true
  };
}
