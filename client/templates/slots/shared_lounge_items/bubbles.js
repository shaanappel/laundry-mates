Template.bubbles.helpers({
  spots_left: function() {
    slot = this;
  	var total = Slots.findOne(slot._id).slot_total_num_orders;
  	var taken = Slots.findOne(slot._id).slot_num_orders;
  	var left = total - taken;
  	if (left == 1) {
  		return "1 spot left";
  	} else {
  		return ""+left+" spots left";
  	}
  },

  takenGt: function(num) {
  	var taken = Slots.findOne(this._id).slot_num_orders;
  	return taken > num;
  },

  orderList: function(num) {
    var orders = Slots.findOne(this._id).slot_orders;
    var arrayLength = orders.length;
    for (var i = 0; i < arrayLength; i++) {
        orderId = orders[i];
        orders[i] = Orders.findOne(orderId);
    }
    return orders;
  },

  dots: function(num) {

    slot = this;
    var total = Slots.findOne(slot._id).slot_total_num_orders;
    var taken = Slots.findOne(slot._id).slot_num_orders;
    var left = total - taken;
    return _.map(_.range(0, left), function(idx) {
      return;
    });
  }
});