import { Component } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton],
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-4">
      <app-back-button class="mb-6" navigateTo="/products/all">Continue Shopping</app-back-button>  
    
      

    </div>
  `,
  styles: ``,
})
export default class MyWishlist {

}
