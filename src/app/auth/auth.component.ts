import { Component, OnInit } from '@angular/core';
import { Http, Request } from '@angular/http';
import { Router } from '@angular/router';
import { delay } from 'q';

declare var tracking: any;
let video: any;
let canvas: any;
let context: any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isCam: Boolean = false;
  isFace: Boolean = false;
  dataUrl = '';
  tracker: any;

  constructor(public http: Http, public router: Router) { }

  ngOnInit() { }

  stream(): void {
    if (!this.isCam) {
      this.setIsCam();
    }
  }

  capture(): void {
    context.drawImage(video, 0, 0, video.width, video.height);
    this.dataUrl = canvas.toDataURL('image/png', 1.0);
    document.querySelector('a').href = this.dataUrl;
    this.order();
  }

  private async setIsCam(): Promise<any> {
    this.isCam = true;
    await delay(1000);
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    this.tracker = new tracking.ObjectTracker('face');
    this.configTracker();
    this.track();
    console.log(video, canvas, context, '________________');
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

  private track(): void {
    tracking.track('#video', this.tracker, { camera: true });

    this.tracker.on('track', function (event) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (event.data.length) {
        this.isFace = true;
        event.data.forEach(function (rect) {
          context.strokeStyle = '#a64ceb';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = '#fff';
        });
      } else {
        console.log('There is no face present');
      }
    });
  }
}
