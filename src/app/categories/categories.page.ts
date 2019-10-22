import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/services/domain/category.service';
import { CategoryDTO } from 'src/models/category.dto';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  items: CategoryDTO[];

  bucketUrl: string = API_CONFIG.buckectBaseUrl;

  constructor(public categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.findAll()
      .subscribe(response => {
        this.items = response;
      },
        error => { });
  }

}
