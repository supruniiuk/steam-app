# SteamApp
This is an imitation of steam. Applications were created for the practice of creating projects using the Angular framework. 
Server was made using Node.js
As data storage, was used MongoDB (library - mongoose).
For authorization was used JSON Web Token (JWT, libraries: jwt-decode, jsonwebtoken)

## Main Deployment
https://supruniuk-steam.herokuapp.com/
## Server Deployment(if you want to test reqests)
https://supruniuk-steam-server.herokuapp.com/

## How to run?
 Please make sure you have installed node and npm in your system.
 ```
 node -v
 npm -v
 ```
 
 After checking if you have Node installed in your system, you can start app:
 ```
 git clone https://github.com/supruniiuk/steam-app.git
 cd steam-app
 
--- Client
 cd client
 npm install
 ng serve
 
--- Server
 cd server
 npm install
 npm start
 
 ```    
 
 
P.S. in future will add swagger and tests
