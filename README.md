# who-let-the-dogs-in
Skookum Night Shift: Who Let The Dogs In
========================================

To test the ordinary react prototype, open prototype.html in a Web browser. 

External script dependencies not on github
------------------------------------------
You must download and move the following files to a *lib* folder:
react.js [from https://facebook.github.io/react/downloads.html]

External build dependencies not on github
-----------------------------------------
From any directory, do the following one time:
npm install webpack -g

Go to the directory which contains your source files, and then do the following on time:
npm install babel-loader --save-dev
npm install babel-runtime --save-dev

After you change any .js or .jsx files, run webpack to build prototype.js according to webpack.config.js
