/**
 * Utility functions
 * @type {Object}
 */
var Utils = {
  /**
   * Get the meta tag info
   * - csrf-token
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  getMetaContent: function(name) {
    var metas = document.getElementsByTagName('meta');
 
    for (var i=0; i<metas.length; i++) {
      if (metas[i].getAttribute("name") == name) {
        return metas[i].getAttribute("content");
      }
    }
 
    return "";
  },

  genGUID: function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
  }
}
 
module.exports = Utils;
