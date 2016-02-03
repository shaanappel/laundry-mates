Template.orderList.events({
	"click .back": function(event){
		Router.go('/dashboard');
	}
});

Template.orderList.helpers({
  order: function() {
    var dorm = Session.get('dorm');
    return Slots.find({slot_dorm: dorm});
    
  },

  are_orders: function() {
  	var dorm = Session.get('dorm');
    return Slots.find({slot_dorm: dorm}).fetch();
    
  }
});