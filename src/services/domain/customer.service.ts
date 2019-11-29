import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDTO } from 'src/models/customer.dto';
import { API_CONFIG } from 'src/config/api.config';
import { StorageService } from '../storage.service';

@Injectable()
export class CustomerService {

    constructor(public http: HttpClient, public storage: StorageService) { }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/customers/email?value=${email}`);
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/customers/${id}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.buckectBaseUrl}/cp${id}.jpg`;

        return this.http.get(url, { responseType: 'blob' });
    }

    insert(customer: CustomerDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/customers`,
            customer,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}