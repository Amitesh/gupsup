'use strict';

var AppDispatcher   = require('../dispatcher/AppDispatcher.js');
var StreamConstants = require('../constants/StreamConstants.js');

var StreamActions = {
  /**
   * Fetch the list of friends and my groups to start conversations 
   * with them.
   * @return {[type]} [description]
   */
  fetch: function(){
    // TODO : need to cleanup or do better way if time permits
    // Send csrf-token
    $.get('/users/my_buddy_list.json', function(streams) {
      AppDispatcher.dispatch({
        actionType: StreamConstants.FETCH_STREAMS,
        streams: streams
      });
      
    });
  },

  subscribeToChannel: function(){
    PrivatePub.subscribe(gupsupChannels.new_stream, function(streamData, channel) {
      var stream = $.parseJSON(streamData.data);
      
      // Initiate to fetch the list of stream
      StreamActions.fetch();

    });
  },

  unsubscribeFromChannel: function(){
    PrivatePub.unsubscribe(gupsupChannels.new_stream);
  }
}

module.exports = StreamActions;