import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
      provideAnimationsAsync(),
      provideRouter(routes),
      provideHttpClient(withInterceptors([authInterceptor]))
    ]
  }
  )
  .catch((err) => console.error(err));
