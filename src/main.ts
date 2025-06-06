import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AppHttpInterceptor} from './app/interceptors/app-http.interceptor';
import { routes } from './app/app.routes';
import {provideRouter} from '@angular/router';
import {AuthenticationGuard} from './app/guards/authentication.guard';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),// add HttpClient support
    ...(appConfig.providers || []), // keep existing providers if any
    { provide : HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi : true },
    AuthenticationGuard,
  ]
}).catch((err) => console.error(err));
