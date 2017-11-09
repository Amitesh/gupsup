'use strict';

var React            = require('react');
var MessageConstants = require('../constants/MessageConstants.js');

var myMessage = function(msgObj){
  var status = MessageConstants.status[ 's-' + msgObj.status ];
  return (
    <div className="media me">
      <div className="media-body">
        <div className="content">{msgObj.content}</div>
        <div className="info-bar">
          <time title={msgObj.sentAt.format('dddd, MMMM Do YYYY, h:mm:ss a')}>{msgObj.sentAt.fromNow()}</time>
          <span className={status}>
            <img className={'animated animation-' + status} src={'/images/' + status + '.jpg'} />
          </span>
        </div>
      </div>
      <div className="media-right">
          <img className="media-object" src={msgObj.avatar} alt={msgObj.name} />
      </div>
    </div>    
  );
};

var otherMessage = function(msgObj){
  return (
    <div className="media">
      <div className="media-left">
          <img className="media-object" src={msgObj.avatar} alt={msgObj.name} />
      </div>
      <div className="media-body">
        <div className="content">{msgObj.content}</div>
        <div className="info-bar">
          <span className="name">{msgObj.name}</span>
          <span className="name-time-sep">•</span>
          <time title={msgObj.sentAt.format('dddd, MMMM Do YYYY, h:mm:ss a')}>{msgObj.sentAt.fromNow()}</time>
        </div>
      </div>
    </div> 
  )
};

var Message = React.createClass({
    render: function(){
      var msgObj = this.props.msg;
      return (
        <div className="message">
            { msgObj.mine ? myMessage(msgObj) : otherMessage((msgObj)) }
        </div>
      );
    }
});

module.exports = Message;

