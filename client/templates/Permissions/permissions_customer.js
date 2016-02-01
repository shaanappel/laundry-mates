Template.permissions_customer.events({
	"click .request-btn": function(event) {
		$('.update-info').toggleClass('display-none');
		console.log('its working')
	}
});

Template.permissions_customer.helpers({  
  statusIs: function(status) {
    return Meteor.user().profile.request_status.mate == status;
  }
});