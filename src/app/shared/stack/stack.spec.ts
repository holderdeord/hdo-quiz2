import { addProviders, fakeAsync, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { mockStack } from './stack.mock';

import { Promise } from '../promise';
import { Stack, StackService } from './';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';

describe('Stack', () => {
  beforeEach(() => addProviders([
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      useFactory: function (backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },
    StackService
  ]));

  describe('Class', () => {
    it('sets properties', () => {
      let stack = new Stack(1, 'test');

      expect(stack.id).toBe(1);
      expect(stack.name).toEqual('test');
      expect(stack.promises.length).toBe(0);
    });
  });

  describe('Service', () => {
    describe('getStacks', () => {
      it('should get stacks from the server', inject([MockBackend, StackService], fakeAsync((backend: MockBackend, service: StackService) => {
        backend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toEqual('/assets/stacks.json');
        });

        service.getStacks();
      })));

      it('transforms response to stacks', inject([MockBackend, StackService], fakeAsync((backend: MockBackend, service: StackService) => {
        backend.connections.subscribe((connection: MockConnection) => {
          let response = new ResponseOptions({ body: JSON.stringify(mockStack()) });
          connection.mockRespond(new Response(response));
        });

        service.getStacks().subscribe(stacks => {
          expect(stacks.length).toBe(1);
          expect(stacks[0].id).toBe(1);
          expect(stacks[0].name).toEqual('Parti');
          expect(stacks[0].promises.length).toBe(2);
        });
      })));
    });

    describe('getStack', () => {
      it('should get stacks from the server', inject([MockBackend, StackService], fakeAsync((backend: MockBackend, service: StackService) => {
        backend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toEqual('/assets/stacks.json');
        });

        service.getStack(1);
      })));

      it('transforms response to a stack', inject([MockBackend, StackService], fakeAsync((backend: MockBackend, service: StackService) => {
        backend.connections.subscribe((connection: MockConnection) => {
          let response = new ResponseOptions({ body: JSON.stringify(mockStack()) });
          connection.mockRespond(new Response(response));
        });

        service.getStack(1).subscribe(stack => {
          expect(stack.id).toBe(1);
          expect(stack.name).toEqual('Parti');
          expect(stack.promises.length).toBe(2);
        });
      })));
    })
  });
});
