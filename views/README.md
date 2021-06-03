# TOP-MUSIC

CS 546

Created by: Janki Patel, Ryan Qin, Brandon Patton, Steven Gorfman

When you first do a npm install, there might be warnings about pre-gyp with bcrypt.
As long as it isn't an error, that's ok. If you do get an error, then 
you should go to the package.json and remove all dependencies except for bcrypt.
You should also delete the node_modules folder that was created.
Then, with only bcrypt as a dependency, do npm install. After that finishes, put all the other dependencies back
by undo. After undoing, you should have the original package.json with all the dependencies. Then, do npm install again
and it should install correctly. Once you have all that set up, you should seed the database by using npm run seed.
npm run seed will populate the list of artists and genres. Finally, once all that is done, you can do npm start
and go about using the website on localhost:3000.
