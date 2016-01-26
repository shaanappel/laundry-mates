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
	"click .host": function(event){
		var currentUserId = Meteor.userId();
		Meteor.users.update({_id:Meteor.userId()}, {$set:{"role":"host"}});
	}
});

Template.navbar.events({
	"click .lounger": function(event){
		var currentUserId = Meteor.userId();
		Meteor.users.update({_id:Meteor.userId()}, {$set:{"role":"lounger"}});
	}
});