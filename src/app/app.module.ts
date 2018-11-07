import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// modules import
import { AuthModule } from './auth/auth.module';
import { MyOwnCustomMaterialModule } from './theme/mat-theme.module';
import { Store } from 'store';
import { SharedModule } from './shared/shared.module';
import { AppNavComponent } from './app-nav/app-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    MyOwnCustomMaterialModule,
    SharedModule.forRoot()
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }