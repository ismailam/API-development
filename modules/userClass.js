'use strict';

const readline = require("readline-sync");

const firstNames = String(readline.question('Enter first name: ')).trim();
const lastNames = String(readline.question('Enter last name: ')).trim();
const dates = String(readline.question('enter date: ')).trim();
const locations = String(readline.question('current location: ')).trim();


var User = {
  firstName: firstNames,
  lastName : lastNames,
  date : dates,
  location : (x) => {
    x = locations
      
      return x;
      
  }
  
}

console.log(User.firstName);
console.log('your current location is ' + User.location());

const user = [];

user.push(User);

console.log(user.length);


