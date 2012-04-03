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
