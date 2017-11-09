'use strict';

var React   = require('react');
var Layout  = require('./components/Layout.js');

// If user is login then only add react app
if(current_user.id){
  /** @jsx React.DOM */
  React.render(
      <Layout />,
      document.getElementById('gupsup-react-app')
  );
}