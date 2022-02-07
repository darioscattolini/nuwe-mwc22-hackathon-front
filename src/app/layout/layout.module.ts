import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ClrIconModule } from '@clr/angular';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ClrIconModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class LayoutModule { }
