import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import {MatToolbarModule} from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
@NgModule({
  imports: [MatMenuModule, MatIconModule, MatInputModule, MatToolbarModule,
    MatButtonModule, MatTooltipModule, MatTabsModule, MatListModule],
  exports: [MatMenuModule, MatIconModule, MatInputModule, MatToolbarModule,
    MatButtonModule, MatTooltipModule, MatTabsModule, MatListModule],
})
export class MyOwnCustomMaterialModule { }