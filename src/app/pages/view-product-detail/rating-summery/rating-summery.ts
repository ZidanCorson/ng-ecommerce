import { Component, computed, input } from '@angular/core';
import { Product } from '../../../models/product';
import { StarRating } from "../../../components/star-rating/star-rating";

@Component({
  selector: 'app-rating-summery',
  imports: [StarRating],
  template: `

    <div class="flex items-center gap-8 mb-6 p-4 bg-gray-50 rounded-lg">
      <div class="flex flex-col items-center w-1/2">
        <div class="text-4xl font-bold text-gray-900 mb-1">{{ product().rating.toFixed(1) }}</div>
        <div class="flex items-center mb-2">
          <app-star-rating [rating]="product().rating" />
        </div>
        <div class="text-sm text-gray-500">Based on {{ totalReviews() }} reviews</div>
      </div>

      <div class="flex-1">
        @for (item of ratingBreakdown(); track item.stars) {
        <div class="flex items-center gap-2 mb-2">
          <span class="w-4 text-sm">{{ item.stars }}★</span>
          <div class="flex-1 bg-gray-200 rounded-full h-2 mx-2">
            <div class="bg-yellow-400 h-2 rounded-full transition-all duration-300"
             [style.width.%]="item.percentage"></div>
          </div>
          <span class="text-sm text-gray-600 w-3 text-right">{{ item.count }}</span>
        </div>
        }
    </div>
    </div>
    
  `,
  styles: ``,
})
export class RatingSummery {
  product = input.required<Product>();

  totalReviews = computed(() => this.product().reviews.length);

  ratingBreakdown = computed(() => {
    const reviews = this.product().reviews;
    const total = reviews.length;

    if (total === 0) {
      return [5,4,3,2,1].map(stars => ({ stars, count: 0, percentage: 0 }));
    }
    
    const counts = [5,4,3,2,1].map(stars => {
       const count = reviews.filter((r) => r.rating === stars).length;
        return { stars, count, percentage: (count / total) * 100 };
    });
    

    return counts;

    });

}


