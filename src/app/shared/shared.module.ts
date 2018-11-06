import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthFormComponent } from './auth-form/auth-form.component';
import { MyOwnCustomMaterialModule } from '../theme/mat-theme.module';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyOwnCustomMaterialModule
  ],
  exports: [
    AuthFormComponent
  ]
})
export class SharedModule { }
