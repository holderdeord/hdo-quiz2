import { TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

export function inject(providers: any[], callback: Function) {
  return () => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({providers}).compileComponents();
    const testBed: TestBed = getTestBed();
    const args: any[] = providers.map(provider => testBed.get(provider));
    return callback.apply(this, args);
  };
}
