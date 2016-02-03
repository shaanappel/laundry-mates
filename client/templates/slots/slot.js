Template.slot.events({
	"click .sign-up-btn": function(event) {
    if (Meteor.user()){
      var userId = Meteor.userId();
    }

    var mate_id = this.slot_mate;
    var id = this._id;
    Session.set('slot_id', id);

    /*
    Slots.update({_id: id}, { $set: {
    'slot_orders': ary,
    'slot_num_orders': ary.length
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
  	return Meteor.users.findOne({_id:mateId}).profile.first_name;
  },

  isFull: function(num) {
  	var total = Slots.findOne(this._id).slot_total_num_orders;
    var taken = Slots.findOne(this._id).slot_num_orders;
  	return taken >= total;
  },

  userIsParticipant: function() {
    var orders_arry = this.slot_orders;
    var ary_length = orders_arry.length;
    for (var i = 0; i < ary_length; i++) {
        var order = Orders.findOne(orders_arry[i]);
        if (order.order_userId == Meteor.userId()) {
          return true
        }
    }
    return false;
  },

  loggedIn: function() {
    return Meteor.user();
  }
});