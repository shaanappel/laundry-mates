Template.home.events({
	"click .login": function(event){
		Router.go('/login');	
	},

	"click .make_order_guest": function(event){	
		Object.keys(Session.keys).forEach(function(key){ Session.set(key, undefined); });
		Session.keys = {};
		Router.go('/orderform');
	},

	"click .check_order": function(event){
		Router.go('/dashboard');	
	},

	"click .make_order": function(event){
		Router.go('/orderform');	
	},

	"click .register": function(event){
		Router.go('/register');	
	}
});

Template.home.helpers({
  loggedIn: function() {
  	user = Meteor.user();
  	if (user) {
  		if (user.profile.role.mate) {
  			Router.go('/dashboard');
  		}
  	}
    return user;
  }
});