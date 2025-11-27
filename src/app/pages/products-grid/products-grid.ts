import { Component, computed, inject, input, signal } from '@angular/core';
import { ProductCard } from "../../components/product-card/product-card";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { MatNavList, MatListItem, MatListItemTitle } from "@angular/material/list";
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenavContent, MatSidenavContainer, MatSidenav, MatNavList, MatListItem, MatListItemTitle, RouterLink, TitleCasePipe, ToggleWishlistButton, MatIcon, MatIconButton],
  template: `

    <mat-sidenav-container class="h-full">
      <mat-sidenav #sidenav [mode]="isHandset() ? 'over' : 'side'" [opened]="!isHandset()">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Categories</h2>

          <mat-nav-list>
            @for (cat of categories(); track cat) {
              <mat-list-item [activated]="cat === category()" class="my-2" [routerLink]="['/products', cat]" (click)="isHandset() && sidenav.close()">
                <span matListItemTitle class="font-medium" [class]="cat === category() ? '!text-white' : null">
                  {{ cat | titlecase }}
                </span>
              </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg-gray-100 p-6 h-full">
      
      <div class="flex items-center gap-4 mb-6">
        @if (isHandset()) {
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
        }
        <div>
          <h1 class="text-2xl font-bold text-gray-900 mb-1">
            @if (store.searchQuery()) {
              Search Results for "{{ store.searchQuery() }}"
            } @else {
              {{ category() | titlecase }}
            }
          </h1>
          <p class="text-base text-gray-600">
            {{ store.filteredProducts().length }} products found
          </p>
        </div>
      </div>

      <div class="responsive-grid">
        @for (product of store.filteredProducts(); track product.id) {
        <app-product-card [product]="product" >
          <app-toggle-wishlist-button class="!absolute z-10 top-3 right-3 !bg-white shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg" 
          [product]="product" [style.view-transition-name]="'wishlist-button-' + product.id" />
        </app-product-card>
        }
      </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {

  category = input<string>("all");

  store = inject(EcommerceStore);
  breakpointObserver = inject(BreakpointObserver);

  isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(map(result => result.matches)),
    { initialValue: false }
  );

  categories = signal<string[]>([
    'all',
    'electronics',
    'sports',
    'kitchen',
    'accessories',
  ]);

  constructor() {
    this.store.setCategory(this.category);
  }
}