Template.permissions.helpers({  
  isMate: function() {
    return Meteor.user().profile.role.mate;
  }
});