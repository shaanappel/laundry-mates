Meteor.publish('orders', function() {
  return Orders.find();
});

Meteor.publish('requests', function() {
  return Requests.find();
});

Meteor.publish('slots', function() {
  return Slots.find();
});

Meteor.publish('dorms', function() {
  return Dorms.find();
});