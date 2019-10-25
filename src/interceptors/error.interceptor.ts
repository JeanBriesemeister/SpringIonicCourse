import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passed here!");
        return next.handle(request).pipe(catchError(err => {

            let errorObject = err;
            if (errorObject.error) {
                errorObject = errorObject.error;
            }

            if (!errorObject.status) {
                errorObject = JSON.parse(errorObject);
            }

            console.log("Error detected by interceptor:")
            console.log(errorObject);

            switch (errorObject.status) {
                case 403:
                    this.handle403();
                    break;
            }

            return Observable.throw(errorObject);
        })) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};