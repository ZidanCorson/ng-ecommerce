import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions, MatIcon, MatInputModule, MatFormFieldModule],
  template: `
    <mat-toolbar class="w-full elevated !py-2 !h-auto min-h-[64px]"> 
      <div class="max-w-[1200px] mx-auto w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-2 md:gap-0">
        <span class="cursor-pointer font-bold md:text-lg text-base whitespace-nowrap order-1" (click)="router.navigate(['/products/all'])">Modern Store</span>
        
        <div class="w-full md:w-auto md:flex-1 mx-0 md:mx-8 max-w-full md:max-w-[500px] order-3 md:order-2">
            <mat-form-field class="w-full text-sm" appearance="outline" subscriptSizing="dynamic">
                <mat-icon matPrefix class="text-gray-500">search</mat-icon>
                <input matInput placeholder="Search..." 
                       (keyup)="onSearch($event)">
            </mat-form-field>
        </div>

        <div class="order-2 md:order-3">
            <app-header-actions />
        </div>
      </div> 
      
    </mat-toolbar>
  `,
  styles: `
    ::ng-deep .mat-mdc-form-field-subscript-wrapper {
        display: none;
    }
  `,
})
export class Header {
    store = inject(EcommerceStore);
    router = inject(Router);

    onSearch(event: any) {
        const query = event.target.value;
        this.store.setSearchQuery(query);
        
        if (query && !this.router.url.startsWith('/products')) {
            this.router.navigate(['/products/all']);
        }
    }
}

