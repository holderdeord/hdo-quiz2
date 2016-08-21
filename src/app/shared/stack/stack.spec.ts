// import {
//   fakeAsync,
//   inject
// } from '@angular/core/testing';

// // Load the implementations that should be tested
// import { Promise } from '../promise/promise.class';
// import { Stack } from './stack.class';
// import { StackService } from './stack.service';
// import {
//   BaseRequestOptions,
//   Http,
//   RequestMethod,
//   ResponseOptions,
//   Response
// } from '@angular/http';
// import { MockBackend, MockConnection } from '@angular/http/testing';

// describe('Stack', () => {
//   // provide our implementations or mocks to the dependency injector
//   beforeEach(() => [
//     Promise,
//     BaseRequestOptions,
//     MockBackend,
//     {
//       provide: Http,
//       useFactory: function (backend, defaultOptions) {
//         return new Http(backend, defaultOptions);
//       },
//       deps: [MockBackend, BaseRequestOptions]
//     },
//     Stack,
//     StackService
//   ]);

//   describe('Class', () => {
//     it('exposes getStacks', () => {
//       let stack = new Stack(1, 'test');
//       expect(stack.id).toBe(1);
//       expect(stack.name).toEqual('test');
//       expect(stack.promises.length).toBe(0);
//     });
//   });

//   it('should get data from the server', inject(
//     [MockBackend, StackService],
//     fakeAsync((backend: MockBackend, service: StackService) => {
//       backend.connections.subscribe((connection: MockConnection) => {
//         expect(connection.request.method).toBe(RequestMethod.Get);
//         expect(connection.request.url).toEqual('/assets/stacks.json');
//       });

//       service.getStacks();
//     })));

//   it('transforms response to a stack', inject(
//     [MockBackend, StackService],
//     fakeAsync((backend: MockBackend, service: StackService) => {
//       backend.connections.subscribe((connection: MockConnection) => {
//         let mockResponseBody: any[] = [
//           {
//             'id': 1,
//             'name': 'Parti',
//             'promises': [
//               {
//                 'body': 'Holdt',
//                 'kept': true
//               },
//               {
//                 'body': 'Ikke holdt',
//                 'kept': false
//               }
//             ]
//           }
//         ];

//         let response = new ResponseOptions({ body: JSON.stringify(mockResponseBody) });
//         connection.mockRespond(new Response(response));
//       });

//       service.getStacks()
//         .subscribe(stacks => {
//           expect(stacks.length).toBe(1);
//           expect(stacks[0].id).toBe(1);
//           expect(stacks[0].name).toEqual('Parti');
//           expect(stacks[0].promises.length).toBe(2);
//         });
//     })));
// });
