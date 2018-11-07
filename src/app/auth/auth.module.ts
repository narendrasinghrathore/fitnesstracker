import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';

// custom module imports
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SharedModule } from '../shared/shared.module';
// components imports



//
export const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyBP026Jl-i_Enu_wy5Ecn_mBRP3BW-oYAk',
  authDomain: 'fitnesstracker-app.firebaseapp.com',
  databaseURL: 'https://fitnesstracker-app.firebaseio.com',
  projectId: 'fitnesstracker-app',
  storageBucket: 'fitnesstracker-app.appspot.com',
  messagingSenderId: '143865442314'
};

// routes
const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'register', loadChildren: './register/register.module#RegisterModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule { }
