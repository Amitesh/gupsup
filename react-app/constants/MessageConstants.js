'use strict';

var keymirror = require('keymirror');

var MessageConstants = keymirror({
  // Action types
  CREATE_MESSAGE: null,
  RECEIVED_MESSAGE: null,
  STATUS_CHANGED: null
});


/**
 * Message origin type like
 * web => 0, mobile => 1, tablet => 2, ipad => 3, wearable => 4 
 */
MessageConstants.origin = {
  WEB: 0,
  MOBILE: 1,
  TABLET: 2,
  IPAD: 3,
  WEARABLE: 4
};

/**
 * Message status
 * 
 * Status to keep track of message journey - like 
 * sent- reached to server => 0, 
 * received - reached to recipient => 1, 
 * read - read by recipient => 2, 
 * sending - initially => -1
 * 
 */
MessageConstants.status = {
  's--1': 'sending',
  's-0':  'sent',
  's-1':  'received',
  's-2':  'read'
}

// Status for messages read by user
MessageConstants.statusValue ={
  sending: -1,
  sent: 0,
  received: 1,
  read: 2
}

module.exports = MessageConstants;