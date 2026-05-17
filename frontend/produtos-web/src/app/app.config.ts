import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FormsModule)
  ]
};