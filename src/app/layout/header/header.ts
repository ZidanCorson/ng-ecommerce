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
    <mat-toolbar class="w-full elevated py-2"> 
      <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between">
        <span class="cursor-pointer" (click)="store.setCategory('all')">Modern Store</span>
        
        <div class="flex-1 mx-8 max-w-[500px]">
            <mat-form-field class="w-full text-sm" appearance="outline" subscriptSizing="dynamic">
                <mat-icon matPrefix class="text-gray-500">search</mat-icon>
                <input matInput placeholder="Search products..." 
                       (keyup)="onSearch($event)">
            </mat-form-field>
        </div>

        <app-header-actions />
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
