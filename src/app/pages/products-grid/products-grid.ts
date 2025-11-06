import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../modules/product';
import { ProductCard } from "../../components/product-card/product-card";

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard],
  template: `
    <div class="bg-gray-100 p-6 h-full">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">{{ category() }}</h1>
      <div class="responsive-grid">
      @for (product of filteredProducts(); track product.id) {
        <app-product-card [product]="product" />
      }
      </div>
    </div>
  `,
  styles: ``,
})
export default class ProductsGrid {

  category = input<string>("all");

  products = signal<Product[]>([
    {
      id: "1",
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop',
      rating: 4.5,
      reviewsCount: 120,
      inStock: true,
      category: 'electronics',
    },
    {
      id: "2",
      name: 'Running Shoes',
      price: 124.99,
      category: 'sports',
      description: 'Comfortable running shoes for daily workouts',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=300&fit=crop',
      inStock: true,
      rating: 4.2,
      reviewsCount: 85
    },
    {
      id: "3",
      name: 'Coffee Maker',
      price: 199.99,
      category: 'kitchen',
      description: 'Programmable coffee maker with built-in grinder',
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=300&fit=crop',
      inStock: false,
      rating: 4.7,
      reviewsCount: 60
    },
    {
      id: "4",
      name: 'Smartphone Case',
      price: 29.99,
      category: 'accessories',
      description: 'Protective case with wireless charging support',
      imageUrl: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500&h=300&fit=crop',
      inStock: true,
      rating: 3.9,
      reviewsCount: 45
    },
    {
      id: "5",
      name: 'Gaming Laptop',
      price: 1299.99,
      category: 'electronics',
      description: 'High-performance gaming laptop with RTX graphics',
      imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=300&fit=crop',
      inStock: true,
      rating: 4.6,
      reviewsCount: 95
    },
    {
      id: "6",
      name: 'Wireless Mouse',
      price: 49.99,
      category: 'electronics',
      description: 'Ergonomic wireless mouse with programmable buttons',
      imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=300&fit=crop',
      inStock: true,
      rating: 4.3,
      reviewsCount: 78
    },
    {
      id: "7",
      name: 'Smart Watch',
      price: 249.99,
      category: 'electronics',
      description: 'Fitness tracking smartwatch with heart rate monitor',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop',
      inStock: true,
      rating: 4.4,
      reviewsCount: 132
    },
    {
      id: "8",
      name: 'Bluetooth Speaker',
      price: 79.99,
      category: 'electronics',
      description: 'Portable waterproof speaker with 360-degree sound',
      imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=300&fit=crop',
      inStock: true,
      rating: 4.1,
      reviewsCount: 67
    },
  ]);

  filteredProducts = computed(() => this.products().filter(p => p.category === this.category().toLowerCase()));
}
