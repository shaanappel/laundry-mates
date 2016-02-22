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

Meteor.publish('mates', function() {
  return Meteor.users.find({'profile.role.mate': true});
});

//{'profile.role.mate': true}