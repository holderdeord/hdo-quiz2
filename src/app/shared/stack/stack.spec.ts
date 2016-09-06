// import { addProviders, fakeAsync, inject } from '@angular/core/testing';
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { mockStackData } from './stack.mock';
// import { mockPromise } from '../promise/promise.mock';

// import { Promise } from '../promise';
// import { Stack, StackService, StackState } from './';
// import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';

// describe('Stack (shared)', () => {
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
//     StackService
//   ]));

//   describe('Class', () => {
//     let stack;

//     beforeEach(() => {
//       stack = new Stack(1, 'test');
//     });

//     it('exposes properties', () => {
//       expect(stack.id).toBe(1);
//       expect(stack.name).toEqual('test');
//       expect(stack.promises.length).toBe(0);
//       expect(stack.answers.length).toBe(0);
//       expect(stack.current).toBeNull();
//       expect(stack.state).toBe(StackState.NotStarted);
//     });

//     it('exposes addPromise', () => {
//       stack.addPromise(mockPromise());
//       expect(stack.promises.length).toBe(1);
//       expect(stack.answers.length).toBe(1);

//       stack.startQuiz([]);

//       expect(() => stack.addPromise(mockPromise())).toThrow();
//     });

//     it('exposes getNumberOfCorrectResponses', () => {
//       expect(stack.getNumberOfCorrectResponses()).toBe(0);

//       stack.addPromise(mockPromise());
//       stack.addPromise(mockPromise());
//       stack.addPromise(mockPromise());
//       stack.startQuiz([]);

//       expect(stack.getNumberOfCorrectResponses()).toBe(0);

//       stack.setResponse(true);

//       expect(stack.getNumberOfCorrectResponses()).toBe(1);

//       stack.setResponse(false);
//       stack.setResponse(true);

//       expect(stack.getNumberOfCorrectResponses()).toBe(2);
//     });

//     it('exposes getNumberOfQuestions', () => {
//       expect(stack.getNumberOfQuestions()).toBe(0);

//       stack.addPromise(mockPromise());
//       stack.addPromise(mockPromise());

//       expect(stack.getNumberOfQuestions()).toBe(2);

//       stack.addPromise(mockPromise());

//       expect(stack.getNumberOfQuestions()).toBe(3);
//     });

//     it('exposes getNumberOfResponses', () => {
//       expect(stack.getNumberOfResponses()).toBe(0);

//       stack.addPromise(mockPromise());
//       stack.addPromise(mockPromise());
//       stack.startQuiz([]);
//       stack.setResponse(false);

//       expect(stack.getNumberOfResponses()).toBe(1);

//       stack.setResponse(true);

//       expect(stack.getNumberOfResponses()).toBe(2);
//     });

//     it('exposes getResponses', () => {
//       expect(stack.getResponses()).toEqual([]);

//       stack.addPromise(mockPromise());
//       stack.startQuiz([]);
//       stack.setResponse(true);

//       expect(stack.getResponses()).toEqual([true]);
//     });

//     it('exposes getResponsesAsString', () => {
//       expect(stack.getResponsesAsString()).toEqual('');

//       stack.addPromise(mockPromise());
//       stack.addPromise(mockPromise());
//       stack.startQuiz([true]);

//       expect(stack.getResponsesAsString()).toEqual('1');
//     });

//     it('exposes setResponse', () => {
//       expect(() => stack.setResponse(true)).toThrow();

//       stack.addPromise(mockPromise());
//       stack.addPromise(mockPromise());
//       stack.startQuiz([]);

//       expect(stack.setResponse(true)).toBe(true);
//       expect(stack.setResponse(false)).toBe(false);
//       expect(stack.state).toBe(StackState.Complete);
//     });

//     describe('startQuiz', () => {
//       it('needs to have promises before it can start', () => {
//         expect(() => stack.startQuiz([true, true])).toThrow();
//       });

//       it('can be started at the beginning', () => {
//         stack.addPromise(mockPromise());
//         expect(stack.startQuiz([])).toBe(stack);

//         expect(stack.current).toBe(stack.promises[0]);
//         expect(stack.state).toBe(StackState.InProgress);
//       });

//       it('can be started with a given preset of responses', () => {
//         stack.addPromise(mockPromise());
//         stack.addPromise(mockPromise());

//         stack.startQuiz([true]);

//         expect(stack.current).toBe(stack.promises[1]);
//         expect(stack.state).toBe(StackState.InProgress);
//         expect(stack.index).toBe(1);
//       });

//       it('can be completed by giving all responses', () => {
//         stack.addPromise(mockPromise());
//         stack.addPromise(mockPromise());

//         stack.startQuiz([true, true]);

//         expect(stack.current).toBeNull();
//         expect(stack.state).toBe(StackState.Complete);
//         expect(stack.index).toBe(2);
//       });
//     });
//   });

//   describe('Service', () => {
//     describe('getStacks', () => {
//       it('should get stacks from the server', inject(
//         [MockBackend, StackService],
//         fakeAsync((backend: MockBackend, service: StackService) => {
//         backend.connections.subscribe((connection: MockConnection) => {
//           expect(connection.request.method).toBe(RequestMethod.Get);
//           expect(connection.request.url).toEqual('/assets/stacks.json');
//         });

//         service.getStacks();
//       })));

//       it('transforms response to stacks', inject(
//         [MockBackend, StackService],
//         fakeAsync((backend: MockBackend, service: StackService) => {
//         backend.connections.subscribe((connection: MockConnection) => {
//           let response = new ResponseOptions({ body: JSON.stringify(mockStackData()) });
//           connection.mockRespond(new Response(response));
//         });

//         service.getStacks().subscribe(stacks => {
//           expect(stacks.length).toBe(1);
//           expect(stacks[0].id).toBe(1);
//           expect(stacks[0].name).toEqual('Parti');
//           expect(stacks[0].promises.length).toBe(2);
//         });
//       })));
//     });

//     describe('getStack', () => {
//       it('should get stacks from the server', inject(
//         [MockBackend, StackService],
//         fakeAsync((backend: MockBackend, service: StackService) => {
//         // does not support fetching just one atm
//         backend.connections.subscribe((connection: MockConnection) => {
//           expect(connection.request.method).toBe(RequestMethod.Get);
//           expect(connection.request.url).toEqual('/assets/stacks.json');
//         });

//         service.getStack(1);
//       })));

//       it('transforms response to a stack', inject(
//         [MockBackend, StackService],
//         fakeAsync((backend: MockBackend, service: StackService) => {
//         backend.connections.subscribe((connection: MockConnection) => {
//           let response = new ResponseOptions({ body: JSON.stringify(mockStackData()) });
//           connection.mockRespond(new Response(response));
//         });

//         service.getStack(1).subscribe(stack => {
//           expect(stack.id).toBe(1);
//           expect(stack.name).toEqual('Parti');
//           expect(stack.promises.length).toBe(2);
//         });
//       })));
//     });
//   });
// });
