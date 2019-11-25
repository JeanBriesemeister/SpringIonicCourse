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

    removeProduct(product: ProductDTO): Cart {
        let cart = this.getCart();
        let position = cart.products.findIndex(p => p.product.id == product.id);
        if (position != -1) {
            cart.products.splice(position, 1);
        }
        this.storage.setCart(cart);

        return cart;
    }

    increaseProductQuantity(product: ProductDTO): Cart {
        let cart = this.getCart();
        let position = cart.products.findIndex(p => p.product.id == product.id);
        if (position != -1) {
            cart.products[position].quantity++;
        }
        this.storage.setCart(cart);

        return cart;
    }

    decreaseProductQuantity(product: ProductDTO): Cart {
        let cart = this.getCart();
        let position = cart.products.findIndex(p => p.product.id == product.id);
        if (position != -1) {
            cart.products[position].quantity--;

            if (cart.products[position].quantity < 1) {
                cart = this.removeProduct(product);
            }
        }
        this.storage.setCart(cart);

        return cart;
    }

    getTotal() {
        let cart = this.getCart();
        let sum = 0;
        for (var i = 0; i < cart.products.length; i++) {
            sum += cart.products[i].product.price * cart.products[i].quantity;
        }

        return sum;
    }
}