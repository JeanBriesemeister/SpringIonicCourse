import { Component, OnInit } from '@angular/core';
import { AddressDTO } from 'src/models/address.dto';
import { StorageService } from 'src/services/storage.service';
import { CustomerService } from 'src/services/domain/customer.service';
import { NavController } from '@ionic/angular';
import { OrderDTO } from 'src/models/order.dto';
import { CartService } from 'src/services/domain/cart.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-pickaddress',
  templateUrl: './pickaddress.page.html',
  styleUrls: ['./pickaddress.page.scss'],
})
export class PickaddressPage implements OnInit {

  items: AddressDTO[];

  order: OrderDTO;

  constructor(
    public storage: StorageService,
    public customerService: CustomerService,
    public navCtrl: NavController,
    public cartService: CartService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadAddresses();
  }

  loadAddresses() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.customerService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['addresses'];

          let cart = this.cartService.getCart();

          this.order = {
            customer: { id: response['id'] },
            address: null,
            items: cart.products.map(p => { return { quantity: p.quantity, product: { id: p.product.id } } }),
            payment: null
          };
        }, error => {
          if (error.status == 403) {
            this.navCtrl.navigateRoot("/home");
          }
        });
    } else {
      this.navCtrl.navigateRoot("/home");
    }
  }

  nextPage(address: AddressDTO) {
    this.order.address = { id: address.id };

    let navigationExtras: NavigationExtras = {
      queryParams: {
        order: this.order
      }
    };
    
    this.navCtrl.navigateForward('/payment', navigationExtras);
  }

}
