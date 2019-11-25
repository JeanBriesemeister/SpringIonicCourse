import { StorageService } from '../storage.service';
import { Injectable } from '@angular/core';
import { Cart } from 'src/models/cart';
import { ProductDTO } from 'src/models/product.dto';

@Injectable()
export class CartService {

    constructor(public storage: StorageService) { }

    createOrClearCart(): Cart {
        let cart: Cart = { products: [] };
        this.storage.setCart(cart);

        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }

        return cart;
    }

    addProduct(product: ProductDTO): Cart {
        let cart = this.getCart();
        let position = cart.products.findIndex(p => p.product.id == product.id);
        if (position == -1) {
            cart.products.push({ quantity: 1, product: product });
        }
        this.storage.setCart(cart);

        return cart;
    }
}