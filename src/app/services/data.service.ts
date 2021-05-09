import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public categories = new BehaviorSubject([]);
  public services = new BehaviorSubject([]);

  constructor() { }
}
