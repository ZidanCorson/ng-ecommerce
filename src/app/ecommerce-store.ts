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
import { AddReviewParams, UserReview } from './models/user-review';

export type EcommerceState = {
    products: Product[];
    category: string;
    wishlistItems: Product[];
    cartItems:CartItem[];
    user: User | undefined;
    loading: boolean;
    selectedProductId: string | undefined;
    writeReview: boolean;
    searchQuery: string;
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
                description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
                price: 89.99,
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop',
                rating: 4.5,
                reviewsCount: 2,
                inStock: true,
                category: 'electronics',
                reviews: [
                    {
                        id: 'r1',
                        productId: '1',
                        userName: 'Alice Smith',
                        userImageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
                        rating: 5,
                        title: 'Amazing sound quality',
                        comment: 'These headphones are fantastic! The noise cancellation works perfectly for my commute.',
                        reviewDate: new Date('2023-10-15')
                    },
                    {
                        id: 'r2',
                        productId: '1',
                        userName: 'Bob Jones',
                        userImageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
                        rating: 4,
                        title: 'Good value',
                        comment: 'Great sound for the price, but the ear cups could be a bit softer.',
                        reviewDate: new Date('2023-11-02')
                    }
                ],
            },
            {
                id: "2",
                name: 'Running Shoes',
                price: 124.99,
                category: 'sports',
                description: 'Lightweight and comfortable running shoes designed for daily workouts and marathons.',
                imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=300&fit=crop',
                inStock: true,
                rating: 4.2,
                reviewsCount: 2,
                reviews: [
                    {
                        id: 'r3',
                        productId: '2',
                        userName: 'Charlie Brown',
                        userImageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
                        rating: 5,
                        title: 'Super comfortable',
                        comment: 'I ran a marathon in these and had zero blisters. Highly recommend!',
                        reviewDate: new Date('2023-09-20')
                    },
                    {
                        id: 'r4',
                        productId: '2',
                        userName: 'Diana Prince',
                        userImageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
                        rating: 3,
                        title: 'Runs small',
                        comment: 'Good quality but order a half size up.',
                        reviewDate: new Date('2023-10-05')
                    }
                ]
            },
            {
                id: "3",
                name: 'Coffee Maker',
                price: 199.99,
                category: 'kitchen',
                description: 'Programmable coffee maker with built-in grinder for the freshest brew every morning.',
                imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=300&fit=crop',
                inStock: false,
                rating: 4.7,
                reviewsCount: 1,
                reviews: [
                    {
                        id: 'r5',
                        productId: '3',
                        userName: 'Evan Wright',
                        userImageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
                        rating: 5,
                        title: 'Barista quality',
                        comment: 'Saves me so much money on coffee shops. The grinder is a game changer.',
                        reviewDate: new Date('2023-11-10')
                    }
                ]
            },
            {
                id: "4",
                name: 'Smartphone Case',
                price: 29.99,
                category: 'accessories',
                description: 'Durable protective case with shock absorption and wireless charging support.',
                imageUrl: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500&h=300&fit=crop',
                inStock: true,
                rating: 3.9,
                reviewsCount: 1,
                reviews: [
                    {
                        id: 'r6',
                        productId: '4',
                        userName: 'Fiona Gallagher',
                        userImageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
                        rating: 4,
                        title: 'Solid protection',
                        comment: 'Dropped my phone twice and no scratches. A bit bulky though.',
                        reviewDate: new Date('2023-08-15')
                    }
                ]
            },
            {
                id: "5",
                name: 'Gaming Laptop',
                price: 1299.99,
                category: 'electronics',
                description: 'High-performance gaming laptop with RTX graphics, 32GB RAM, and 1TB SSD.',
                imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=300&fit=crop',
                inStock: true,
                rating: 4.6,
                reviewsCount: 2,
                reviews: [
                    {
                        id: 'r7',
                        productId: '5',
                        userName: 'George Martin',
                        userImageUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
                        rating: 5,
                        title: 'Beast of a machine',
                        comment: 'Runs Cyberpunk 2077 on ultra settings smoothly.',
                        reviewDate: new Date('2023-12-01')
                    },
                    {
                        id: 'r8',
                        productId: '5',
                        userName: 'Hannah Lee',
                        userImageUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
                        rating: 4,
                        title: 'Gets hot',
                        comment: 'Performance is top notch but the fans get loud under load.',
                        reviewDate: new Date('2023-11-25')
                    }
                ]
            },
            {
                id: "6",
                name: 'Wireless Mouse',
                price: 49.99,
                category: 'electronics',
                description: 'Ergonomic wireless mouse with programmable buttons and long battery life.',
                imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=300&fit=crop',
                inStock: true,
                rating: 4.3,
                reviewsCount: 1,
                reviews: [
                    {
                        id: 'r9',
                        productId: '6',
                        userName: 'Ian Somerhalder',
                        userImageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
                        rating: 4,
                        title: 'Comfortable',
                        comment: 'Fits my hand perfectly. The software is a bit clunky though.',
                        reviewDate: new Date('2023-10-30')
                    }
                ]
            },
            {
                id: "7",
                name: 'Smart Watch',
                price: 249.99,
                category: 'electronics',
                description: 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and sleep tracking.',
                imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop',
                inStock: true,
                rating: 4.4,
                reviewsCount: 2,
                reviews: [
                    {
                        id: 'r10',
                        productId: '7',
                        userName: 'Julia Roberts',
                        userImageUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
                        rating: 5,
                        title: 'Love it',
                        comment: 'Motivates me to move every day. The sleep tracking is very accurate.',
                        reviewDate: new Date('2023-09-12')
                    },
                    {
                        id: 'r11',
                        productId: '7',
                        userName: 'Kevin Hart',
                        userImageUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
                        rating: 4,
                        title: 'Battery life',
                        comment: 'Great features but needs charging every night.',
                        reviewDate: new Date('2023-10-01')
                    }
                ]
            },
            {
                id: "8",
                name: 'Bluetooth Speaker',
                price: 79.99,
                category: 'electronics',
                description: 'Portable waterproof speaker with 360-degree sound and rugged design.',
                imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=300&fit=crop',
                inStock: true,
                rating: 4.1,
                reviewsCount: 1,
                reviews: [
                    {
                        id: 'r12',
                        productId: '8',
                        userName: 'Liam Neeson',
                        userImageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
                        rating: 4,
                        title: 'Good for beach',
                        comment: 'Took it to the beach and it survived the sand and water. Sound is decent.',
                        reviewDate: new Date('2023-07-20')
                    }
                ]
            },
        ],
        category: 'all',
        wishlistItems: [],
        cartItems:[],
        user: undefined,
        loading: false,
        selectedProductId: undefined,
        writeReview: false,
        searchQuery: '',
    }as EcommerceState),
    withStorageSync({key:'modern-store', select:({wishlistItems, cartItems, user })=> ({wishlistItems, cartItems, user})}),

    withComputed(({category, products, wishlistItems, cartItems, selectedProductId, searchQuery }) => ({
        filteredProducts: computed(() => {
            if (searchQuery()) {
                const query = searchQuery().toLowerCase();
                return products().filter(p => p.name.toLowerCase().includes(query));
            }

            const productsList = category() === 'all' 
                ? products() 
                : products().filter((p) => p.category === category().toLowerCase());
            
            return productsList;
        }),
        wishlistCount:computed(() => wishlistItems().length),
        cartCount:computed(() => cartItems().reduce((total, item) => total + item.quantity, 0)),
        selectedProduct: computed(() => products().find(p => p.id === selectedProductId()))
    })),
    withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router= inject(Router))=>({
        setCategory:signalMethod<string>( (category:string) =>{
            patchState(store, {category, searchQuery: ''});
        }),

        setSearchQuery: signalMethod<string>((query: string) => {
            patchState(store, { searchQuery: query });
        }),

        setProductId:signalMethod<string>((productId:string) =>{
          patchState(store, {selectedProductId: productId});
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
          paymentStatus: 'success',
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

      showWriteReview:() => {
        patchState(store, { writeReview: true });
      },

      hideWriteReview:() => {
        patchState(store, { writeReview: false });
      },

      addReview: async ({title, comment, rating}: AddReviewParams) => {
        patchState(store, { loading: true });
        const product = store.products().find(p => p.id === store.selectedProductId());
        if (!product) {
          patchState(store, { loading: false });
          return;
        }

        const review:UserReview = {
          id: crypto.randomUUID(),
          title,
          comment,
          rating,
          productId: product.id,
          userName: store.user()?.name || '',
          userImageUrl: store.user()?.imageUrl || '',
          reviewDate: new Date(),
        };

        const updatedProducts = produce(store.products(), (draft) => {
          const index = draft.findIndex(p => p.id === product.id);
          draft[index].reviews.push(review);
          draft[index].rating = 
            Math.round(draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) / 
            draft[index].reviews.length * 10) / 10;
          draft[index].reviewsCount = draft[index].reviews.length;
        });
     
        await new Promise((resolve) => setTimeout(resolve, 1000));
        patchState(store, { loading : false, products: updatedProducts, writeReview: false});
       },
    })
  )
);
