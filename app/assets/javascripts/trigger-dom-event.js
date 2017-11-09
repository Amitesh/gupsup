/**
 * trigger a DOM event via script
 * @param {Object,String} element a DOM node/node id
 * @param {String} event a given event to be fired - click,dblclick,mousedown,etc.
 */

(function($){
  $.fn.triggerDomEvent = function(evtName){
    return this.each(function() {
      var evt;
      var element = this;
      if (document.createEventObject) {
          // dispatch for IE
          evt = document.createEventObject();
          return element.fireEvent('on' + evtName, evt)
      }
      else {
          // dispatch for firefox + others
          evt = document.createEvent("HTMLEvents");
          evt.initEvent(evtName, true, true); // evtName type,bubbling,cancelable
          return !element.dispatchEvent(evt);
      }
    });
  };
})(jQuery);


