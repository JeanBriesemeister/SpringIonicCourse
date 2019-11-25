import { Injectable } from '@angular/core';
import { LocalUser } from 'src/models/localuser';
import { STORAGEKEYS } from 'src/config/storagekeys.config';
import { Cart } from 'src/models/cart';

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

    getCart(): Cart {
        let cart = localStorage.getItem(STORAGEKEYS.cart);
        if (cart == null) {
            return null;
        }

        return JSON.parse(cart);
    }

    setCart(cart: Cart) {
        if (cart == null) {
            localStorage.removeItem(STORAGEKEYS.cart);
        } else {
            localStorage.setItem(STORAGEKEYS.cart, JSON.stringify(cart));
        }
    }

}