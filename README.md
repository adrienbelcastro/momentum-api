// Tech Stack //

Node.Js
mySQL

// Directions To Setting Up Backend and Database //

1.) Turn on SQL server (use SQL notifier from install)
2.) Log into SQL (mysql -u USERNAMEFROMINSTALL -p PASSWORDFROM INSTALL)
3.) Run CREATE DATABASE instock_database in mysql
4.) Update .env folder with above for DBNAME, USER and PASSWORD
5.) Then in terminal in project window, knex migrate:latest and knex seed:run
6.) You should then be able to node index.js and the server will be up and running
