'use strict';

var assign          = require('object-assign');
var EventEmitter    = require('events').EventEmitter;
var _               = require('lodash');
var AppDispatcher   = require('../dispatcher/AppDispatcher.js');
var StreamConstants = require('../constants/StreamConstants.js');

var streams      = {};
var CHANGE_EVENT = 'change';

// Published the store functionality
var StreamStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the all streams
   * @return {[type]} [description]
   */
  get: function(){
    return streams;
  },

  /**
   * Get streams by given message id
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  getById: function(id){
    return streams[id];
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
StreamStore.dispatchToken = AppDispatcher.register(function(action){

  switch(action.actionType){
    case StreamConstants.FETCH_STREAMS:
      streams = action.streams;
      StreamStore.emitChange();
      break;

    default:
  }
});

module.exports = StreamStore;