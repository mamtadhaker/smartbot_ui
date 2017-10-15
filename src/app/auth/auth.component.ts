import { Component, OnInit } from '@angular/core';
import { Http, Request } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isCam: Boolean = false;
  webcam: any;

  options: object = {
    audio: false,
    video: true,
    width: 480,
    height: 320,
    fallbackMode: 'callback',
    fallbackSrc: 'jscam_canvas_only.swf',
    fallbackQuality: 85,
    cameraType: 'front' || 'back'
  };

  constructor(public http: Http, public router: Router) { }

  ngOnInit() { }

  stream(): void {
    this.setIsCam();
  }

  onCamSuccess(event): void {
    console.log('here --------------');
    // TODO:
  }

  onCamError(event): void {
    // TODO:
  }

  private setIsCam(): void {
    this.isCam = true;
    this.order();
  }

  private resetIsCam(): void {
    this.isCam = false;
  }

  private capture(): any {
    this.webcam.captureAsFormData({ fileName: 'file.jpg' })
      .then(formData => this.submit(formData))
      .catch(e => console.error(e));
  }

  private submit(body: any): void {
    const config = {
      method: 'POST',
      url: '',
      body: body
    };

    const request = new Request(config);

    this.http.request(request);
  }

  private async order(): Promise<any> {
    await this.delay(6000);
    this.router.navigate(['/order']);
  }

  private delay(ms: Number = 0): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
