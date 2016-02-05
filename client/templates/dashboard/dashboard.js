Template.dashboard.events({
	"click .order": function(event){

		Router.go('/orderform');

	},

  "click .slot": function(event){

    Router.go('/create');

  }
});

Template.dashboard.helpers({
  pending_orders: function() {
    return Orders.find({order_userId: Meteor.userId(), confirmed: false});
    
  },

  are_pending_orders: function() {
    return Orders.find({order_userId: Meteor.userId(), confirmed: false}).fetch();
    
  },

  upcoming_slots: function() {
    return Slots.find({slot_mate: Meteor.userId()});
    
  }
});