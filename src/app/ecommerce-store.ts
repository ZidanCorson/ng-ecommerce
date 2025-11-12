import { computed, inject, signal } from '@angular/core';
import { Product } from './models/product';
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { CartItem } from './models/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { SignInParams, SignUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { Order } from './models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';

export type EcommerceState = {
    products: Product[];
    category: string;
    wishlistItems: Product[];
    cartItems:CartItem[];
    user: User | undefined;
    loading: boolean;
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
        cartItems:[],
        user: undefined,
        loading: false,
    }as EcommerceState),
    withStorageSync({key:'modern-store', select:({wishlistItems, cartItems, user })=> ({wishlistItems, cartItems, user})}),


    withComputed(({category, products, wishlistItems, cartItems }) => ({
        filteredProducts: computed(() => {
            if (category() === 'all') {
                return products();
            }
            return products().filter((p) => p.category === category().toLowerCase());
        }),
        wishlistCount:computed(() => wishlistItems().length),
        cartCount:computed(() => cartItems().reduce((total, item) => total + item.quantity, 0))
    })),
    withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router= inject(Router))=>({
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

        addToCart: (product: Product, quantity= 1) => {
          const existingItemIndex = store.cartItems().findIndex(i => i.product.id === product.id);

          const updatedCartItems = produce(store.cartItems(), (draft) => {
              if (existingItemIndex !== -1) {
                draft[existingItemIndex].quantity += quantity;
                return;
              }

              draft.push({ product, quantity });
            });
            patchState(store, { cartItems: updatedCartItems });
            toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to cart');
        },

        setItemQuantity: (params:{productId: string, quantity: number}) => {
          const index = store.cartItems().findIndex(i => i.product.id === params.productId);
          const updatedCartItems = produce(store.cartItems(), (draft) => {
                draft[index].quantity = params.quantity;   
        });
          patchState(store, { cartItems: updatedCartItems });
      },

      addAllWishlistToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach(p => {
            if (!draft.find(i => i.product.id === p.id)) {
              draft.push({ product: p, quantity: 1 });
            }
           })
          });
        patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
      },

      moveToWishlist: (product: Product) => {
        const updatedCartItems = store.cartItems().filter((i => i.product.id !== product.id));
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find(p => p.id === product.id)) {
              draft.push(product);
          }
        });
        patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
      },

      removeFromCart: (product: Product) => {
        patchState(store, {
            cartItems: store.cartItems().filter(i => i.product.id !== product.id)
        });
        toaster.success(`${product.name} removed from cart!`);
      },

      proceedToCheckout: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data:{
              checkout:true,
            },
          });
          return;
        }
        router.navigate(['/checkout']);
      },

      placeOrder: async () => {
        patchState(store, { loading: true });
        const user = store.user();

        if(!user){
          toaster.error('Please login before placing order.');
          patchState(store, { loading: false });
          return;
        }
        
        const order : Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(store.cartItems()
          .reduce((acc, item) => acc + item.product.price * item.quantity, 0)),
          items: store.cartItems(),
          paymentStatus: 'success ',
        };

        await new Promise((resolve)=> setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['/order-success']);
        },

      signIn: ({email, password, checkout, dialogId}: SignInParams) => {
        patchState(store, {
          user: {
            id: '1',
            name: 'John Doe',
            email: email,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },
      
      signUp: ({email, password, name, checkout, dialogId}: SignUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            name: 'John Doe',
            email: email,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },


      signOut: () => {
        patchState(store, { user: undefined } );
      },

      
    }))
);
