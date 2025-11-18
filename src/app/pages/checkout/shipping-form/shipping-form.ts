import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ViewPanel } from "../../../directives/view-panel";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-shipping-form',
  imports: [ViewPanel, MatIcon, MatFormField, MatLabel, MatError, MatInput, ReactiveFormsModule],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <mat-icon>local_shipping</mat-icon>  
        Shipping Information
      </h2>
      <form [formGroup]="shippingForm" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <mat-form-field>
          <mat-label>First Name</mat-label>
          <input matInput type="text" formControlName="firstName" required>
          <mat-error *ngIf="shippingForm.get('firstName')?.invalid && shippingForm.get('firstName')?.touched">
            First Name is required
          </mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Last Name</mat-label>
          <input matInput type="text" formControlName="lastName" required>
          <mat-error *ngIf="shippingForm.get('lastName')?.invalid && shippingForm.get('lastName')?.touched">
            Last Name is required
          </mat-error>
        </mat-form-field>
        <mat-form-field class="col-span-2">
          <mat-label>Address</mat-label>
          <input matInput type="text" formControlName="address" required>
          <mat-error *ngIf="shippingForm.get('address')?.invalid && shippingForm.get('address')?.touched">
            Address is required
          </mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>City</mat-label>
          <input matInput type="text" formControlName="city" required>
          <mat-error *ngIf="shippingForm.get('city')?.invalid && shippingForm.get('city')?.touched">
            City is required
          </mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>State/Province</mat-label>
          <input matInput type="text" formControlName="state" required>
          <mat-error *ngIf="shippingForm.get('state')?.invalid && shippingForm.get('state')?.touched">
            State/Province is required
          </mat-error>
        </mat-form-field>
        <mat-form-field class="col-span-2">
          <mat-label>Postal Code</mat-label>
          <input matInput type="text" formControlName="postalCode" required>
          <mat-error *ngIf="shippingForm.get('postalCode')?.invalid && shippingForm.get('postalCode')?.touched">
            Postal Code is required
          </mat-error>
        </mat-form-field>
      </form>
    </div>
  `,
  styles: ``,
})
export class ShippingForm {
  @Output() formValidityChange = new EventEmitter<boolean>();
  
  shippingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.shippingForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required]]
    });

    // Emit form validity changes
    this.shippingForm.statusChanges.subscribe(() => {
      this.formValidityChange.emit(this.shippingForm.valid);
    });
  }

  // Method to mark all fields as touched (to show validation errors)
  markAllFieldsAsTouched() {
    this.shippingForm.markAllAsTouched();
  }

  // Method to check if form is valid
  get isFormValid(): boolean {
    return this.shippingForm.valid;
  }

  // Method to get form data
  getFormData() {
    if (this.shippingForm.valid) {
      return this.shippingForm.value;
    }
    return null;
  }
}
