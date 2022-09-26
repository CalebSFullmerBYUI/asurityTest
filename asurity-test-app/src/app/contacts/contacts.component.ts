import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent implements OnInit {
  /*
    firstname
    lastname
    emailaddress
    phonenumber
    address
        street
        city
        state
        zip
    contact frequency
  */
  contactsArr : any;

  constructor(private databaseService: DatabaseService, private apiService : ApiService) { }

  ngOnInit(): void {
    this.contactsArr = this.databaseService.getAllContacts();
  }

  deleteContact(id: Number) {
    this.databaseService.deleteContactById(id);
    this.contactsArr = this.databaseService.getAllContacts();
  }

  getStateName(stateAbbrev: String) {
    return this.apiService.getStateName(stateAbbrev);
  }

}
