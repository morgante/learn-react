var React = require('react');

var CommentBox = require('./commentbox');

var data = [
  {author: "Peta!", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

React.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);

