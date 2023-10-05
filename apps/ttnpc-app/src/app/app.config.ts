import { PreloadAllModules, RouteReuseStrategy, RouterModule, TitleStrategy, provideRouter } from '@angular/router';
import { APP_ID, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { APP_ROUTES } from './app.routes';
import { environment } from '../environments/environment';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserStateInterceptor } from './shared/interceptors/browser-state.interceptor';


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(APP_ROUTES),
        { provide: environment.apiPath, useValue: environment.apiPath },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: APP_ID, useValue: 'ttnpc-app' },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BrowserStateInterceptor,
            multi: true
        },
        importProvidersFrom(
            BrowserModule,
            IonicModule.forRoot(),
            RouterModule.forRoot(APP_ROUTES, {
                bindToComponentInputs: true,
                preloadingStrategy: PreloadAllModules
            }),
            HttpClientModule,
        ),
    ]
};