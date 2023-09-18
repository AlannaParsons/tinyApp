//error:
//document.getElementById(id).innerHTML = new HTML
function urlBelongsToUser(req, urlDatabase){
  const userUrls = manyexists(urlDatabase, 'userID', req.session.user_id);
  console.log('@urlBelongsToUser t?f', req.params.id, 'belong to :', req.session.user_id,' ->', req.params.id in userUrls)
  return req.params.id in userUrls;
}

//more readable? returns true if logged in
function loggedIn(req){
  console.log('@loggedIN',req.session.user_id,'  logged in');
  return (req.session.user_id);
}

//return if key? item exists in users (cannot use find, nested obj :()
//return id?? or user obj??...

/**
 * exists(obj, key, searchItem) - item exists in obj (cannot use find, nested obj :()
 *
 * @param {object} obj - nested object
 * @param {string} key - key associated w search item
 * @param {string} searchItem - value to be found
 * @return {object|null}
*/
function exists(obj, key, searchItem) {
  for (let id in obj){
    if (obj[id][key] === searchItem){
      //console.log('emAIL exists for login!!!');
      //res.cookie('user_id', users[id].id);
      console.log('@exists()', searchItem, 'exists');
      return obj[id];
    } //else {
      //console.log('no email exists @ login')
    //}

  }
  console.log('@exists()', searchItem, 'doesnt exist');
  return null;
}

/**
 * exists(obj, key, searchItem) - item exists in obj (cannot use find, nested obj :()
 *
 * @param {object} obj - nested object
 * @param {string} key - key associated w search item
 * @param {string} searchItem - value to be found
 * @return {object}
*/
function manyexists(obj, key, searchItem) {
  let results = {};
  for (let id in obj){
    console.log('comparing:',obj[id][key],'try to find',searchItem);
    if (obj[id][key] === searchItem){

      //res.cookie('user_id', users[id].id);

      //return obj[id];
      results[id] = obj[id];
    }

  }
  console.log('@manyexists()', results);
  return results;
}

//urlsForUser(id)

//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function generateRandomString() {
  const crypto = require("crypto");
  const id = crypto.randomBytes(4).toString('hex');
  return id;
}

module.exports = { urlBelongsToUser, loggedIn, exists, manyexists, generateRandomString };