import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';
import { ProductService } from 'src/services/domain/product.service';
import { ActivatedRoute } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { CartService } from 'src/services/domain/cart.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.page.html',
  styleUrls: ['./productdetail.page.scss'],
})
export class ProductdetailPage implements OnInit {

  product: ProductDTO;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    public cartService: CartService,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadProduct();
  }

  loadProduct() {
    let productId = this.route.snapshot.queryParams["productId"];
    this.productService.findById(productId)
      .subscribe(response => {
        this.product = response;
        this.getImageUrlIfExists();
      }, error => { });
  }

  getImageUrlIfExists() {
    this.productService.getImageFromBucket(this.product.id)
      .subscribe(response => {
        this.product.imageUrl = `${API_CONFIG.buckectBaseUrl}/prod${this.product.id}.jpg`;
        console.log(this.product.imageUrl);
      }, error => { });
  }

  addToCart(product: ProductDTO) {
    this.cartService.addProduct(product);
    this.navCtrl.navigateRoot("/cart");
  }

  goToCart() {
    this.navCtrl.navigateForward('/cart');
  }
}
