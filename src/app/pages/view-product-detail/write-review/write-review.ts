import { Component, inject, signal } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { OptionItem } from '../../../models/option-item';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { EcommerceStore } from '../../../ecommerce-store';

@Component({
  selector: 'app-write-review',
  imports: [MatFormField, MatInput, MatLabel,
     MatSelect, MatOption, MatButton, ReactiveFormsModule, ViewPanel],
  template: `
    <div appViewPanel>
      <h2 class="text-xl font-semibold mb-6">Write a Review</h2>
      <form [formGroup]="reviewForm" (ngSubmit)="saveReview()">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <mat-form-field appearance="outline">
            <mat-label>Title</mat-label>
            <input
              formControlName="title"
              placeholder="Summarize your review"
              matInput
              type="text" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Rating</mat-label>
            <mat-select formControlName="rating" placeholder="Select a rating">
              @for (option of ratingOptions(); track option.value) {
                <mat-option [value]="option.value">{{option.label}}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field class="col-span-2" appearance="outline">
            <mat-label>Review</mat-label>
            <textarea
              placeholder="Tell others about your experience with this product"
              formControlName="Comment"
              matInput
              type="text"
              rows="4"></textarea>
          </mat-form-field>
        </div>
        <div class="flex gap-4">
          <button matButton="filled" type="submit" [disabled]="store.loading()">
            {{store.loading() ? 'Submitting...' : 'Submit Review'}}
          </button>
          <button matButton="outlined" type="button" (click)="store.hideWriteReview()">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
  styles: ``,
  host: { class: 'block' },
})
export class WriteReview {
  fb = inject(NonNullableFormBuilder);

  ratingOptions = signal<OptionItem[]>([
    { value: 5, label: '5 Stars - Excellent' },
    { value: 4, label: '4 Stars - Very Good' },
    { value: 3, label: '3 Stars - Good' },
    { value: 2, label: '2 Stars - Fair' },
    { value: 1, label: '1 Star - Poor' },
  ]);

  store = inject(EcommerceStore);

  reviewForm = this.fb.group({
    title: ['', Validators.required],
    Comment: ['', Validators.required],
    rating: [5, Validators.required],
  });

  saveReview(){}

}
