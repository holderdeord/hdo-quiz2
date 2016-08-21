import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PLATFORM_PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS } from './platform/environment';

import { APP_PROVIDERS } from './app';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, [
  ...PLATFORM_PROVIDERS,
  ...ENV_PROVIDERS,
  ...APP_PROVIDERS
])
  .catch(err => console.error(err));
