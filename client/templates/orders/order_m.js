Template.order_m.events({
	"click .picked-up": function(event) {
    var orderId = this._id;
    Orders.update({_id: orderId}, { $set: {
    'picked_up': true
    }});
  },

  "click .delivered": function(event) {
    var orderId = this._id;
    var order = this;
    Orders.update({_id: orderId}, { $set: {
    'delivered': true
    }});

    var slot_ary_of_orders = Slots.findOne(order.order_slot).slot_orders.slice();
    var index = slot_ary_of_orders.indexOf(orderId);
    if (index > -1) {
      slot_ary_of_orders.splice(index, 1);
    }
    console.log(orderId)
    console.log(slot_ary_of_orders)
    var slot_orders = Orders.find({_id: { $in: slot_ary_of_orders}});
    var all_delivered = true;
    slot_orders.forEach(function(slot_order){
        if(!slot_order.delivered){
          all_delivered = false
        }
    });

    if(all_delivered) {
      Slots.update({_id: order.order_slot}, { $set: {
      'slot_delivered': true
      }});
    }
    console.log(Slots.findOne(order.order_slot).slot_delivered)


    var stripeToken = order.order_payment_token;
    Meteor.call('chargeCard', stripeToken);
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



