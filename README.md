# SteamApp
This is an imitation of steam. Applications were created for the practice of creating projects using the Angular framework. 
Server was made using Node.js.
As data storage, was used MongoDB (library - mongoose).
For authorization was used JSON Web Token (JWT, libraries: jwt-decode, jsonwebtoken)


## Roles
- gamer (email: gamer@gmail.com, pw: gamer)
- developer (email: developer@gmail.com, pw: developer)
- admin (email: admin@gmail.com, pw: admin)

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
