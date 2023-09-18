const { assert } = require('chai');

//const { getUserByEmail } = require('../helpers.js');
const { exists } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

describe('exists', function() {
  it('should return a user obj with valid email', function() {
    //const user = getUserByEmail("user@example.com", testUsers)
    const user = exists(testUsers, 'email', 'user@example.com')
    //const user = getUserByEmail("user@example.com", testUsers)
    const expectedUserID = 'userRandomID';
    assert.strictEqual(user.id , expectedUserID , "user.id is equal to id expected to be associate with email")
  });

  //If we pass in an email that is not in our users database, then our function should return undefined.
  it('should return null with invalid email', function() {
    //const user = getUserByEmail("user@example.com", testUsers)
    const user = exists(testUsers, 'email', 'invalid@example.com')
    //const user = getUserByEmail("user@example.com", testUsers)
    const expectedUserID = "userRandomID";
    assert.strictEqual(user, null)
  });

});



// it("should return true if word is found with mulitple possible routes col 4", function() {
//   const result = wordSearch([
//     ['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
//     ['S', 'K', 'A', 'R', 'F', 'E', 'L', 'D'],
//     ['Y', 'N', 'C', 'L', 'R', 'U', 'A', 'L'],
//     ['H', 'A', 'J', 'R', 'A', 'V', 'R', 'G'],
//     ['W', 'R', 'C', 'P', 'N', 'E', 'R', 'L'],
//     ['B', 'F', 'R', 'N', 'K', 'E', 'Y', 'B'],
//     ['U', 'B', 'T', 'K', 'A', 'P', 'A', 'I'],
//     ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
//     ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
//   ], 'FRANK')

//   assert.isTrue(result);
// });

// it("should return false if there are greater than 5 group members", () => {
//   assert(validator.isGroupValid(["a", "b", "c", "d", "e", "f"])).to.be.false;
// });