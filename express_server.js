/*
-------------------------------------------------------------
Alanna Parsons
Lighthouse labs
Jul 24 2023
-------------------------------------------------------------
Instruction

Add GET route to expressserver.js and render using accompanying template
Add POST route to expressserver.js to receive form submission
Update expressserver.js to store short-url and long-url key value pair to database when a POST request is received to /urls
Update expressserver.js to respond with a redirect from /urls to /urls/:id
Add validation

- data base is wiped when server is shut down


Over the next few exercises, we will modify our TinyURL app to allow people
to register for a user account with an email and a password. The app
will therefore have to properly store users as well.

-- creative differences
- changes u/:id to urls:id
- adding new url posts to url/new not url


-- FIX
certain error should be status, some should be viewable to user. identify and change
no log term user/data storage
 get login and register breaksn if cookies are saved but server resets....
*/


const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

const bcrypt = require("bcryptjs");
//const cookieParser = require('cookie-parser');
//const cookieParser = require('cookie-session');
const cookieSession = require('cookie-session');
const { urlBelongsToUser, loggedIn, exists, manyexists, generateRandomString } = require("./helpers");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
//var app = express()
//app.use(cookieSession())
//look into keys further. function???
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

// const urlDatabase = {
//   "b2xVn2": "http://www.lighthouselabs.ca",
//   "9sm5xK": "http://www.google.com"
// };

const urlDatabase = {
  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "aJ48",
  },
  i3BoGr: {
    longURL: "https://www.google.ca",
    userID: "aJ48lW",
  },
  b6: {
    longURL: "https:.tsn.ca",
    userID: "aJ48",
  },
  i3BoG: {
    longURL: "https://www.goo",
    userID: "aJ48lW",
  },
  b6UT: {
    longURL: "https://www.tn.ca",
    userID: "aJ48",
  },
  i3Bo: {
    longURL: "https://www.google.com",
    userID: "aJ48lW",
  },
  i3B: {
    longURL: "https://www..ca",
    userID: "aJ48lW",
  },
  b6U: {
    longURL: "https://www.t.ca",
    userID: "aJ48",
  },
  i3: {
    longURL: "https://www.g",
    userID: "aJ48lW",
  },
};

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//The GET /urls page should only show the logged in user's URLs.

app.get("/urls", (req, res) => {
  if (loggedIn) {
    //get urls from database w login info
    //let logginID =  req.cookies["user_id"];
    let logginID =  req.session.user_id;
    const userUrls = manyexists(urlDatabase, 'userID', logginID);
    const templateVars = { urls: userUrls, user: users[req.session.user_id] };
    res.render("urls_index", templateVars);


  } else {
    const templateVars = { user: users[req.session.user_id], errorMsg: "User is not authorized to use page /nPlease Loggin"};
    return res.render("urls_error", templateVars);
  }

});

//BUG: not redirecting currently
app.get("/urls/new", (req, res) => {
  //If the user is not logged in, redirect GET /urls/new to GET /login
  const templateVars = { user: users[req.session.user_id] };
  if (loggedIn(req)){
    res.render("urls_new", templateVars);

  } else {
    res.render("urls_login", templateVars);
  }
  //res.render("urls_new", templateVars)


});

//The individual URL pages should not be accessible to users who are not logged in.
//Ensure the GET /urls/:id page returns a relevant error message to the user if they are not logged in.
//show user error page?? or send error codes???
app.get("/urls/:id", (req, res) => {
// fix miriad of nested ifs....
  if (loggedIn(req)) {

    if (req.params.id in urlDatabase){ // valid/existing ID

      if (urlBelongsToUser(req, urlDatabase)){ // AND url belongs to user

        //console.log('   id:', req.params.id, '   longurl pull:', urlDatabase[req.params.id].longURL);

        const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id].longURL, user: users[req.session.user_id]};

        res.render("urls_show", templateVars);
      } else {
        //dont love this for security. exists to spec
        const templateVars = { user: users[req.session.user_id], errorMsg: "User does not own this URL"};
        res.render("urls_error", templateVars);

      }
    } else {
      const templateVars = { user: users[req.session.user_id], errorMsg: "Invalid ID"};
      res.render("urls_error", templateVars);

    }
  } else {
    const templateVars = { user: users[req.session.user_id], errorMsg: "User is not authorized to use page /nPlease Loggin"};
    res.render("urls_error", templateVars);

  }
});

//can only register if not logged in
app.get("/register", (req, res) => {
  const templateVars = { user: users[req.session.user_id]};
  if (!loggedIn(req)){
    res.render("urls_register", templateVars);
  } else {
    res.render("urls", templateVars);
  }
});

app.get("/login", (req, res) => {
  const templateVars = { user: users[req.session.user_id]};
  if (!loggedIn(req)){
    res.render("urls_login", templateVars);
  } else {
    res.render("urls", templateVars);
  }
});


