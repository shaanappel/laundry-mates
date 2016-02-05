Template.pay.events({
	"click .pay": function(event){
    var slot_id = Session.get('slot_id');

    order_id = Orders.insert({
        order_dorm: Session.get('order_dorm'),
        order_userId: Session.get('order_userId'),
        order_first_name: Session.get('order_first_name'),
        order_last_name: Session.get('order_last_name'),
        order_clothing_type: Session.get('order_clothing_type'),
        order_gender: Session.get('order_gender'),
        order_room_num: Session.get('order_room_num'),
        order_slot: slot_id,
        picked_up: false,
        delivered: false
    });

    var ary = Slots.findOne(slot_id).slot_orders;
    ary[ary.length] = order_id;

    Slots.update({_id: slot_id}, { $set: {
      'slot_orders': ary,
      'slot_num_orders': ary.length
    }});

    Router.go('/dashboard');

    console.log('inserted')

	}
});
