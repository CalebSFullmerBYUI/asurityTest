import { ConditionalExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  static contactsArr = [
    {
      id: 0,
      firstName: "Caleb",
      lastName: "Fullmer",
      emailAddress: "calebFullmerEmail@gmail.com",
      phoneNumber: "2081234567",
      address: {
        street: "1234 Testing Rd.",
        city: "Test Town",
        state: "ID",
        zip: "12345"
      },
      contactFrequency: 0
    }
  ];

  static newId = 10;

  constructor() {
    if (!localStorage.getItem("contactsArr")) {
      localStorage.setItem("contactsArr", JSON.stringify(DatabaseService.contactsArr));
    }

    if (!localStorage.getItem("newId")) {
      localStorage.setItem("newId", DatabaseService.newId.toString());
    }
  }

  public getAllContacts() {
    let contactsArr = localStorage.getItem("contactsArr");

    if (contactsArr != null) {
      return JSON.parse(contactsArr);
    } else {
      return [];
    }
  }

  public getContactById(id: Number) {
    let contactsArr = this.getAllContacts();
    return contactsArr.find((contact: { id: Number; }) => contact.id == id);
  }

  public updateContactById(id: Number, newData: any) {
    let contactsArr = this.getAllContacts();
    let contactIndex = contactsArr.findIndex((contact: { id: Number; }) => contact.id == id);

    if (contactIndex == -1) {
      // Error, not found
      return false;
    } else {
      newData.id = id;
      contactsArr[contactIndex] = newData;
      localStorage.setItem("contactsArr", JSON.stringify(contactsArr));
      return true;
    }
  }

  public addNewContact(newData: any) {
    let contactsArr = this.getAllContacts();
    let newId = Number(localStorage.getItem("newId"));

    newData.id = newId; // Not a great id gernating method, but works for this.
    console.log(newData);
    localStorage.setItem("newId", (newId + 1).toString());

    contactsArr.push(newData);
    localStorage.setItem("contactsArr", JSON.stringify(contactsArr));
  }

  public deleteContactById(id: Number) {
    let contactsArr = this.getAllContacts();
    let contactIndex = contactsArr.findIndex((contact: { id: Number; }) => contact.id == id);

    if (contactIndex == -1) {
      // Error, not found
      return false;
    } else {
      contactsArr.splice(contactIndex, 1);
      localStorage.setItem("contactsArr", JSON.stringify(contactsArr));
      return true;
    }
  }


  public deleteContactByFirstName(firstname: String) {
    let contactsArr = this.getAllContacts();
    let contactIndex = contactsArr.findIndex((contact: { firstName: String; }) => contact.firstName == firstname);

    if (contactIndex == -1) {
      // Error, not found
      return false;
    } else {
      contactsArr.splice(contactIndex, 1);
      localStorage.setItem("contactsArr", JSON.stringify(contactsArr));
      return true;
    }
  }
}
