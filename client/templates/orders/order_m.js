Template.order_m.events({
	"click .picked-up": function(event) {
    var orderId = this._id;
    Orders.update({_id: orderId}, { $set: {
    'picked_up': true
    }});
  },

  "click .delivered": function(event) {
    var orderId = this._id;
    Orders.update({_id: orderId}, { $set: {
    'delivered': true
    }});
  }

});

Template.order_m.helpers({
  mate_name: function() {
  	var mateId = Slots.findOne(this.order_slot).slot_mate
  	return Meteor.users.findOne({_id:mateId}).profile.first_name;
  },

  customer_name: function() {
    var order = this;
    return order.order_first_name;
  },

  order_status: function() {
    var order = this;
    if (order.picked_up) {
      if (order.delivered) {
        if (order.confirmed) {
          return "Status: Delivery has been confirmed! Well done!"
        }
        return "Status: Your have delivered the order";
      }
      return "Status: You have picked up the laundry";
    }
    return "Status: Laundry with customer."
  }

});



