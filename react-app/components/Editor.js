'use strict';

var React = require('react');
var _     = require('lodash');

var MessageActions = require('../actions/MessageActions.js');
var MessageStore   = require('../stores/MessageStore.js');

var Editor = React.createClass({
  onChange: function(event){
    this.setState({message: event.target.value});
  },

  onSend: function(event){
    var message = this.state.message;
    if(!_.isEmpty(message)){
      var conversationId = MessageStore.getConversationId();

      MessageActions.create({
        content: message
      }, conversationId);

      this.setState({message: ''});
      this.composer.getDOMNode().focus();
    }
  },

  onKeyDown: function(event){
    if (event.keyCode === 13) {
      event.preventDefault();
      this.onSend(event);
    }
  },

  getInitialState: function(){
    return {
      message: ''
    }
  },

  componentDidMount: function() {
    this.composer.getDOMNode().focus();
  },

  componentDidUpdate: function(){
    if(MessageStore.getConversationId()){
      $(this.composer.getDOMNode()).attr('readonly', false);
      this.composer.getDOMNode().focus();
    }else{
      $(this.composer.getDOMNode()).attr('readonly', true);
    }
  },

  render: function(){
    return (
      <div className={MessageStore.getConversationId() ? "editor" : "editor hide"}>
        <div className="input-group">
          {/* message compose box */}
          <input type="text" className="form-control message-edit-box" 
            placeholder="Enter message..."
            value={this.state.message}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            autofocus={true}
            ref={(input) => this.composer = input} />

          {/* Message send button */}
          <span className="input-group-btn">
            <button type="button"
              className="btn btn-default glyphicon glyphicon-send send-btn"  
              aria-hidden="true" 
              onClick={this.onSend} >
            </button>
          </span>
        </div>
      </div>
    );
  }
});

module.exports = Editor;

