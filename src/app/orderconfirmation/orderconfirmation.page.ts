import { Component, OnInit } from '@angular/core';
import { OrderDTO } from 'src/models/order.dto';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/models/cartitems';
import { CartService } from 'src/services/domain/cart.service';
import { CustomerDTO } from 'src/models/customer.dto';
import { AddressDTO } from 'src/models/address.dto';
import { CustomerService } from 'src/services/domain/customer.service';
import { NavController } from '@ionic/angular';
import { OrderService } from 'src/services/domain/order.service';

@Component({
  selector: 'app-orderconfirmation',
  templateUrl: './orderconfirmation.page.html',
  styleUrls: ['./orderconfirmation.page.scss'],
})
export class OrderconfirmationPage implements OnInit {

  order: OrderDTO;
  cartItems: CartItem[];
  customer: CustomerDTO;
  address: AddressDTO;
  orderId: string;

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    public cartService: CartService,
    public customerService: CustomerService,
    public orderService: OrderService) {

    this.order = this.route.snapshot.queryParams["order"];
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.cartItems = this.cartService.getCart().products;
    this.customerService.findById(this.order.customer.id).
      subscribe(response => {
        this.customer = response as CustomerDTO;
        this.address = this.findAddress(this.order.address.id, response['addresses']);
      }, error => {
        this.navCtrl.navigateRoot('/home');
      });
  }

  private findAddress(id: string, list: AddressDTO[]): AddressDTO {
    let position = list.findIndex(x => x.id == id);

    return list[position];
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  back() {
    this.navCtrl.navigateRoot('cart');
  }

  home() {
    this.navCtrl.navigateRoot('/home');
  }

  checkOut() {
    this.orderService.insert(this.order)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        console.log(response.headers.get('location'));
        this.orderId = this.extractId(response.headers.get('location'));
      },
        error => {
          if (error.status == 403) {
            this.navCtrl.navigateRoot('/home');
          }
        });
  }

  private extractId(location: string): string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

}
