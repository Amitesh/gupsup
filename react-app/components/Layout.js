'use strict';

var React        = require('react');
var Streams      = require('../components/Streams.js');
var Conversation = require('../components/Conversation.js');


var Layout = React.createClass({
    render: function(){
      return (
        <div className="container-fluid chat-box">
          <div className="row">
            <div className="col-md-5">
              <Streams/>
            </div>
            <div className="col-md-7">
              <Conversation/>
            </div>
          </div>
        </div>
      );
    }
});

module.exports = Layout;