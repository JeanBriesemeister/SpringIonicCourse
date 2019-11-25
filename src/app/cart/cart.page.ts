import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/models/cartitems';
import { NavController } from '@ionic/angular';
import { ProductService } from 'src/services/domain/product.service';
import { API_CONFIG } from 'src/config/api.config';
import { CartService } from 'src/services/domain/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartitems: CartItem[];

  constructor(public navCtrl: NavController, public cartService: CartService, public productService: ProductService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.loadCart();
  }

  loadCart() {
    let cart = this.cartService.getCart();
    this.cartitems = cart.products;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (var i = 0; i < this.cartitems.length; i++) {
      let cartItem = this.cartitems[i];
      this.productService.getSmallImageFromBucket(cartItem.product.id)
        .subscribe(response => {
          cartItem.product.imageUrl = `${API_CONFIG.buckectBaseUrl}/prod${cartItem.product.id}-small.jpg`;
        }, error => { });
    }
  }

}
