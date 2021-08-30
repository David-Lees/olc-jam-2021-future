import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Message {
  channel: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationsService {
  private message$: Subject<Message>;

  constructor() { 
    this.message$ = new Subject<Message>();
  }

  public publish(message: Message): void {    
    this.message$.next(message);
  }

  public of(): Observable<Message> {    
    return this.message$.asObservable();
  }
}
