import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent implements OnInit {
  contactsArr : any;
  errorMessage = "";

  constructor(private databaseService: DatabaseService, private apiService : ApiService, public router: Router) { }

  ngOnInit(): void {
    this.contactsArr = this.databaseService.getAllContacts();
    this.updateErrorMessage();
  }

  deleteContact(id: Number) {
    this.databaseService.deleteContactById(id);
    this.contactsArr = this.databaseService.getAllContacts();
  }

  getStateName(stateAbbrev: String) {
    return this.apiService.getStateName(stateAbbrev);
  }

  updateErrorMessage() {
    let errorMessage = sessionStorage.getItem("errorMessage");

    if (errorMessage != null && errorMessage.length > 0) {
      this.errorMessage = errorMessage;
      sessionStorage.setItem("errorMessage", "");
    } else {
      this.errorMessage = "";
    }
  }

}
