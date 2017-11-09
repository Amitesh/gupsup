'use strict';

var assign           = require('object-assign');
var EventEmitter     = require('events').EventEmitter;
var _                = require('lodash');
var moment           = require('../get-moment.js');
var AppDispatcher    = require('../dispatcher/AppDispatcher.js');
var MessageConstants = require('../constants/MessageConstants.js');

var messages     = {};
var conversation = {};

var CHANGE_EVENT = 'change';

/**
 * Add some sugar to the message object
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
var decorateMessage = (msg) => {
  if(_.isString(msg.sent_at)){
    // Set as moment object
    msg.sentAt = moment(msg.sent_at);
  }

  if(current_user && current_user.id && msg.sender_id ){
    msg.mine = current_user.id == msg.sender_id;
  }else{
    console.error('Please sign in to start gupsup!');
  }
  return msg;
}


var makeMessageKey = function(id){
  return 'msg' + id;
};

/**
 * Add message to storage and run decorator tasks on it.
 * @param {[type]} msg [description]
 */
var addToMessage = (msg) => {
  messages[makeMessageKey(msg.id)] = decorateMessage(msg);
};

var removeFromMessage = function(id){
  if(!_.isEmpty(id)){
    messages = _.omit(messages, makeMessageKey(id));
  }
};

var clearMessages = () => {messages = {}};

var isCurrentConversation = function(cId){
  return conversation && conversation.id == cId;
}

/**
 * Get messages by given message id
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
var getById = function(id){
  return messages[makeMessageKey(id)];
}

var updateMessage = function(id, m){
  messages[makeMessageKey(id)] = m;
}


// Published the store functionality
var MessageStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the all messages
   * @return {[type]} [description]
   */
  get: function(){
    return messages;
  },

  getSorted: function(){
    var unsorted = _.values(messages);

    function compare(a, b) {
      var diff = a.sentAt.diff(b.sentAt);
      return diff < 0 ? -1 : (diff > 0 ? 1 : 0);
    }

    var sorted = unsorted.sort(compare);
    
    clearMessages()

    _.forEach(sorted, function(o){
      addToMessage(o);
    });
    return messages;
  },

  getConversationId: function(){
    return conversation && conversation.id;
  },

  /**
   * Tell everyone that message store value changed
   * @return {[type]} [description]
   */
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * Register to listen the change event
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove the change event listener 
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Subscribe to listen the actions
MessageStore.dispatchToken = AppDispatcher.register(function(action){

  switch(action.actionType){
    case MessageConstants.CREATE_MESSAGE:
      removeFromMessage(action.unsavedMessageId);
      addToMessage(action.message);
      MessageStore.emitChange();
      break;

    /**
     * Load all messages from a conversation
     * NOTE : It will clear the messages from storage and load with current
     */
    case MessageConstants.MESSAGE_LOAD:
      // Remove all messages of previous conversation from `messages`
      clearMessages();

      _.forEach(action.messages, function(message){
        addToMessage(message);
      });
      
      conversation = action.conversation;
      MessageStore.emitChange();
      break;

    /**
     * Load a new messages
     *
     */
    case MessageConstants.RECEIVED_MESSAGE:
      var message;
      for(var i = 0, len = action.message.length; i < len; i++){
        message = action.message[i]
        if(isCurrentConversation(message.conversation.id)){
          addToMessage(action.message[i]);
        }else{
          // TODO : Notify new message in a stream/conversation
          // For now leaving this implementation for future.
          // 
          // Check :
          // - It it for me else ignore. Check by conversation.id
          // - Notify the stream store to increase the unread count for the given conversation.id
        }
      }
      MessageStore.emitChange();
      break;

    case MessageConstants.STATUS_CHANGED:
      var status = action.status;

      for(var i = 0, len = action.messageIds.length; i < len; i++){
        var messageId = action.messageIds[i];
        var msg  = getById(messageId) || {};
        if(msg){
          msg.status = status;
          updateMessage(messageId, msg);
        }
      }
      
      MessageStore.emitChange();
      break;

    default:
  }
});

module.exports = MessageStore;