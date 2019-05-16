# Glints Part 2 

This particular app is built using MERN stack with the help of Redux to handle the state.


# How To Run

## Prerequirements
* [NodeJs](https://nodejs.org/en/) ^12.0
* [NPM](https://www.npmjs.com/get-npm)

Clone the repository
```bash
~ git clone https://github.com/greekrode/glints_part2.git
~ cd glints_part 2
~ npm install && npm client-install
~ npm run dev
```

## Project Description

The server is hosted on ```http://localhost:5000``` and the client is hosted on ```http://localhost:3000```. 

[Socket.io](https://socket.io/) is used to handle the live update of the collection page. 

The database is hosted on MongoDB Atlas and please use the database set on the project since it contains the data needed. 

For the mail service, Mailgun is used to send e-mail. If the mail isn't sent to the designated email address, kindly let me know so I can change the credentials because Mailgun can sometimes suspend account due to the amount of continuous request.

Once the page is running, please register. You will be redirected to the login page. 

Once you've logged in to the site, the **Restaurant** button will lead you to the restaurant data, the **Collection** button will lead you to the list of your collection(s). Collaborative collections will be the list of collections in which you're invited to join. 

To invite someone to your collection, simply press the **Blue** button with **users** icon. Please type in a valid email address. Check your email address to for the invitation link.
