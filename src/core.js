/* ! 
 * 
 * AKIN.js
 * 
 * (c) 2012 Armando Sosa
 */


var Akin = window.Akin = function ( service, o ){
  o = o || {};
  o.url = o.url || window.location.href;
  o.title = o.title || document.title;
  this.settings = o;
  
  if ( typeof this[service] !== "undefined" ) {
    this[service]();
  }
  
}

// Shorthand for Akin.prototype.
Akin.fn = Akin.prototype;

// This is the to be shared. Has to be set by the services.
Akin.fn.share_url = '';

// Redirects to the share_url
Akin.fn.share = function(){
  if ( this.settings.same_window ) {
    window.location = this.share_url;
  }else{
    window.open( this.share_url );      
  }
};
