import { Component, input, signal } from '@angular/core';
import { Product } from '../../modules/product';

@Component({
  selector: 'app-products-grid',
  imports: [],
  template: `
    <p>
      products-grid works!
    </p>
  `,
  styles: ``,
})
export default class ProductsGrid {

  category = input<string>("all");
  
  products = signal<Product[]>([
    {
      id: "1",
      name: 'Wireless Bluetooth Headphones',
      price: 89.99,
      category: 'Electronics',
      description: 'High-quality wireless headphones with noise cancellation',
      imageUrl: 'https://example.com/headphones.jpg',
      inStock: true,
      rating: 4.5,
      reviewsCount: 120
    },
    {
      id: "2",
      name: 'Running Shoes',
      price: 124.99,
      category: 'Sports',
      description: 'Comfortable running shoes for daily workouts',
      imageUrl: 'https://example.com/shoes.jpg',
      inStock: true,
      rating: 4.2,
      reviewsCount: 85
    },
    {
      id: "3",
      name: 'Coffee Maker',
      price: 199.99,
      category: 'Kitchen',
      description: 'Programmable coffee maker with built-in grinder',
      imageUrl: 'https://example.com/coffee-maker.jpg',
      inStock: false,
      rating: 4.7,
      reviewsCount: 60
    },
    {
      id: "4",
      name: 'Smartphone Case',
      price: 29.99,
      category: 'Accessories',
      description: 'Protective case with wireless charging support',
      imageUrl: 'https://example.com/phone-case.jpg',
      inStock: true,
      rating: 3.9,
      reviewsCount: 45
    },
    {
      id: "5",
      name: 'Smartphone Case',
      price: 29.99,
      category: 'Accessories',
      description: 'Protective case with wireless charging support',
      imageUrl: 'https://example.com/phone-case.jpg',
      inStock: true,
      rating: 4.9,
      reviewsCount: 45
    }
  ]);
}
