import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders } from '@angular/core';

// components
import { AuthFormComponent } from './auth-form/auth-form.component';

// material theme module
import { MyOwnCustomMaterialModule } from '../theme/mat-theme.module';

// services
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { MealService } from './meals/meal.service';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    MyOwnCustomMaterialModule
  ],
  exports: [
    AuthFormComponent,
    MyOwnCustomMaterialModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AuthGuardService,
        MealService
      ]
    };
  }

}
