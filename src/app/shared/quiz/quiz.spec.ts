// import { addProviders, fakeAsync, inject } from '@angular/core/testing';
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { mockStackData } from './quiz.mock';
// import { mockQuestion } from '../question/question.mock';

// import { Question } from '../question';
// import { Quiz, QuizService, QuizState } from './';
// import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, ChatResponse } from '@angular/http';

// describe('Quiz (shared)', () => {
//   beforeEach(() => addProviders([
//     BaseRequestOptions,
//     MockBackend,
//     {
//       provide: Http,
//       useFactory: function (backend, defaultOptions) {
//         return new Http(backend, defaultOptions);
//       },
//       deps: [MockBackend, BaseRequestOptions]
//     },
//     QuizService
//   ]));

//   describe('Class', () => {
//     let quiz;

//     beforeEach(() => {
//       quiz = new Quiz(1, 'test');
//     });

//     it('exposes properties', () => {
//       expect(quiz.id).toBe(1);
//       expect(quiz.name).toEqual('test');
//       expect(quiz.questions.length).toBe(0);
//       expect(quiz.answers.length).toBe(0);
//       expect(quiz.current).toBeNull();
//       expect(quiz.state).toBe(QuizState.NotStarted);
//     });

//     it('exposes addQuestion', () => {
//       quiz.addQuestion(mockQuestion());
//       expect(quiz.questions.length).toBe(1);
//       expect(quiz.answers.length).toBe(1);

//       quiz.start([]);

//       expect(() => quiz.addQuestion(mockQuestion())).toThrow();
//     });

//     it('exposes getNumberOfCorrectResponses', () => {
//       expect(quiz.getNumberOfCorrectResponses()).toBe(0);

//       quiz.addQuestion(mockQuestion());
//       quiz.addQuestion(mockQuestion());
//       quiz.addQuestion(mockQuestion());
//       quiz.start([]);

//       expect(quiz.getNumberOfCorrectResponses()).toBe(0);

//       quiz.setResponse(true);

//       expect(quiz.getNumberOfCorrectResponses()).toBe(1);

//       quiz.setResponse(false);
//       quiz.setResponse(true);

//       expect(quiz.getNumberOfCorrectResponses()).toBe(2);
//     });

//     it('exposes getNumberOfQuestions', () => {
//       expect(quiz.getNumberOfQuestions()).toBe(0);

//       quiz.addQuestion(mockQuestion());
//       quiz.addQuestion(mockQuestion());

//       expect(quiz.getNumberOfQuestions()).toBe(2);

//       quiz.addQuestion(mockQuestion());

//       expect(quiz.getNumberOfQuestions()).toBe(3);
//     });

//     it('exposes getNumberOfResponses', () => {
//       expect(quiz.getNumberOfResponses()).toBe(0);

//       quiz.addQuestion(mockQuestion());
//       quiz.addQuestion(mockQuestion());
//       quiz.start([]);
//       quiz.setResponse(false);

//       expect(quiz.getNumberOfResponses()).toBe(1);

//       quiz.setResponse(true);

//       expect(quiz.getNumberOfResponses()).toBe(2);
//     });

//     it('exposes getResponses', () => {
//       expect(quiz.getResponses()).toEqual([]);

//       quiz.addQuestion(mockQuestion());
//       quiz.start([]);
//       quiz.setResponse(true);

//       expect(quiz.getResponses()).toEqual([true]);
//     });

//     it('exposes getResponsesAsString', () => {
//       expect(quiz.getResponsesAsString()).toEqual('');

//       quiz.addQuestion(mockQuestion());
//       quiz.addQuestion(mockQuestion());
//       quiz.start([true]);

//       expect(quiz.getResponsesAsString()).toEqual('1');
//     });

//     it('exposes setResponse', () => {
//       expect(() => quiz.setResponse(true)).toThrow();

//       quiz.addQuestion(mockQuestion());
//       quiz.addQuestion(mockQuestion());
//       quiz.start([]);

//       expect(quiz.setResponse(true)).toBe(true);
//       expect(quiz.setResponse(false)).toBe(false);
//       expect(quiz.state).toBe(QuizState.Complete);
//     });

//     describe('start', () => {
//       it('needs to have questions before it can start', () => {
//         expect(() => quiz.start([true, true])).toThrow();
//       });

//       it('can be started at the beginning', () => {
//         quiz.addQuestion(mockQuestion());
//         expect(quiz.start([])).toBe(quiz);

//         expect(quiz.current).toBe(quiz.questions[0]);
//         expect(quiz.state).toBe(QuizState.InProgress);
//       });

//       it('can be started with a given preset of responses', () => {
//         quiz.addQuestion(mockQuestion());
//         quiz.addQuestion(mockQuestion());

//         quiz.start([true]);

//         expect(quiz.current).toBe(quiz.questions[1]);
//         expect(quiz.state).toBe(QuizState.InProgress);
//         expect(quiz.index).toBe(1);
//       });

//       it('can be completed by giving all responses', () => {
//         quiz.addQuestion(mockQuestion());
//         quiz.addQuestion(mockQuestion());

//         quiz.start([true, true]);

//         expect(quiz.current).toBeNull();
//         expect(quiz.state).toBe(QuizState.Complete);
//         expect(quiz.index).toBe(2);
//       });
//     });
//   });

//   describe('Service', () => {
//     describe('getStacks', () => {
//       it('should get stacks from the server', inject(
//         [MockBackend, QuizService],
//         fakeAsync((backend: MockBackend, service: QuizService) => {
//         backend.connections.subscribe((connection: MockConnection) => {
//           expect(connection.request.method).toBe(RequestMethod.Get);
//           expect(connection.request.url).toEqual('/assets/stacks.json');
//         });

//         service.getStacks();
//       })));

//       it('transforms response to stacks', inject(
//         [MockBackend, QuizService],
//         fakeAsync((backend: MockBackend, service: QuizService) => {
//         backend.connections.subscribe((connection: MockConnection) => {
//           let response = new ResponseOptions({ questionText: JSON.stringify(mockStackData()) });
//           connection.mockRespond(new ChatResponse(response));
//         });

//         service.getStacks().subscribe(stacks => {
//           expect(stacks.length).toBe(1);
//           expect(stacks[0].id).toBe(1);
//           expect(stacks[0].name).toEqual('Parti');
//           expect(stacks[0].questions.length).toBe(2);
//         });
//       })));
//     });

//     describe('getStack', () => {
//       it('should get stacks from the server', inject(
//         [MockBackend, QuizService],
//         fakeAsync((backend: MockBackend, service: QuizService) => {
//         // does not support fetching just one atm
//         backend.connections.subscribe((connection: MockConnection) => {
//           expect(connection.request.method).toBe(RequestMethod.Get);
//           expect(connection.request.url).toEqual('/assets/stacks.json');
//         });

//         service.getStack(1);
//       })));

//       it('transforms response to a quiz', inject(
//         [MockBackend, QuizService],
//         fakeAsync((backend: MockBackend, service: QuizService) => {
//         backend.connections.subscribe((connection: MockConnection) => {
//           let response = new ResponseOptions({ questionText: JSON.stringify(mockStackData()) });
//           connection.mockRespond(new ChatResponse(response));
//         });

//         service.getStack(1).subscribe(quiz => {
//           expect(quiz.id).toBe(1);
//           expect(quiz.name).toEqual('Parti');
//           expect(quiz.questions.length).toBe(2);
//         });
//       })));
//     });
//   });
// });
