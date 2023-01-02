export const BACKEND_URL = 'http://localhost:8000';

export const REQUEST_TIMEOUT = 5000;

export const SHOW_ERROR_TIMEOUT = 6000;

export enum APIRoute {
  Synthesis = '/text2voice',
  Recognition = '/voice2text'
}

export enum AppRoute {
  Main = '/',
  About = '/about/',
  NotFound = '*'
}

export enum Tabs {
  Synthesis = 'Синтез речи',
  Recognition = 'Распознавание текстов'
}

export enum VoiceType {
  Male = 'male',
  Female = 'female'
}
