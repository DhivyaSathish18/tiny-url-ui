import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private pageRefresh = new BehaviorSubject<boolean>(false);
  pageRefresh$ = this.pageRefresh.asObservable();
  
  constructor() { }

  triggerPageRefresh(){
    this.pageRefresh.next(true);
  }
  
}
