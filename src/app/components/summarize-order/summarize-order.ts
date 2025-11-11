import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from "../../directives/view-panel";
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
      <div class="space-y-3 text-lg pt-4 border-t">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span>\${{ subtotal().toFixed(2) }}</span>
        </div>
        <div class="flex justify-between">
          <span>Tax</span>
          <span>\${{ tax().toFixed(2) }}</span>
        </div>
        <div class="flex justify-between border-t pt-3 font-bold text-lg">
          <span>Total</span>
          <span>\${{ total().toFixed(2) }}</span>
        </div>
      </div>

      <ng-content select="[actionButtons]" />

    </div>
  `,
  styles: ``,
})
export class SummarizeOrder {

  store = inject(EcommerceStore);

  subtotal = computed(() =>
    Math.round(
      this.store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0) * 100
    ) / 100
  );
  tax = computed(() => Math.round(this.subtotal() * 0.05 * 100) / 100);
  total = computed(() => Math.round((this.subtotal() + this.tax()) * 100) / 100);
}
