Template.slot_m.events({
	"click .this-slot-info": function(event) {
    var id = this._id;
		$('#' + id).toggleClass('display-none');
    //$('#' + id).hide();
		console.log('its working');
	},

  "click .orders_list": function(event) {
    var route = '/orderlist/'+this._id
    Router.go(route);
  }

});

Template.slot_m.helpers({
  mate_name: function() {
    var mateId = Slots.findOne(this._id).slot_mate;
    return Meteor.users.findOne({_id:mateId}).profile.first_name;
  }
});



