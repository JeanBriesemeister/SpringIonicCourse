import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AuthInterceptorProvider } from 'src/interceptors/auth.interceptor';
import { ErrorInterceptorProvider } from 'src/interceptors/error.interceptor';
import { AuthService } from 'src/services/auth.service';
import { CategoryService } from 'src/services/domain/category.service';
import { CustomerService } from 'src/services/domain/customer.service';
import { StorageService } from 'src/services/storage.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductService } from 'src/services/domain/product.service';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CategoryService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    CustomerService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
