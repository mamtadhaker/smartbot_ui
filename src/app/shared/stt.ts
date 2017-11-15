import { Injectable } from '@angular/core';
import { sttConfig } from './constants';

interface SpeechRecognitionEventMap {
  'audiostart': Event;
  'soundstart': Event;
  'speechstart': Event;
  'speechend': Event;
  'soundend': Event;
  'result': Event;
  'nomatch': Event;
  'error': Event;
  'start': Event;
  'end': Event;
}

interface SpeechRecognition extends EventTarget {
  grammars: SpeechGrammarList;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  serviceURI: string;

  onaudiostart: (ev: Event) => any;
  onsoundstart: (ev: Event) => any;
  onspeechstart: (ev: Event) => any;
  onspeechend: (ev: Event) => any;
  onsoundend: (ev: Event) => any;
  onresult: (ev: SpeechRecognitionEvent) => any;
  onnomatch: (ev: SpeechRecognitionEvent) => any;
  onerror: (ev: SpeechRecognitionError) => any;
  onstart: (ev: Event) => any;
  onend: (ev: Event) => any;

  start(): void;
  stop(): void;
  abort(): void;

  addEventListener<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any, useCapture?: boolean): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
  removeEventListener<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any, useCapture?: boolean): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}
interface SpeechRecognitionStatic {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
}
declare var SpeechRecognition: SpeechRecognitionStatic;
declare var webkitSpeechRecognition: SpeechRecognitionStatic;

interface SpeechRecognitionError extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
  interpretation: any;
  emma: Document;
}

interface SpeechGrammar {
  src: string;
  weight: number;
}
interface SpeechGrammarStatic {
  prototype: SpeechGrammar;
  new(): SpeechGrammar;
}
declare var SpeechGrammar: SpeechGrammarStatic;
declare var webkitSpeechGrammar: SpeechGrammarStatic;

interface SpeechGrammarList {
  length: number;
  item(index: number): SpeechGrammar;
  [index: number]: SpeechGrammar;
  addFromURI(src: string, weight: number): void;
  addFromString(string: string, weight: number): void;
}
interface SpeechGrammarListStatic {
  prototype: SpeechGrammarList;
  new(): SpeechGrammarList;
}
declare var SpeechGrammarList: SpeechGrammarListStatic;
declare var webkitSpeechGrammarList: SpeechGrammarListStatic;

@Injectable()
export class STT {
  recognition: SpeechRecognition;

  constructor() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = sttConfig.continuous;
    this.recognition.interimResults = sttConfig.interimResults;
  }

  start(): void {
    this.recognition.start();
  }

  stop(): void {
    this.recognition.stop();
  }

  abort(): void {
    this.recognition.abort();
  }

  addEventListener(type: string, ev: any): void {
    this.recognition.addEventListener(type, ev);
  }
}
