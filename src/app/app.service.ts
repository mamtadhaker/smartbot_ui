import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {
  notify = new Subject<Boolean>();

  authenticate(isAuthenticated: boolean) {
    this.notify.next(isAuthenticated);
  }
}
