// App
export * from './app.component';
// export * from './app.routes';
export * from './app.service';

import { AppModule } from './app.module';

// Application wide providers
export const APP_PROVIDERS = [
  AppModule
];
