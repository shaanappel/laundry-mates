Template.slot_m.events({
	"click .this-slot-info": function(event) {
    var id = this._id;
		$('#' + id).toggleClass('display-none');
    //$('#' + id).hide();
		console.log('its working');
	},

  "click .orders_list": function(event) {
    Session.set('current_slot', this);
    Router.go('/orderlist');
  }

});

Template.slot_m.helpers({
  mate_name: function() {
    var mateId = Slots.findOne(this._id).slot_mate;
    return Meteor.users.findOne({_id:mateId}).profile.first_name;
  }
});



