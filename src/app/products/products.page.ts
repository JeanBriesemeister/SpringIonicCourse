import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';
import { ProductService } from 'src/services/domain/product.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: ProductDTO[] = [];
  page: number = 0;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.loadProducts();
  }

  public loadProducts() {
    let categoryId = this.route.snapshot.queryParams["categoryId"];
    let loader = this.presentLoading();
    this.productService.findByCategory(categoryId, this.page, 10)
      .subscribe(async response => {
        let start = this.products.length;
        this.products = this.products.concat(response['content']);
        let end = this.products.length - 1;
        this.loadImageUrls(start, end);
        (await loader).dismiss();
      }, async errors => {
        (await loader).dismiss();
      });
  }

  loadImageUrls(start: number, end: number) {
    for (var i = start; i < end; i++) {
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

  async presentLoading() {
    let loader = this.loadingCtrl.create({
      message: "Loading..."
    });

    (await loader).present();

    return loader;
  }

  doRefresh(event) {
    this.page = 0;
    this.products = [];
    this.loadProducts();

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  loadData(event) {
    this.page++;
    this.loadProducts();

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
