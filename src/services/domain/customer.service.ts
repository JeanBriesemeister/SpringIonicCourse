import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDTO } from 'src/models/customer.dto';
import { API_CONFIG } from 'src/config/api.config';
import { StorageService } from '../storage.service';

@Injectable()
export class CustomerService {

    constructor(public http: HttpClient, public storage: StorageService) { }

    findByEmail(email: string): Observable<CustomerDTO> {
        return this.http.get<CustomerDTO>(`${API_CONFIG.baseUrl}/customers/email?value=${email}`);
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