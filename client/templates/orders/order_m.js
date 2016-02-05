Template.order_m.events({
	"click .sign-up-btn": function(event) {
    if (Meteor.user()){
      var userId = Meteor.userId();
    }

    var mate_id = this.slot_mate;
    var id = this._id;
    var ary = Slots.findOne(id).slot_orders;
    ary[ary.length] = Meteor.userId();
    Session.set('slot_id', id);
    Session.set('slot_orders', ary);
    Session.set('slot_num_orders', ary.length);

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

Template.order_m.helpers({
  mate_name: function() {
  	var mateId = Slots.findOne(this.order_slot).slot_mate
  	return Meteor.users.findOne({_id:mateId}).profile.first_name;
  },

  order_status: function() {
    order = this;
    if (order.picked_up) {
      if (order.delivered) {
        return "Status: Your have deliverd the order";
      }
      return "Status: You have picked up the laundry";
    }
    return "Status: Laundry with customer."
  }

});



