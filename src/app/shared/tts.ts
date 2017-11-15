import { Injectable } from '@angular/core';
import { ttsConfig } from './constants';

@Injectable()
export class TTS {
  private speechSynthesis: SpeechSynthesis;
  private voice: SpeechSynthesisVoice;
  private utterance: SpeechSynthesisUtterance;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.voice = window.speechSynthesis.getVoices()
      .find(v => v.lang === ttsConfig.lang);
  }

  speak(text: string): void {
    this.utterance = new SpeechSynthesisUtterance(text);
    this.config();
    this.speechSynthesis.speak(this.utterance);
  }

  private config(): void {
    this.utterance.voice = this.voice;
    this.utterance.pitch = ttsConfig.pitch;
    this.utterance.rate = ttsConfig.rate;
  }
}
