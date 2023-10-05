import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { DataStateService } from '../services/data-state.service';


@Injectable()
export class BrowserStateInterceptor implements HttpInterceptor {

    constructor(
        public dataStateService: DataStateService,
    ) { }

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        console.log('BROWSER INTERCEPT');
        if (request.method === 'GET') {
            const storedResponse: unknown = this.dataStateService.getDynamicStateKey(request.urlWithParams);
            if (storedResponse) {
                const response = new HttpResponse({ body: storedResponse, status: 200 });
                return of(response);
            }
        }

        return next.handle(request);
    }

}