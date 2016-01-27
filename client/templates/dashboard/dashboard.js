Template.dashboard.events({
	"click .order": function(event){

		Router.go('/orderform');

	}
});

Template.dashboard.helpers({
  pending_orders: function() {
    return Orders.find({userId: Meteor.userId(), completed: false});
    
  },

  are_pending_orders: function() {
  	//var dorm = Session.get('dorm');
    //return Slots.find({dorm: dorm});

    return false
    
  }
});