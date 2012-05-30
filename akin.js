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

  if (this.settings[service] == undefined) {
    this.settings[service] = {};
  }
  
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
  var subject = this.settings.email.subject || this.settings.subject || this.settings.title;
  var body = this.settings.email.body || this.settings.body || subject;
  var url = this.settings.email.url || this.settings.url;

  this.settings.same_window = true;
  this.share_url = "mailto:?subject=" + subject + "&body="  + body + "  " + url;
};


// ## Twitter
// Share by twitter.
Akin.fn.twitter = function(){

  var url = this.settings.twitter.url || this.settings.url;
  var tweet = this.settings.twitter.tweet || this.settings.tweet || this.settings.title;

  this.share_url = "http://twitter.com/share?text=" + tweet + "&url=" + url; 

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
  var caption = this.settings.caption || this.settings.title;
  this.share_url = "http://facebook.com/sharer.php?t=" + caption + "&u=" + this.settings.url;
};

// ## Pinterest
// Share by facebook
// TODO : Use a facebook dialog if credentials are available.
Akin.fn.pinterest = function(){
  var description = this.settings.description || this.settings.title;
  var media = this.settings.pinterest.media || this.settings.media;
  var url = this.settings.pinterest.url || this.settings.url;

  this.share_url = "http://pinterest.com/pin/create/bookmarklet/?media="+media+"&url="+url+"&description="+description;
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
  
})(this.jQuery || this.Zepto);

