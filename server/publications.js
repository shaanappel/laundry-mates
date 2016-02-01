Meteor.publish('orders', function() {
  return Posts.find();
});

Meteor.publish('requests', function() {
  return Requests.find();
});