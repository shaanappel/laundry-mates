Template.schedule.events({
	"click .back": function(event){
		Router.go('/orderform');

	}
});

Template.schedule.helpers({
  time_slots: function() {
    var dorm = Session.get('dorm');
    var gender = Session.get('order_gender');
    if (gender == "male" || gender == "female") {
      return Slots.find({slot_dorm: dorm, slot_gender: gender});
    } else {
      return Slots.find({slot_dorm: dorm});
    }
    
  },

  are_time_slots: function() {
  	var dorm = Session.get('dorm');
    return Slots.find({slot_dorm: dorm}).fetch();
    
  }
});