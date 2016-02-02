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


Orders.allow({
  insert: function (userId, doc) {
    // the user must be logged in
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // the user must be logged in
    return true;
  },
  remove: function (userId, doc) {
    // the user must be logged in
    return true;
  },
  fetch: ['owner']
});

Slots.allow({
  insert: function (userId, doc) {
    // the user must be logged in
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // the user must be logged in
    return true;
  },
  remove: function (userId, doc) {
    // the user must be logged in
    return true;
  },
  fetch: ['owner']
});

Dorms.allow({
  insert: function (userId, doc) {
    // the user must be logged in
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // the user must be logged in
    return true;
  },
  remove: function (userId, doc) {
    // the user must be logged in
    return true;
  }
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



