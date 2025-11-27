import { Component, input } from '@angular/core';
import { Product } from '../../../models/product';
import { ViewPanel } from "../../../directives/view-panel";
import { RatingSummery } from "../rating-summery/rating-summery";

@Component({
  selector: 'app-view-reviews',
  imports: [ViewPanel, RatingSummery],
  template: `
    <div appViewPanel>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Customer Reviews</h2>
      </div>
      <app-rating-summery [product]="product()" />


    </div>
  `,
  styles: ``,
})
export class ViewReviews {
    product = input.required<Product>();
}
