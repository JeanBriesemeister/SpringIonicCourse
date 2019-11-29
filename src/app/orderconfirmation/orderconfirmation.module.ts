import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderconfirmationPage } from './orderconfirmation.page';
import { OrderService } from 'src/services/domain/order.service';

const routes: Routes = [
  {
    path: '',
    component: OrderconfirmationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    OrderService
  ],
  declarations: [OrderconfirmationPage]
})
export class OrderconfirmationPageModule { }
