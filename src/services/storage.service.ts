import { Injectable } from '@angular/core';
import { LocalUser } from 'src/models/localuser';
import { STORAGEKEYS } from 'src/config/storagekeys.config';

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        let user = localStorage.getItem(STORAGEKEYS.localUser);
        if (user == null) {
            return null;
        }

        return JSON.parse(user);
    }

    setLocalUser(user: LocalUser) {
        if (user == null) {
            localStorage.removeItem(STORAGEKEYS.localUser);
        } else {
            localStorage.setItem(STORAGEKEYS.localUser, JSON.stringify(user));
        }
    }

}