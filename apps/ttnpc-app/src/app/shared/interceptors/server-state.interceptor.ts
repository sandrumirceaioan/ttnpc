import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { DataStateService } from '../services/data-state.service';


@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {

  constructor(
    public dataStateService: DataStateService,
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('SERVER INTERCEPT');
    return next.handle(request).pipe(
      tap(response => {
        if ((response instanceof HttpResponse && (response.status === 200 || response.status === 202))) {
          this.dataStateService.setDynamicStateKey(request.urlWithParams, response.body);
        }
      }),
    );

  }

}