'use strict';
/*istanbul ignore next*/
/* global expect */

var user = require('../modules/userClass');

describe("test the userclass", function() {
  it("setting user and location is correct", function() {
      expect(user.firstName).toEqual('kwais');
      
      
  });
  
  it("is just a function, so it can contain any code", function() {
    expect(user.lastName).toEqual(user.dates);
    
  });
  
  it("is just a function, so it can contain any code", function() {
    expect(user.location).toEqual(user.dates);
    
  });
});