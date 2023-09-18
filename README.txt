
# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).
Server generated HTML
No client side javascript

## Final Product

!["Screenshot of URLs page of logged-in user"](https://github.com/AlannaParsons/lighthouse/blob/main/tinyapp/docs/urls-page.png?raw=true)
!["Screenshot if URLs:id page. Detailed page of given shortened url, primarily used for editing"](https://github.com/AlannaParsons/lighthouse/blob/main/tinyapp/docs/urls:id-page.png?raw=true)

## Dependencies

- Node.js
- Express
- EJS
- bcryptjs
- cookie-session

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.


FUNCTIONALITY
1 - Add route for /urls in expressserver.js and render using accompanying template
Add route for /urls/:id in expressserver.js and render using accompanying template
Include the header partial inside urls_index.ejs and urls_show.ejs. Make sure this is included inside the top of the body

2- Add GET route to expressserver.js and render using accompanying template
Add POST route to expressserver.js to receive form submission

3- Update expressserver.js to store short-url and long-url key value pair to database when a POST request is received to /urls
Update expressserver.js to respond with a redirect from /urls to /urls/:id

4- In urls_index.ejs template, add a form element for each shortURL which uses a POST method
Add POST route for /urls/:id/delete to remove URLs

5- Add form to urls_show.ejs that submits an updated longURL
Add Edit button to each object in urls_index.ejs which takes you to appropriate urls_show page
Add POST route for /urls/:id to update a resource



8 - Add POST route for /login to expressserver.js
Redirect browser back to /urls page after successful login
Modify _header.ejs to display a username using cookie-parser
Add a POST route for /logout which clears the cookie and redirects the user to /urls page

9 - Add a POST route for /register which will:
Add new user object to global users object
Set userid cookie
Redirect user to /urls page
Update all endpoints that pass username value to templates to pass entire user object to template instead and change logic as follows:
Look up user object in users objects using userid cookie value
Pass user object to templates
Update _header.ejs to show email instead of username

10-Modify the POST /register route to handle following error conditions:
If email/password are empty, send back response with 400 status code
If someone tries to register with an email that already exists in users object, send response back with 400 status code (Consider creating an email lookup helper function, getUserByEmail(), to keep your code DRY)

11 - Create a new template with a login form which contains an email and password field
Form will send a POST request to /login
Add a GET route /login that renders the appropriate template
Modify _header.ejs to display Register link pointing to Register page
Modify _header.ejs to display Login link pointing to Login page for users not logged in

12 - Modify the POST /login endpoint to:
Use new email and password fields to look up email address submitted via form
Set an appropriate userid cookie on successful login
Use same functionality in register route
Modify logout endpoint to clear userid cookie instead of username
Modify logout reroute to send users to /login
Update any code still using username cookie to use the new user_id cookie

13 -
If someone is logged in and visits /register or /login pages, they will be redirected to /urls
 ??? revisit -  If someone is not logged in, redirects to the /login page
If someone is not logged in and visits /urls/new, they will be redirected to /login
If someone makes a POST request to /urls/new and they are not logged in, they should see a relevant error message
If someone makes a request for a url that doesn't exist (no url with provided id in our database), they should see a relevant error message
Every user should be able to visit /u/:id whether they are logged in or not (changed later)

14 -
Create function urlsForUser(id) which returns URLs where userID equals id of logged in user and update code to:
only display urls if the user is logged in
only show urls that belong to the user when logged in
Otherwise, prompt user to register or login first
Update /edit and /delete endpoints so only owners/creators can edit and delete links
  POST /urls/:id should return a relevant error message if id does not exist
  POST /urls/:id should return a relevant error message if the user is not logged in
  POST /urls/:id should return a relevant error message if the user does not own the URL
  POST /urls/:id/delete should return a relevant error message if id does not exist
  POST /urls/:id/delete should return a relevant error message if the user is not logged in
  POST /urls/:id/delete should return a relevant error message if the user does not own the URL.

15 -
Modify the registration endpoint to use bcrypt to hash and save password (use bcrypt.hashSync)
Modify the login endpoint to use bcrypt to check the password (use bcrypt.compareSync)

16 -
All cookie data is encrypted


Activity	Requirements
Template Engine - EJS
Add route for /urls in expressserver.js and render using accompanying template
Add route for /urls/:id in expressserver.js and render using accompanying template
Include the header partial inside urls_index.ejs and urls_show.ejs. Make sure this is included inside the top of the body
URL Shortening (Part 1)
Add GET route to expressserver.js and render using accompanying template
Add POST route to expressserver.js to receive form submission
URL Shortening (Part 2)
Update expressserver.js to store short-url and long-url key value pair to database when a POST request is received to /urls
Update expressserver.js to respond with a redirect from /urls to /urls/:id
Deleting URLs
In urls_index.ejs template, add a form element for each shortURL which uses a POST method
Add POST route for /urls/:id/delete to remove URLs
Updating URLs
Add form to urls_show.ejs that submits an updated longURL
Add Edit button to each object in urls_index.ejs which takes you to appropriate urls_show page
Add POST route for /urls/:id to update a resource
Cookies in Express
Add POST route for /login to expressserver.js
Redirect browser back to /urls page after successful login
Displaying Username with cookie-parser
Modify _header.ejs to display a username using cookie-parser
Logout and Clear Cookies
Add a POST route for /logout which clears the cookie and redirects user to /urls page
User Registration Form
Create a new template with a form containing email and password field.
Email field should use type=email and have name=email
Password field should use type=password and have name=password
Form should POST to /register
Add a GET route for /register which renders the registration template
Registering New Users
Add a POST route for /register which will:
Add new user object to global users object
Set userid cookie
Redirect user to /urls page
Update all endpoints that pass username value to templates to pass entire user object to template instead and change logic as follows:
Look up user object in users objects using userid cookie value
Pass user object to templates
Update _header.ejs to show email instead of username
Registration Errors
Modify the POST /register route to handle following error conditions:
If email/password are empty, send back response with 400 status code
If someone tries to register with an email that already exists in users object, send response back with 400 status code (Consider creating an email lookup helper function, getUserByEmail(), to keep your code DRY)
A New Login Page
Create a new template with a login form which contains an email and password field
Form will send a POST request to /login
Add a GET route /login that renders the appropriate template
Modify _header.ejs to display Register link pointing to Register page
Modify _header.ejs to display Login link pointing to Login page for users not logged in
Refactoring the Login Route
Modify the POST /login endpoint to:
Use new email and password fields to look up email address submitted via form
Set an appropriate userid cookie on successful login
Use same functionality in register route
Modify logout endpoint to clear userid cookie instead of username
Modify logout reroute to send users to /login
Update any code still using username cookie to use the new user_id cookie
Basic Permission Features
If someone is logged in and visits /register or /login pages, they will be redirected to /urls
If someone is not logged in, redirects to the /login page
If someone is not logged in and visits /urls/new, they will be redirected to /login
If someone makes a POST request to /urls and they are not logged in, they should see a relevant error message
If someone makes a request for a url that doesn't exist (no url with provided id in our database), they should see a relevant error message
Every user should be able to visit /u/:id whether they are logged in or not
More Permission Features
Create function `urlsForUser(id)` which returns URLs where userID equals id of logged in user and update code to:
only display urls if the user is logged in
only show urls that belong to the user when logged in
Otherwise, prompt user to register or login first
Update /edit and /delete endpoints so only owners/creators can edit and delete links
Storing Passwords Securely
Modify the registration endpoint to use bcrypt to hash and save password (use bcrypt.hashSync)
Modify the login endpoint to use bcrypt to check the password (use bcrypt.compareSync)
Switching to Encrypted Cookies
All cookie data is encrypted
Stretch: Method Override	Stretch Only:
Modify the forms that should be PUT or DELETE
Modify the relevant routes to use app.put or app.delete
Stretch: Analytics	Stretch Only:
Keep track of how many times a given short URL is visited and display it on the edit page for the url

TESTS
A user can register
A user cannot register with an email address that has already been used
A user can log in with a correct email/password
A user sees the correct information in the header
A user cannot log in with an incorrect email/password
A user can log out
A user is sent to the appropriate endpoint following logout

