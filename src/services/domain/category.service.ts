import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { CategoryDTO } from 'src/models/category.dto';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {

    constructor(public http: HttpClient) { }

    findAll(): Observable<CategoryDTO[]> {
        return this.http.get<CategoryDTO[]>(`${API_CONFIG.baseUrl}/categories`);
    }
}