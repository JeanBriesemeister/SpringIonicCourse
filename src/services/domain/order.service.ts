import { Injectable } from '@angular/core';
import { OrderDTO } from 'src/models/order.dto';
import { API_CONFIG } from 'src/config/api.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {

    constructor(public http: HttpClient) {
    }

    insert(obj: OrderDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/orders`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}