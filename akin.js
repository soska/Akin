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
// Sharing services
// ----------------------

// ## Email
// Simple share by email.
Akin.fn.email = function(){
  // email should open in same window no matter what.
  this.settings.same_window = true;
  this.share_url = "mailto:?subject=" + this.settings.title + "&body="  + this.settings.title + "  " + this.settings.url;
};


// ## Twitter
// Share by twitter.
Akin.fn.twitter = function(){

  this.share_url = "http://twitter.com/share?text=" + this.settings.title + "&url=" + this.settings.url; 

  if ( this.settings.twitter ) {
    var o = this.settings.twitter;

    if ( o.related ) {
      this.share_url += "&related=" + o.related.join(',');
    }

    if ( o.hashtags ) {
      this.share_url += "&hashtags=" + o.hashtags.join(',');
    }

  }
};

// ## Facebook
// Share by facebook
// TODO : Use a facebook dialog if credentials are available.
Akin.fn.facebook = function(){
  this.share_url = "http://facebook.com/sharer.php?t=" + this.settings.title + "&u=" + this.settings.url;
};
// 
// jQuery Plugin
// ----------------------
(function($){
  
  $.fn.akin = function( o ){
    o = o || {};
    
    return $(this).on('click',function(e){
      
      e.preventDefault();
      
      var service = this.getAttribute('data-service');
      new Akin( service, o ).share();

    });
  }
  
})(jQuery);
