import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/product';
import { TitleCasePipe } from '@angular/common';
import { StockStatus } from "../stock-status/stock-status";
import { QtySelector } from "../../../components/qty-selector/qty-selector";
import { ToggleWishlistButton } from "../../../components/toggle-wishlist-button/toggle-wishlist-button";
import { MatIconButton } from "../../../../../node_modules/@angular/material/button/index";
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../../ecommerce-store';

@Component({
  selector: 'app-product-info',
  imports: [TitleCasePipe, StockStatus, QtySelector, ToggleWishlistButton, MatIconButton, MatIcon],
  template: `
    <div class="text-xs rounded-xl bg-gray-100 px-2 py-1 w-fit mb-2">
      {{ product().category | titlecase }}
    </div>
    <h1 class="text-2xl font-extrabold mb-3">{{ product().name }}</h1>
    <p class="text-3xl font-extrabold mb-4">\${{ product().price }}</p>
    <app-stock-status [inStock]="product().inStock" />
    <p class="font-semibold mb-2">Description</p>
    <p class="text-gray-600 mb-2">{{ product().description }}</p>
    <div class="flex items-center gap-2 mb-3 pt-4">
      <span class="font-semibold">Quantity:</span>
      <app-qty-selector [quantity]="quantity()" (qtyUpdated)="quantity.set($event)" />
    </div>
    <div class="flex gap-4 mb border-b border-gray-200 pb-4">
      <button matButton="filled" class="w-2/3 flex items-center gap-2"
       (click)="store.addToCart(product(), quantity())"
       [disabled]="!product().inStock">
        <mat-icon>shopping_cart</mat-icon>
        {{ product().inStock ? 'Add to Cart' : 'Out of Stock' }}
      </button>
      <app-toggle-wishlist-button [product]="product()" />
      <button matIconButton>
        <mat-icon>share</mat-icon>
      </button>

    </div>
  `,
  styles: ``,
})
export class ProductInfo {
  product = input.required<Product>();
  quantity = signal(1);
  store = inject(EcommerceStore);

}