//specs ask for 404. use error page?
//login
//If a user with that e-mail address is located, compare the password given in the form with the existing user's password. If it does not match, return a response with a 403 status code.
//check if user is logged in? possible??
app.post("/login", (req, res) => {

  //res.cookie('username', req.body.username);
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;
  //console.log('login print:',users);

  // temp will be null or id..user?
  let registeredEmail = exists(users, 'email', inputEmail);
  //existing user
  if (registeredEmail){
    console.log('@login post', registeredEmail, 'exists');
    //matching passowrd?
    if (bcrypt.compareSync(inputPassword, registeredEmail.password)){
      console.log('@login post password', registeredEmail.password, '===', inputPassword);
      //res.cookie('user_id', registeredEmail.id);
      req.session.user_id = registeredEmail.id;
      return res.redirect("/urls");
    } else {
      //console.log('@login post password', registeredEmail.password, '!==', inputPassword)
      return res.sendStatus(403);
    }


  } else {
  //email not registered
  //console.log('@login post', registeredEmail, 'doesnt exists');
  return res.status(403).send("Email is not registered");
  }
});

//logout
//logout not secure??? check cookies???
app.post("/logout", (req, res) => {
  console.log('@logout post', req.session.user_id)

  req.session = null
  //console.log('@logggedout post:', req.session.user_id)
  //res.clearCookie('user_id');
  res.redirect("/login");
});

//POST /urls/:id/delete
//After the resource has been deleted, redirect the client back to the urls_index page ("/urls").
app.post("/urls/:id/delete", (req, res) => {
  if (loggedIn(req)) {

    if (req.params.id in urlDatabase){ // valid/existing ID

      if (urlBelongsToUser(req, urlDatabase)){ // AND url belongs to user
        delete urlDatabase[req.params.id]
        res.redirect("/urls");

      } else {
        //dont love this message for security reasons. exists to spec
        return res.status(401).send("User is not authorized to delete URL");

      }
    } else {
      return res.status(400).send("Invalid ID");

    }
  } else {
    return res.status(401).send("Please Loggin");
  }
});

//add new long url
// add https and .com or request from user???
//If the user is not logged in, POST /urls should respond with an HTML message that tells the user why they cannot shorten URLs. Double check that in this case the URL is not added to the database.
app.post("/urls/new", (req, res) => {

  //cant post if not logged in
  console.log('cookie??:',loggedIn(req));
  if (loggedIn(req)){

    longURLInput = 'http://www.' + req.body.longURL;
//validation. could add pop up error message for user, or change redirect
    const shortURL = generateRandomString();
    const goURL = `/urls/${shortURL}`;

    urlDatabase[shortURL] = {
      longURL: longURLInput,
      userID: req.session.user_id
    }
    res.redirect(goURL);


  // necessary????
    // if (!Object.values(urlDatabase).includes(longURLInput)){
    //   const shortURL = generateRandomString();
    //   const goURL = `/u/${shortURL}`;

    //   urlDatabase[shortURL] = longURLInput;
    //   //res.redirect(goURL);
    //   res.redirect("/urls");
    // } else {
    // //console.log('this url already exists');
    // res.redirect("/urls/new");
    // }
  } else {
    //or 404??
    res.status(401).send("User must be logged in to POST urls/new");
  //popup?


    //document.getElementById("p1").innerHTML = "New text!";

  }
});

//edit url
//DUPLICATE?
app.post("/urls/:id", (req, res) => {
  if (loggedIn(req)) {

    if (req.params.id in urlDatabase){ // valid/existing ID

      if (urlBelongsToUser(req, urlDatabase)){ // AND url belongs to user
        urlDatabase[req.params.id].longURL = req.body.newURL;
        res.redirect("/urls");

      } else {
        //dont love this message for security reasons. exists to spec
        return res.status(401).send("User is not authorized to edit URL");

      }
    } else {
      return res.status(400).send("Invalid ID");

    }
  } else {
    return res.status(401).send("Please Loggin");
  }

});

//auto login after register??
//double check what existing email is for??
//can you only register if not logged in?? (stated earlier?)
app.post("/register", (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const existingEmail = exists(users, 'email', email);

  if (!password || !email || existingEmail ) {
    return res.status(400).send("Incomplete/Incorrect data");
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log('recieved @ register:', email, password, hashedPassword);
    const id = generateRandomString();

    users[id] = {
      id,
      email,
      password: hashedPassword
    }

    console.log('just checking', users);

    req.session.user_id = id;
    //res.cookie('user_id', id);
    res.redirect("/urls");
  }

});



//would prefer array of users...
const users = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk",
  },
  aJ48lW: {
    id: "aJ48lW",
    email: "test@test.com",
    password: "test",
  }
};
