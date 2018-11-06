import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import {MatToolbarModule} from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [MatMenuModule, MatIconModule, MatInputModule, MatToolbarModule, MatButtonModule],
  exports: [MatMenuModule, MatIconModule, MatInputModule, MatToolbarModule, MatButtonModule],
})
export class MyOwnCustomMaterialModule { }