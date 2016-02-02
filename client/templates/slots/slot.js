Template.slot.events({
	"click .sign-up-btn": function(event) {
    if (Meteor.user()){
      var userId = Meteor.userId();
    }

    var mate_id = this.slot_mate;
    var id = this._id;
    var ary = Slots.findOne(id).slot_customers;
    ary[ary.length] = Meteor.userId();
    Session.set('slot_id', id);
    Session.set('slot_customers', ary);
    Session.set('slot_num_customers', ary.length);

    /*
    Slots.update({_id: id}, { $set: {
    'slot_customers': ary,
    'slot_num_customers': ary.length
    }});
    */

    Router.go('/pay');

    //add mail thing here to send confirmartion email to this users email about Lounge by this._id
    //Meteor.user().profile.first_name
    //Meteor.user().emails[0].address

    console.log('its working');
  }

});

Template.slot.helpers({
  mate_name: function() {
  	var mateId = Slots.findOne(this._id).slot_mate
  	return Meteor.users.findOne({_id:hostId}).profile.first_name;
  },

  spots_left: function() {
  	var total = Slots.findOne(this._id).slot_total_num_customers;
  	var taken = Slots.findOne(this._id).slot_num_customers;

  	return total - taken;
  },

  isFull: function(num) {
  	var total = Slots.findOne(this._id).slot_total_num_customers;
    var taken = Slots.findOne(this._id).slot_num_customers;
  	return taken >= total;
  },

  userIsParticipant: function() {
    return Slots.find({_id : this._id, slot_customers: Meteor.userId()}).fetch();
  },

  loggedIn: function() {
    return Meteor.user();
  }
});