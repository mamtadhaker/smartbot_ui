import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Request } from '@angular/http';
import { Router } from '@angular/router';

import { AppService } from '../app.service';

declare var tracking: any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, AfterViewInit {

  isCam: Boolean = false;
  isFace: Boolean = false;
  video: any;
  canvas: any;
  context: any;
  dataUrl = '';
  tracker: any;

  constructor(public http: Http, public router: Router, public appService: AppService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.appService.authenticate(false);
  }

  stream(): void {
    if (!this.isCam) {
      this.setIsCam();
    }
  }

  capture(): void {
    this.context.drawImage(this.video, 0, 0, this.video.width, this.video.height);
    this.dataUrl = this.canvas.toDataURL('image/png', 1.0);
    document.querySelector('a').href = this.dataUrl;
    this.order();
  }

  private async setIsCam(): Promise<any> {
    this.isCam = true;
    await this.delay(1000);
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.tracker = new tracking.ObjectTracker('face');
    this.configTracker();
    this.track();
  }

  private resetIsCam(): void {
    this.isCam = false;
  }

  private async order(): Promise<any> {
    this.router.navigate(['/order']);
  }

  private delay(ms: Number = 0): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private configTracker(): void {
    this.tracker.setInitialScale(4);
    this.tracker.setStepSize(2);
    this.tracker.setEdgesDensity(0.1);
  }

  private draw(event: any): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (event.data.length) {
      this.isFace = true;
      event.data.forEach((rect) => {
        this.context.strokeStyle = '#a64ceb';
        this.context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        this.context.font = '11px Helvetica';
        this.context.fillStyle = '#fff';
      });
    } else {
      console.log('There is no face present');
    }
  }

  private track(): void {
    tracking.track('#video', this.tracker, { camera: true });

    this.tracker.on('track', (event) => this.draw(event));
  }
}
