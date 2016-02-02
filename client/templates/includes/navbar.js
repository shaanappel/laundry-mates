Template.navbar.events({
	"click .logout-btn": function(event){
		Meteor.logout(function(err){
			if(err){
				FlashMessages.sendError(err.reason);
			} else {
				Router.go('/');
			}
		});
	}
});

Template.navbar.events({
	"click .order": function(event){

		Router.go('/orderform');

	}
});

Template.navbar.helpers({
  loggedIn: function() {
  	return Meteor.user();
  }
});