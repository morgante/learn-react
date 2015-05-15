var React = require('react');

var CommentBox = require('./commentbox');

React.render(
  <CommentBox url="comments.json" />,
  document.getElementById('content')
);

