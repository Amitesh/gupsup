'use strict';

var React            = require('react');
var _                = require('lodash');
var Message          = require('../components/Message.js');
var Editor           = require('../components/Editor.js');
var MessageStore     = require('../stores/MessageStore.js');
var MessageActions   = require('../actions/MessageActions.js');
var MessageConstants = require('../constants/MessageConstants.js');

var firstScrollTime = 2000;

var Conversation = React.createClass({
    statics: {
      filterUnReadMessages: function(messages){
        return _.collect(_.filter(messages, function(message, key){
          return message.isDraft != true && message.sender_id != current_user.id &&
              message.status != MessageConstants.statusValue.read;
        }), 'id' );
      }
    },

    scrollToBottom: function(scrollTime){
      scrollTime = (scrollTime === undefined) ? 300 : scrollTime;
      //Scroll to the latest message
      var chatBox = $(this.chatBox.getDOMNode());

      // Give a breathing space to finish other rendering.
      // Just to smooth the scroll
      setTimeout(function(){
        if(scrollTime){
          chatBox.animate({ scrollTop: chatBox[0].scrollHeight}, scrollTime); 
        }else{
          chatBox.scrollTop(chatBox[0].scrollHeight);
        }  
      }, 100);
    },
    
    onDataChange: function(){
      this.setState({
        messages: MessageStore.getSorted()
      });
    },

    getInitialState: function(){
      return {
        messages: {}
      }
    },

    componentDidMount: function(){
      MessageStore.addChangeListener(this.onDataChange);
      MessageActions.subscribeToChannel();
    },

    componentDidUpdate: function(){
      this.scrollToBottom(firstScrollTime);
      firstScrollTime = 300;
      var unReadMessages = Conversation.filterUnReadMessages(this.state.messages);
      MessageActions.updateStatus(unReadMessages, MessageStore.getConversationId(), 
        MessageConstants.statusValue.read);
    },

    componentWillUnmount: function() {
      MessageStore.removeChangeListener(this.onDataChange);
      MessageActions.unsubscribeFromChannel();
    },

    render: function(){
      var messages = _.map(this.state.messages, ((message, i) => {
                      return <Message msg={message} key={i} />
                    }));
              
      return (
        <div className="conversation">
            <div className="messages" 
              ref={(el) => this.chatBox = el}>
              {messages}
            </div>
            <Editor />
        </div>
      );
    }
});

module.exports = Conversation;