import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import {provideHotToastConfig} from '@ngxpert/hot-toast';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()), 
    provideHotToastConfig({style:{marginTop:'70px'}, stacking:'depth', duration:1000}),
    {
      provide: 'MAT_DIALOG_DEFAULT_OPTIONS',
      useValue: {
        appearance : 'outline',
        subscriptSizing: 'dynamic',
        floatLabel: 'never',
      },
    }
  ],
};
