Template.slot_m.events({
	"click .this-slot-info": function(event) {
    var id = this._id;
		$('#' + id).toggleClass('display-none');
    //$('#' + id).hide();
		console.log('its working');
	}
});

Template.upcomingLoungeH.helpers({
  mate_name: function() {
    var mateId = Slots.findOne(this._id).slot_mate
    return Meteor.users.findOne({_id:hostId}).profile.first_name;
  }
});




