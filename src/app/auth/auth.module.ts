import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { AmexioWidgetModule, CommonHttpService } from 'amexio-ng-extensions';
import { WebCamComponent } from 'ack-angular-webcam';

const authRoutes: Routes = [
  { path: 'auth', component: AuthComponent }
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
    AuthComponent,
    WebCamComponent
  ],
  providers: []
})
export class AuthModule { }
