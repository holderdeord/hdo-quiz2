import { TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';

export function configureTestBedWithHttp(providers: any[]): TestBed {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  TestBed
    .configureTestingModule({
      providers: providers.concat([
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [ MockBackend, BaseRequestOptions ],
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => new Http(backend, defaultOptions)
        }
      ]),
      imports: [
        HttpModule
      ]
    })
    .compileComponents();
  return getTestBed();
}

export function mockResponse(testBed: TestBed, body: any) {
  testBed.get(MockBackend).connections
    .subscribe(connection => connection.mockRespond(new Response(new ResponseOptions({
      body: body
    }))));
}
