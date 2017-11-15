import { Component, OnInit, AfterViewInit, Input, ViewChildren, QueryList } from '@angular/core';
import { ApiAiClient, ApiAiConstants, IRequestOptions, IServerResponse } from 'api-ai-javascript';
import * as $ from 'jquery';
import { TTS } from '../shared/tts';
import { STT, SpeechRecognitionEvent } from '../shared/stt';
import { Response } from '@angular/http/src/static_response';

let recognition: Boolean = false;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [TTS, STT]
})
export class OrderComponent implements OnInit, AfterViewInit {

  private client: ApiAiClient;
  @ViewChildren('resultWraper') results: QueryList<any>;
  conversation: object[];
  @Input() query: string;

  constructor(public synth: TTS, public recog: STT) {
    this.conversation = [];
    this.query = '';
    this.client = new ApiAiClient({ accessToken: '80b5717cf56448bdadbdf1e24d49e421' });
  }

  ngOnInit() {
    this.synth.speak('Welcome to Smartbot!');

    this.recog.addEventListener('start', function () {
      recognition = true;
      const mic = $('#chatbot-mic');
      mic.addClass('active');
    });

    this.recog.addEventListener('result', function (event: SpeechRecognitionEvent) {
      const ri = event.resultIndex;
      const input = $('#chatbot-input');
      input.val(event.results[ri][0].transcript);
      if (event.results[ri].isFinal) {
        input.click();
      }
    });

    this.recog.addEventListener('end', function () {
      recognition = false;
      const mic = $('#chatbot-mic');
      mic.removeClass('active');
    });
  }

  ngAfterViewInit(): void {
    this.results.changes.subscribe(t => {
      this.scrollResultWrapperToBottom();
    });
  }

  microphone(): void {
    if (!recognition) {
      this.recog.start();
    }
  }

  chatbot(text: string): void {
    if (text) {
      this.query = text;
      this.handleRequest();
      this.client.textRequest(this.query)
        .then((response) => this.handleResponse(response))
        .catch((error) => this.handleError(error));
    }
  }

  private handleRequest(): void {
    const message = { type: 'request', text: this.query };
    this.conversation.push(message);
  }

  private handleResponse(response: IServerResponse): void {
    const message = { type: 'response', text: response.result.fulfillment.speech };
    this.conversation.push(message);
    this.query = '';
  }

  private handleError(error: IServerResponse): void {
    console.log(`Error: ${error}`);
  }

  private delay(ms: Number = 0): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private scrollResultWrapperToBottom(): void {
    const resultWrapper = document.getElementById('result-wrapper');
    resultWrapper.scrollTop = resultWrapper.scrollHeight;
  }
}
