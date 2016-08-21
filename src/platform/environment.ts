
// Angular 2
import { CompilerConfig } from '@angular/compiler';
import { PLATFORM_DIRECTIVES, PLATFORM_PIPES } from '@angular/core';
// Environment Providers
let PROVIDERS = [
  // common env directives
];

if ('production' === ENV) {
  PROVIDERS = [
    ...PROVIDERS,
    // rc2 workaround
    {
      provide: CompilerConfig,
      useFactory: (platformDirectives: any[], platformPipes: any[]) => {
        let compiler = new CompilerConfig({
          genDebugInfo: true,
          logBindingUpdate: true
        });
        return compiler;
      },
      deps: [PLATFORM_DIRECTIVES, PLATFORM_PIPES]
    },
    // custom providers in production
  ];

} else {
  // Development
  PROVIDERS = [
    ...PROVIDERS,
    // custom providers in development
  ];

}


export const ENV_PROVIDERS = [
  ...PROVIDERS
];
