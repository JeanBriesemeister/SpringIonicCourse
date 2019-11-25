import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';
import { ProductService } from 'src/services/domain/product.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: ProductDTO[];

  constructor(public productService: ProductService, private route: ActivatedRoute, public navCtrl: NavController) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.loadProducts();
  }

  public loadProducts() {
    let categoryId = this.route.snapshot.queryParams["categoryId"];
    this.productService.findByCategory(categoryId)
      .subscribe(response => {
        this.products = response['content'];
        this.loadImageUrls();
      }, errors => { });
  }

  loadImageUrls() {
    for (var i = 0; i < this.products.length; i++) {
      let product = this.products[i];
      this.productService.getSmallImageFromBucket(product.id)
        .subscribe(response => {
          product.imageUrl = `${API_CONFIG.buckectBaseUrl}/prod${product.id}-small.jpg`;
        }, error => { });
    }
  }

  showDetail(productId: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        productId: productId
      }
    };

    this.navCtrl.navigateForward('/productdetail', navigationExtras);
  }

  goToCart() {
    this.navCtrl.navigateForward('/cart');
  }

}
