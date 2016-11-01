
const readline = require('readline-sync')

//creates a class for people registering

exports.Person = class {
    constructor(name, work, location){
        this.name = name;
        this.work = work;
        this.area = location;
    }
    
    const name1 = String(readline.question('Enter name: ')).trim()
    const work1 = String(readline.question('Enter work: ')).trim()
    const area1 = String(readline.question('Locatiopn ?: ')).trim()
    
    function setValue(){
       Person.name = name1;
       Person.work = work1;
       Person.area = area1;
    }
    
    var person = () =>{
        console.log('name: ' + name1 + 'works as a ' + work1 + 'lives at ' + area1);
    }

    
}