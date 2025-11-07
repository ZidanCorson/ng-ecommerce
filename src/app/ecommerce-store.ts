import { computed, inject, signal } from '@angular/core';
import { Product } from './models/product';
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';

export type EcommerceState = {
    products: Product[];
    category: string;
    wishlistItems: Product[];
};

export const EcommerceStore = signalStore(
    {
        providedIn: 'root',
    },
    withState({
        products: [
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
        ],
        category: 'all',
        wishlistItems: [],
    }as EcommerceState),
    withComputed(({category, products, wishlistItems }) => ({
        filteredProducts: computed(() => {
            if (category() === 'all') {
                return products();
            }
            return products().filter((p) => p.category === category().toLowerCase());
        }),
        wishlistCount:computed(() => wishlistItems().length)

    })),
    withMethods((store, toaster = inject(Toaster))=>({
        setCategory:signalMethod<string>( (category:string) =>{
            patchState(store, {category});
        }),
        addToWishlist: (product: Product) => {
            const updatedWishlistItems = produce(store.wishlistItems(), (draft: Product[]) => {
                if (!draft.find(p => p.id === product.id)) {
                    draft.push(product);
                }
            });

            patchState(store, { wishlistItems: updatedWishlistItems });
            toaster.success(`${product.name} added to wishlist!`);
        },

        removeFromWishlist: (product:Product) => {
            patchState(store, {
                wishlistItems: store.wishlistItems().filter(p => p.id !== product.id)
            });
            toaster.success(`${product.name} removed from wishlist!`);
        },

        clearWishlist: () => {
            patchState(store, { wishlistItems: [] });
        },
    }))
);
