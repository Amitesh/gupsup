'use strict';

var React               = require('react');
var _                   = require('lodash');
var StreamStore         = require('../stores/StreamStore.js');
var StreamActions       = require('../actions/StreamActions.js');
var ConversationActions = require('../actions/ConversationActions.js');

var Streams = React.createClass({
  onDataChange: function(){
    var buddyList = StreamStore.get();

    this.setState({
      streams: buddyList
    });
  },

  startConversation: function(event){
    event.preventDefault();
    
    var streamElem  = event.currentTarget;
    var recipientId = $(streamElem).data('recipient-id');
    var senderId    = current_user.id;

    //No need to fetch conversations for current active stream on again click
    if(recipientId != this.state.activeStreamId){
      this.setState({
        activeStreamId: recipientId
      });
      ConversationActions.fetch(senderId, recipientId);
    }
  },

  componentDidMount: function(){
    StreamStore.addChangeListener(this.onDataChange);
    StreamActions.fetch();
    StreamActions.subscribeToChannel();
  },

  componentDidUpdate: function(prevProps, prevState){
    /**
     * Trigger the click on the first stream to load the 
     * conversation on first time load of streams.
     */
    if(_.isNull(this.state.activeStreamId)){
      $('.streams .list-group .stream:first').triggerDomEvent('click');
    }
  },

  componentWillUnmount: function() {
    StreamStore.removeChangeListener(this.onDataChange);
    StreamActions.unsubscribeFromChannel();
  },

  getInitialState: function(){
    return {
      streams: [],
      activeStreamId: null
    }
  },
  render: function(){
    return (
      <div className="streams">
        <div className="list-group">
          { 
            this.state.streams.length > 0 ? 
              this.state.streams.map((s, i) => {
                // TODO: need to get it in real time using from server within data
                var count       = _.random(5);
                var unreadBadge = '';

                if(count > 0){
                  unreadBadge = <span className="badge">{count}</span>
                }

                return <a href="#" className={'list-group-item stream clearfix ' + (this.state.activeStreamId == s.id ? 'active' : '')} 
                    title={s.name} 
                    key={s.id}
                    data-recipient-id={s.id}
                    onClick={this.startConversation} 
                  >
                  
                  <div className="pull-left details">
                    <img src={s.avatar} />
                    <span className="name">{s.name}</span>
                  </div>
                  {unreadBadge}
                </a>
              }) :
              <div className="list-group-item">
                <span className="dimmed"> No user joined yet :(</span>
              </div>
          }
        </div>
      </div>
    );
  }
});

module.exports = Streams;

