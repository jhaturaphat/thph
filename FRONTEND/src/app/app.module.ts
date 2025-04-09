
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/modules/shared.module';
import { LoginComponent } from './componentes/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenInterceptor } from './services/authen.interceptor';
import { HisModule } from './shared/modules/his.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HisModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenInterceptor, multi: true},
    // { provide: APP_BASE_HREF, useValue: '/' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
