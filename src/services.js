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
