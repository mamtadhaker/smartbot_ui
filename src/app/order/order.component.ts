import { Component, OnInit } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript';
import { TTS } from '../shared/tts';

const micResetTime: Number = 6000;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [TTS]
})
export class OrderComponent implements OnInit {

  isMicActive: Boolean = false;

  constructor(public synth: TTS) {
    new ApiAiClient({ accessToken: 'b81e48c28d6c49729b3458373533a908' })
      .textRequest('Hello')
      .then((response) => { console.log(response); })
      .catch((error) => { console.log(error); });
  }

  ngOnInit() {
    this.synth.speak('Welcome to Smartbot!');
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
