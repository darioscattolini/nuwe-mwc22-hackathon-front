import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ClrIconModule } from '@clr/angular';
import { UserModule } from '../user/user.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ClrIconModule,
    UserModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class LayoutModule { }
