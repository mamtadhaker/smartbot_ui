import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrderComponent } from './order.component';
import { AmexioWidgetModule, CommonHttpService } from 'amexio-ng-extensions';

const authRoutes: Routes = [
  { path: 'order', component: OrderComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmexioWidgetModule,
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    OrderComponent
  ],
  providers: []
})
export class OrderModule { }
