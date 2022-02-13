import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ClrDropdownModule, ClrIconModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ClrDropdownModule,
    ClrIconModule,
    RouterModule,
    UserModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class LayoutModule { }
