import { Injectable } from '@angular/core';
import { CredentialsDTO } from 'src/models/credential.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { LocalUser } from 'src/models/localuser';
import { StorageService } from './storage.service';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage: StorageService) { }

    authenticate(credentials: CredentialsDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, credentials, {
            observe: 'response',
            responseType: 'text'
        });
    }

    successFullLogin(authorization: string) {
        let tk = authorization.substring(7);
        let user: LocalUser = {
            token: tk,
            email: jwt_decode(tk).sub
        };

        this.storage.setLocalUser(user);
    }

    logOut() {
        this.storage.setLocalUser(null);
    }
}