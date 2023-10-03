import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { PreloadAllModules, RouteReuseStrategy, RouterModule } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: environment.apiPath, useValue: environment.apiPath },
    //{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
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
}).catch((err) => console.error(err));