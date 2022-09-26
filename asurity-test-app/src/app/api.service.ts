import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  apiStatesArr = [
{id:0,abbrev:"AL",name:"Alabama"},{id:1,abbrev:"AK",name:"Alaska"},{id:2,abbrev:"AZ",name:"Arizona"},{id:3,abbrev:"AR",name:"Arkansas"},{id:4,abbrev:"CA",name:"California"},{id:5,abbrev:"CO",name:"Colorado"},{id:6,abbrev:"CT",name:"Connecticut"},{id:7,abbrev:"DE",name:"Delaware"},{id:8,abbrev:"DC",name:"District of Columbia"},{id:9,abbrev:"FL",name:"Florida"},{id:10,abbrev:"GA",name:"Georgia"},{id:11,abbrev:"HI",name:"Hawaii"},{id:12,abbrev:"ID",name:"Idaho"},{id:13,abbrev:"IL",name:"Illinois"},{id:14,abbrev:"IN",name:"Indiana"},{id:15,abbrev:"IA",name:"Iowa"},{id:16,abbrev:"KS",name:"Kansas"},{id:17,abbrev:"KY",name:"Kentucky"},{id:18,abbrev:"LA",name:"Louisiana"},{id:19,abbrev:"ME",name:"Maine"},{id:20,abbrev:"MD",name:"Maryland"},{id:21,abbrev:"MA",name:"Massachusetts"},{id:22,abbrev:"MI",name:"Michigan"},{id:23,abbrev:"MN",name:"Minnesota"},{id:24,abbrev:"MS",name:"Mississippi"},{id:25,abbrev:"MO",name:"Missouri"},{id:26,abbrev:"MT",name:"Montana"},{id:27,abbrev:"NE",name:"Nebraska"},{id:28,abbrev:"NV",name:"Nevada"},{id:29,abbrev:"NH",name:"New Hampshire"},{id:30,abbrev:"NJ",name:"New Jersey"},{id:31,abbrev:"NM",name:"New Mexico"},{id:32,abbrev:"NY",name:"New York"},{id:33,abbrev:"NC",name:"North Carolina"},{id:34,abbrev:"ND",name:"North Dakota"},{id:35,abbrev:"OH",name:"Ohio"},{id:36,abbrev:"OK",name:"Oklahoma"},{id:37,abbrev:"OR",name:"Oregon"},{id:38,abbrev:"PA",name:"Pennsylvania"},{id:39,abbrev:"RI",name:"Rhode Island"},{id:40,abbrev:"SC",name:"South Carolina"},{id:41,abbrev:"SD",name:"South Dakota"},{id:42,abbrev:"TN",name:"Tennessee"},{id:43,abbrev:"TX",name:"Texas"},{id:44,abbrev:"UT",name:"Utah"},{id:45,abbrev:"VT",name:"Vermont"},{id:46,abbrev:"VA",name:"Virginia"},{id:47,abbrev:"WA",name:"Washington"},{id:48,abbrev:"WV",name:"West Virginia"},{id:49,abbrev:"WI",name:"Wisconsin"},{id:50,abbrev:"WY",name:"Wyoming"}
  ]

  conFreqArr = [
    {
      id: 0,
      name: "Contact only about account information"
    }
  ]

  apiConFreqArr = [
    {id:0,name:"Contact only about account information"},{id:1,name:"OK to contact with marketing information"},{id:2,name:"OK to contact with third-party marketing information"}
  ]

  // Change this value to true to test for when the api isn't connected.
  mockApiOffline = false;

  //apiUrl = "https://localhost:7228/";

  constructor(private httpClient : HttpClient) { }

  public getStatesList() {
    /*let returnedStates = this.httpClient.get(this.apiUrl + "states");

    let tempArr: any

    returnedStates.subscribe(data => tempArr = data);
    
    if (tempArr == undefined) {
      console.log("Error getting states. API may be offline. Ignore if unit testing.");
      return this.statesArr;
    }

    return tempArr;*/

    if (this.mockApiOffline) {
      return this.statesArr;
    }

    return this.apiStatesArr;
  }

  public getContactFrequencies() {
    /*let returnedFreq = this.httpClient.get(this.apiUrl + "contact-freq");

    let tempArr: any

    returnedFreq.subscribe(data => tempArr = data);

    if (tempArr == undefined) {
      console.log("Error getting contact frequencies. API may be offline. Ignore if unit testing.");
      return this.conFreqArr;
    }

    return tempArr;*/

    if (this.mockApiOffline) {
      return this.conFreqArr;
    }

    return this.apiConFreqArr;
  }

  public getStateName(stateAbbrev: String) {
    let statesList = this.getStatesList();

    let state = statesList.find((state: { abbrev: String; }) => state.abbrev == stateAbbrev);
    console.log(stateAbbrev);

    console.log(state);

    if (state == undefined) {
      console.log("Error, state name with abbreviation " + stateAbbrev + " not found. API may be offline.");
      return stateAbbrev;
    }

    return state.name;
  }
}
