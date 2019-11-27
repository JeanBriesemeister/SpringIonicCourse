import { Component, OnInit } from '@angular/core';
import { OrderDTO } from 'src/models/order.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  order: OrderDTO;

  numberOfParcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder) {

    this.order = this.route.snapshot.queryParams["order"];

    this.formGroup = this.formBuilder.group({
      numberOfParcelas: [1, Validators.required],
      "@type": ["paymentWithCard", Validators.required]
    });
  }

  ngOnInit() {
  }

  nextPage() {
    this.order.payment = this.formGroup.value;
    console.log(this.order);
  }

}
