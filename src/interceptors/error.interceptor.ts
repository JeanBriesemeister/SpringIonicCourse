import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

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

            return Observable.throw(errorObject);
        })) as any;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};