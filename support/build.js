var fs    = require( 'fs' )
  , exec  = require('child_process').exec
  , path  = require( 'path' );
  
var lib = 'src';
var output = 'akin.js';
var minoutput = 'akin.min.js';

var files = process.argv.slice(2);

/**
 * Async Iterator. 
 */
function next( i, fn ) {
  var name = files[i];
  if ( ! name ){
    return fn();
  }
  build( name, function(){
    next( ++i, fn );
  });
}


/**
 * Concatenate files
 */
function build( name, fn ) {
  // javascript
  var file = path.join( lib, name + '.js' );
  read( file, function( str ){
    append( output, str, function(){
      fn();
    })
  });
}

/**
 * Append to `file`.
 */

function append( file, str, fn ) {
  fs.createWriteStream(file, { flags: 'a' })
    .write(str);
  fn && fn();
}

/**
 * Read the given `file`.
 */

function read( file, fn ) {
  fs.readFile( file, 'utf8', function(err, str){
    if ( err ) throw err;
    fn( str );
  });
}

// build em!
next( 0, function(){
  exec( './node_modules/.bin/uglifyjs -o akin.min.js akin.js' );
  console.log("\n\n akin.js finished");
});
