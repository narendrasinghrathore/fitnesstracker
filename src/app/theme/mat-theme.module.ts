import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import {MatToolbarModule} from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  imports: [MatMenuModule, MatIconModule, MatInputModule, MatToolbarModule, MatButtonModule, MatTooltipModule],
  exports: [MatMenuModule, MatIconModule, MatInputModule, MatToolbarModule, MatButtonModule, MatTooltipModule],
})
export class MyOwnCustomMaterialModule { }