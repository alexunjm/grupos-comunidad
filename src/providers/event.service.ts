import { EventEmitter } from '@angular/core';

export class EventService {

  static instance = new EventService();
  scroll = new EventEmitter<string>();
  rendered = new EventEmitter<string>();

  static getInstance() {
    return EventService.instance;
  }
}
