import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [MatMenuModule, MatIconModule, MatButtonModule, MatCheckboxModule],
  exports: [MatMenuModule, MatIconModule, MatButtonModule, MatCheckboxModule],
})
export class MyOwnCustomMaterialModule { }