Requests.allow({
  insert: function (userId, doc) {
    // the user must be logged in
    return (userId);
  },
  update: function (userId, doc, fields, modifier) {
    // the user must be logged in
    return (userId);
  },
  remove: function (userId, doc) {
    // the user must be logged in
    return (userId);
  },
  fetch: ['owner']
});

Meteor.users.allow({
 insert: function (userId, doc) {
    // the user must be logged in
    return (userId);
  },
  update: function (userId, doc, fields, modifier) {
    // the user must be logged in
    return (userId);
  }
});



