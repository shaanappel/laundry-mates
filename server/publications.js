Meteor.publish('orders', function() {
  return Posts.find();
});
