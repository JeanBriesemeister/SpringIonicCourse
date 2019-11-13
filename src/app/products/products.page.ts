import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';
import { ProductService } from 'src/services/domain/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: ProductDTO[];

  constructor(public productService: ProductService, private route: ActivatedRoute) { }

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
      }, errors => { });
  }

}
