import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';
import { AlertController, NavController } from '@ionic/angular';
import { FieldMessage } from 'src/models/fieldmessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertController: AlertController, public navCtrl: NavController) { }

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
                case 401:
                    this.handle401();
                    break;

                case 403:
                    this.handle403();
                    break;

                case 422:
                    this.handle422(errorObject);
                    break;

                default:
                    this.handleDefaultError(errorObject);
            }

            return Observable.throw(errorObject);
        })) as any;
    }

    async handle422(errorObject) {
        let alert = await this.alertController.create({
            header: 'Error ' + errorObject.status + ': ' + errorObject.error,
            message: this.listErrors(errorObject.errors),
            backdropDismiss: false,
            buttons: [{
                text: 'OK'
            }]
        });

        await alert.present();
    }

    listErrors(messages: FieldMessage[]): string {
        let s: string = '';
        for (var i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + '</strong> ' + messages[i].message + '</p>';
        }

        return s;
    }

    async handleDefaultError(errorObject: any) {
        let alert = await this.alertController.create({
            header: 'Error ' + errorObject.status + ': ' + errorObject.error,
            message: errorObject.message,
            backdropDismiss: false,
            buttons: [{
                text: 'OK',
                handler: () => {
                    this.navCtrl.navigateRoot("/home");
                }
            }]
        });

        await alert.present();
    }

    async handle401() {
        let alert = await this.alertController.create({
            header: 'Error 401: Authentication failure',
            message: 'Email or password incorrects',
            backdropDismiss: false,
            buttons: [{
                text: 'OK',
                handler: () => {
                    this.navCtrl.navigateRoot("/home");
                }
            }]
        });

        await alert.present();
    }

    async handle403() {
        this.storage.setLocalUser(null);

        /*let alert = await this.alertController.create({
            header: 'Error 403: Access denied',
            message: 'Access denied!',
            backdropDismiss: false,
            buttons: [{
                text: 'OK',
                handler: () => {
                    this.navCtrl.navigateRoot("/home");
                }
            }]
        });

        await alert.present();*/
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};