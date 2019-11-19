import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { ProvinceDTO } from 'src/models/province.dto';
import { Observable } from 'rxjs';
import { ProductDTO } from 'src/models/product.dto';

@Injectable()
export class ProductService {

    constructor(public http: HttpClient) { }

    findById(id: string){
        return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${id}`);
    }

    findByCategory(categoryId: string): Observable<ProvinceDTO[]> {
        return this.http.get<ProvinceDTO[]>(`${API_CONFIG.baseUrl}/products/?categories=${categoryId}`);
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.buckectBaseUrl}/prod${id}-small.jpg`;

        return this.http.get(url, {
            responseType: 'blob'
        });
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.buckectBaseUrl}/prod${id}.jpg`;

        return this.http.get(url, {
            responseType: 'blob'
        });
    }
}