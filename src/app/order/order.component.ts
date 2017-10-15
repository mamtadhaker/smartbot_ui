import { Component, OnInit } from '@angular/core';
// import { ApiAiClient } from 'api-ai-javascript';

const micResetTime: Number = 6000;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  isMicActive: Boolean = false;

  ngOnInit() { }

  constructor() {
    // new ApiAiClient({ accessToken: 'c117a80dccea4377a049d7a6ebf8365b' })
    //   .textRequest('Hello')
    //   .then((response) => { console.log(response); })
    //   .catch((error) => { console.log(error); });
  }

  startMic(event: Event): void {
    this.isMicActive = true;
    this.resetMic();
  }

  private async resetMic(): Promise<any> {
    await this.delay(micResetTime);
    this.isMicActive = false;
  }

  private delay(ms: Number = 0): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
