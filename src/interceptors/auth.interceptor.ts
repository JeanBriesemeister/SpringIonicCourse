import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();
        let urlLength = API_CONFIG.baseUrl.length;
        let requestToAPI = request.url.substring(0, urlLength) == API_CONFIG.baseUrl;

        if (localUser && requestToAPI) {
            const authReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localUser.token) });
            return next.handle(authReq);
        } else {
            return next.handle(request)
        }
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};