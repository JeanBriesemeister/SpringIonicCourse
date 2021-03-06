import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { CityDTO } from 'src/models/city.dto';
import { Observable } from 'rxjs';

@Injectable()
export class CityService {

    constructor(public http: HttpClient) { }

    findAll(provinceId: string): Observable<CityDTO[]> {
        return this.http.get<CityDTO[]>(`${API_CONFIG.baseUrl}/provinces/${provinceId}/cities`);
    }
}