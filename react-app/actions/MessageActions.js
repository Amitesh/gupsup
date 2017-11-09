'use strict';

var _                = require('lodash');
var moment           = require('../get-moment.js');
var utils            = require('../utils.js');
var AppDispatcher    = require('../dispatcher/AppDispatcher.js');
var MessageConstants = require('../constants/MessageConstants.js');

// Add message immediate to show on message board
var addMessageToConversation = function(messageId, data){
  var message = {
    avatar: current_user.avatar,
    content: data.message.content,
    conversation_id: data.conversationId,
    id: messageId,
    mine: true,
    name: current_user.name,
    origin: data.message.origin,
    sender_id: current_user.id,
    sentAt: moment(),
    sent_at: new Date(),
    status: -1, // sending
    isDraft: true
  };

  AppDispatcher.dispatch({
    actionType: MessageConstants.CREATE_MESSAGE,
    message: message
  });
};

var dispatchMessage = function(actionType, message, messageId, delayBy){
  // TODO: it is only for development environment to test 
  // message different status while its journey 
  setTimeout(function(){
    AppDispatcher.dispatch({
      actionType: actionType || MessageConstants.CREATE_MESSAGE,
      message: message,
      unsavedMessageId: messageId
    });
  }, delayBy || 4000);
}

var MessageActions = {
  create: function(message, conversationId){
    // Post message
    // TODO : need to cleanup or do better way if time permits
    // Send csrf-token
    var postData = {
      conversation_id: conversationId,
      message: {
        content: message.content,
        origin: MessageConstants.origin.WEB, 
        sent_at: new Date()
      }
    };

    var messageId = utils.genGUID();

    // Add to message board
    addMessageToConversation(messageId, postData);

    $.post("/messages", postData, function (message) {
      dispatchMessage(MessageConstants.CREATE_MESSAGE, message, messageId);
    }, 'json');
  },

  updateStatus: function(messageIds, conversationId, status){
    // console.log('update these messageIds =>', messageIds);
    var postData = {
      conversation_id: conversationId,
      message_ids: messageIds,
      status: status || MessageConstants.statusValue.read
    };
    if(!_.isEmpty(messageIds)){
      setTimeout(function(){
        $.post("/messages/status", postData, function (messages) {
          messages.message_ids = $.parseJSON(messages.message_ids);
          
          AppDispatcher.dispatch({
            actionType: MessageConstants.STATUS_CHANGED,
            messageIds: messages.message_ids,
            status: messages.status
          });
        }, 'json');
      }, 4000);
    }
  },

  subscribeToChannel: function(){
    // Subscribe for new messages
    PrivatePub.subscribe(gupsupChannels.new_message, function(messageData, channel) {
      var message = $.parseJSON(messageData.data);

      // Show messages immediate to other user instead of delaying for author user
      var delayBy = message.sender_id == current_user.id ? null : 100;

      dispatchMessage(MessageConstants.RECEIVED_MESSAGE, [message], null, delayBy);

      // Send status as received
      MessageActions.updateStatus([message.id], message.conversation_id, MessageConstants.statusValue.received);
    });

    // Subscribe for status change
    PrivatePub.subscribe(gupsupChannels.message_status_change, function(messageData, channel) {
      var messages = messageData.data;
          messages.message_ids = $.parseJSON(messages.message_ids);

      // Show messages immediate to other user instead of delaying for author user
      var delayBy = 100;

      setTimeout(function(){
        AppDispatcher.dispatch({
          actionType: MessageConstants.STATUS_CHANGED,
          messageIds: messages.message_ids,
          status: messages.status
        });
      }, delayBy);

    });
  },

  unsubscribeFromChannel: function(){
    PrivatePub.unsubscribe(gupsupChannels.new_message);
    PrivatePub.unsubscribe(gupsupChannels.message_status_change);
  }
}

module.exports = MessageActions;