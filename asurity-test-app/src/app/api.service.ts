import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  statesArr = [
    {
      id: 0,
      abbrev: "ID",
      name: "Idaho"
    }
  ]

  conFreqArr = [
    {
      id: 0,
      name: "Contact only about account information"
    },
    {
      id: 1,
      name: "OK to contact with marketing information"
    },
    {
      id: 2,
      name: "OK to contact with third-party marketing information"
    }
  ]

  constructor() { }

  public getStatesList() {
    return this.statesArr;
  }

  public getContactFrequencies() {
    return this.conFreqArr;
  }
}
