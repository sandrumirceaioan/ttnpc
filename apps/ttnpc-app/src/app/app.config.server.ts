import { mergeApplicationConfig, ApplicationConfig, APP_ID } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerStateInterceptor } from './shared/interceptors/server-state.interceptor';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideClientHydration(),
    { provide: APP_ID, useValue: 'ttnpc-app' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true
    }
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
