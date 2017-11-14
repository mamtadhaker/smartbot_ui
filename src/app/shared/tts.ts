import { Injectable } from '@angular/core';
import { speechConfig } from './constants';

@Injectable()
export class TTS {
  speechSynthesis: SpeechSynthesis;
  voice: SpeechSynthesisVoice;
  utterance: SpeechSynthesisUtterance;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.voice = window.speechSynthesis.getVoices()
      .find(v => v.lang === speechConfig.lang);
  }

  speak(text: string): void {
    this.utterance = new SpeechSynthesisUtterance(text);
    this.config();
    this.speechSynthesis.speak(this.utterance);
  }

  private config(): void {
    this.utterance.voice = this.voice;
    this.utterance.pitch = speechConfig.pitch;
    this.utterance.rate = speechConfig.rate;
  }
}
