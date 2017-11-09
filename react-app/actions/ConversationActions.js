'use strict';

var _                = require('lodash');
var AppDispatcher    = require('../dispatcher/AppDispatcher.js');
var MessageConstants = require('../constants/MessageConstants.js');

var ConversationActions = {

  fetch: function(senderId, recipientId){
    // TODO : need to cleanup or do better way if time permits
    // Send csrf-token
    
    $.post("/conversations/get-messages", { sender_id: senderId, recipient_id: recipientId }, function (conversation) {
      var messages = conversation.messages;
      conversation = _.omit(conversation, 'messages')

      AppDispatcher.dispatch({
        actionType: MessageConstants.MESSAGE_LOAD,
        messages: messages,
        conversation: conversation,
        recipientId: recipientId
      });
    }, 'json');
  }
}

module.exports = ConversationActions;