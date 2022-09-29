import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { DatabaseService } from '../database.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.less']
})
export class EditContactComponent implements OnInit {
  // Pattern for finding an email address based on the requirements listed on https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
  emailPattern = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(([*a-zA-Z0-9!#$%&'.*+/=?^_`{|}~-]+[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-])||([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]))+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;
  phonePattern = /^((\([0-9]{3}\)-[0-9]{3}-[0-9]{4})||([0-9]{10}))$/;
  zipPattern = /^[0-9]{5}$/;
  maxNameChar = 20;
  maxCityChar = 50;
  maxStreetChar = 100;

  statesArr : any;
  contactFreqArr : any;

  contactId = -1;
  oldData : any;
  errorMessage = "";

  constructor(private routeData : ActivatedRoute, private databaseService : DatabaseService,
    private apiService : ApiService, public router : Router) {
    this.statesArr = apiService.getStatesList();
    this.contactFreqArr = apiService.getContactFrequencies();
  }

  ngOnInit(): void {
    let contactId = this.routeData.snapshot.paramMap.get("contactId");
    this.contactId = (contactId == null ? -1 : Number(contactId));
    this.updateErrorMessage();

    if (this.contactId != -1) {
      this.oldData = this.databaseService.getContactById(this.contactId);

      if (this.oldData == undefined) {
        sessionStorage.setItem("errorMessage", "Error, contact not found.");
        this.router.navigate(['/contacts']);
      }
    } else {
      this.oldData = undefined;
    }
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

  submitContact(f : NgForm) {
    console.log("makes it here");
    let firstName = f.value.firstName.trim();
    let lastName = f.value.lastName.trim();
    let emailAddress = f.value.emailAddress.trim();
    let phoneNumber = f.value.phoneNumber.trim();
    let street = f.value.street.trim();
    let city = f.value.city.trim();
    let zip = f.value.zip.trim();
    let state = f.value.state;
    let contactFrequency = f.value.contactFrequency;
    let allValid = true;

    if (firstName.length < 1 || firstName.length > this.maxNameChar) {
      allValid = false;
      f.controls['firstName'].setErrors({ error: "First name is not valid." });
    }

    if (lastName.length < 1 || lastName.length > this.maxNameChar) {
      allValid = false;
      f.controls['lastName'].setErrors({ error: "Last name is not valid." });
    }
    
    if (!this.emailPattern.test(emailAddress) || /.*\.\..*/.test(emailAddress)) {
      allValid = false;
      f.controls['emailAddress'].setErrors({ error: "Email is not valid. May contain repeated '.'" });
    }

    if (!this.phonePattern.test(phoneNumber)) {
      allValid = false;
      f.controls['phoneNumber'].setErrors({ error: "Phone number is not valid" });
    } else if (allValid) {
      phoneNumber = phoneNumber.replace(/\(/g, '');
      phoneNumber = phoneNumber.replace(/\)/g, '');
      phoneNumber = phoneNumber.replace(/\-/g, '');
    }

    if (street.length < 1 || street.length > this.maxStreetChar) {
      allValid = false;
      f.controls['street'].setErrors({ error: "Street address is not valid." });
    }

    if (city.length < 1 || city.length > this.maxCityChar) {
      allValid = false;
      f.controls['city'].setErrors({ error: "City name is not valid." });
    }

    if (!this.zipPattern.test(zip)) {
      allValid = false;
      f.controls['zip'].setErrors({ error: "Zip code is not valid." });
    }

    if (!this.statesArr.find((s: { abbrev: any; }) => s.abbrev == state)) {
      allValid = false;
      sessionStorage.setItem("errorMessage", "Error, could not recognize the entered State.");
      this.updateErrorMessage();
    }

    if (!this.contactFreqArr.find((f: { id: number; }) => f.id == contactFrequency)) {
      allValid = false;
      sessionStorage.setItem("errorMessage", "Error, could not recognize the entered contact preferance.");
      this.updateErrorMessage();
    }


    if (allValid) {
      let newData = {
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
        address: {
          street: street,
          city: city,
          state: state,
          zip: zip
        },
        contactFrequency: contactFrequency
      };


      console.log("makes it here too");
      if (this.contactId == -1) {
        this.databaseService.addNewContact(newData);
        this.router.navigate(['/contacts']);
      } else if (this.databaseService.updateContactById(this.contactId, newData)) {
        this.router.navigate(['/contacts']);
        // Successfully updated.
      } else {
        sessionStorage.setItem("errorMessage", "Error, could not add new data.");
        this.updateErrorMessage();
      }
    }
  }

}
