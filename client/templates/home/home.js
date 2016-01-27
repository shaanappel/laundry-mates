Template.home.events({
	"click .login": function(event){
		Router.go('/login');	
	},

	"click .make_order": function(event){
		Router.go('/orderform');	
	},

	"click .register": function(event){
		Router.go('/register');	
	}
});