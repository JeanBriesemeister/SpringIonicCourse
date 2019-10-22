import { Injectable } from '@angular/core';
import { CredentialsDTO } from 'src/models/credential.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient) {

    }

    authenticate(credentials: CredentialsDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, credentials, {
            observe: 'response',
            responseType: 'text'
        });
    }
}