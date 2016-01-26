Template.logout.helpers({
  log_you_out: function() {
  	Meteor.logout(function(err){
			if(err){
				FlashMessages.sendError(err.reason);
			} else {
				window.location.replace("http://www.thoughtlounge.org");
			}
		});
  },
});