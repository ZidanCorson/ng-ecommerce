import { Component, computed, input } from '@angular/core';
import { Product } from '../../../models/product';
import { ViewPanel } from "../../../directives/view-panel";
import { RatingSummery } from "../rating-summery/rating-summery";
import { ViewReviewItem } from "../view-review-item/view-review-item";

@Component({
  selector: 'app-view-reviews',
  imports: [ViewPanel, RatingSummery, ViewReviewItem],
  template: `
    <div appViewPanel>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Customer Reviews</h2>
      </div>
      <app-rating-summery [product]="product()" />
      <div class="flex flex-col gap-6">
        @for (review of sortedReviews(); track review.id) {
          <app-view-review-item [review]="review" />
        }
      </div>


    </div>
  `,
  styles: ``,
})
export class ViewReviews {
    product = input.required<Product>();

    sortedReviews = computed(() => {
      return [...this.product().reviews].sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime());
    });
}
