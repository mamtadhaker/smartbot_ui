import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  isAuthenticated = false;

  constructor(public appService: AppService) {

  }

  ngOnInit() {
    this.appService.notify.subscribe((auth: boolean) => {
      this.isAuthenticated = auth;
    });
  }
}
