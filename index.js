/*This file was created because in order to write ES6 in server.js
  a file needs to instantiate the babel register code bellow,
  but if you do, you cannot use import or other ES6 sintax in that same file
  Therefore we do this stupid ass hack of creating an extra file that just imports
  the server
*/

require('babel-register')({
    presets: ['es2015'],
});

require('./server');
