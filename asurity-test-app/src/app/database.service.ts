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
    },
    {
      id: 1,
      firstName: "Sam",
      lastName: "Smith",
      emailAddress: "Sam@outlook.com",
      phoneNumber: "2222222222",
      address: {
        street: "Java Ln",
        city: "Java Town",
        state: "NM",
        zip: "54345"
      },
      contactFrequency: 1
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      emailAddress: "jDoe@yahoo.com",
      phoneNumber: "8887772222",
      address: {
        street: "TownsDale St",
        city: "Daleworth",
        state: "NM",
        zip: "76567"
      },
      contactFrequency: 0
    },
    {
      id: 3,
      firstName: "Scotty",
      lastName: "Tomson",
      emailAddress: "ScottTom@gmail.com",
      phoneNumber: "6360000000",
      address: {
        street: "Dale St",
        city: "South Dale",
        state: "OK",
        zip: "11111"
      },
      contactFrequency: 2
    },
    {
      id: 4,
      firstName: "Luis",
      lastName: "Maywest",
      emailAddress: "westmay@hotmail.com",
      phoneNumber: "9999999999",
      address: {
        street: "Test Rd",
        city: "Test Town",
        state: "CA",
        zip: "02909"
      },
      contactFrequency: 2
    },
    {
      id: 5,
      firstName: "Bill",
      lastName: "Wattertown",
      emailAddress: "wattertown@gmail.com",
      phoneNumber: "4443333333",
      address: {
        street: "1st St",
        city: "Pendelton",
        state: "AK",
        zip: "98678"
      },
      contactFrequency: 2
    },
    {
      id: 6,
      firstName: "Kelly",
      lastName: "Anderson",
      emailAddress: "kelland@yahoo.com",
      phoneNumber: "8882222222",
      address: {
        street: "3rd Ln",
        city: "Johnsville",
        state: "CT",
        zip: "62712"
      },
      contactFrequency: 0
    },
    {
      id: 7,
      firstName: "Anna",
      lastName: "Hughes",
      emailAddress: "anna@company.org",
      phoneNumber: "2723333333",
      address: {
        street: "House Rd",
        city: "Yellow Road",
        state: "MS",
        zip: "00000"
      },
      contactFrequency: 1
    },
    {
      id: 8,
      firstName: "Dave",
      lastName: "Smith",
      emailAddress: "dsmith@yahoo.com",
      phoneNumber: "44455555555",
      address: {
        street: "Lane Ln",
        city: "City Town",
        state: "NJ",
        zip: "33333"
      },
      contactFrequency: 0
    },
    {
      id: 9,
      firstName: "Sue",
      lastName: "kelly",
      emailAddress: "suekelly@gmail.com",
      phoneNumber: "7776666666",
      address: {
        street: "Apple St",
        city: "Appleton",
        state: "PA",
        zip: "11111"
      },
      contactFrequency: 1
    }
  ];

  static newId = 10;

  constructor() {
    //localStorage.setItem("contactsArr", JSON.stringify(DatabaseService.contactsArr));
    
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
      // Sort by firstName and lastName
      return JSON.parse(contactsArr).sort((contact1: { firstName: String; lastName: String; }, contact2: { firstName: String; lastName: String; }) => {
        if (contact1.firstName.toUpperCase() > contact2.firstName.toUpperCase()) {
          return 1;
        } else if (contact1.firstName.toUpperCase() < contact2.firstName.toUpperCase()) {
          return -1;
        } else if (contact1.lastName.toUpperCase() > contact2.lastName.toUpperCase()) {
          return 1;
        } else if (contact1.lastName.toUpperCase() < contact2.lastName.toUpperCase()) {
          return -1;
        }

        return 0;
      });
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
