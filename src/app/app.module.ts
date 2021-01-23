import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {ToastrModule} from 'ngx-toastr';
import {NgSelectModule} from '@ng-select/ng-select';
import {AppRoutes} from './app.routing';

import {AuthGuard} from './_guards/auth.guard';

import {AppComponent} from './app.component';
import {HeaderInterceptor} from './_helpers/header.interceptor';
import {CustomerService} from './_services/customer/customer.service';
import {AlertService} from './_services/alert/alert.service';
import {AlertComponent} from './alert/alert.component';
import {LoadingService} from './_services/loading/loading.service';
import {LoadingComponent} from './loading/loading.component';
import {AppPreloader} from './app.preloader';
import {SharedDirectivesModule} from "./_directives/shared-directives.module";
import { SharedModule } from "./shared/shared.module";
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import {
  MatProgressBarModule, MatDatepickerModule, MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoadingComponent,    
    ProgressBarComponent,
  ],
  imports: [
    SharedDirectivesModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule, MatDatepickerModule, MatInputModule,
    SharedModule,
    SlimLoadingBarModule.forRoot(),
    ToastrModule.forRoot({
      autoDismiss: true,
      progressBar: true,
      progressAnimation: 'increasing',
      disableTimeOut: false
    }),
    NgSelectModule,
    AppRoutes,
  ],
  providers: [
    AuthGuard,  
    CustomerService,
    AlertService,
    LoadingService,    
    Title,
    AppPreloader,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
