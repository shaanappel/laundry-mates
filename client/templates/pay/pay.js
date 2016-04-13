Template.pay.events({

    "submit .woot": function(event){
        var slot_id = Session.get('slot_id');

        order_id = Orders.insert({
            order_dorm: Session.get('order_dorm'),
            order_userId: Session.get('order_userId'),
            order_first_name: Session.get('order_first_name'),
            order_last_name: Session.get('order_last_name'),
            //order_clothing_type: Session.get('order_clothing_type'),
            //order_gender: Session.get('order_gender'),
            order_room_num: Session.get('order_room_num'),
            order_slot: slot_id,
            picked_up: false,
            delivered: false,
            confirmed: false
        });


        ccNum = $('#ccnum').val();
        cvc = $('#cvc').val();
        expMo = $('#exp-month').val();
        expYr = $('#exp-year').val();

        Stripe.card.createToken({
            number: ccNum,
            cvc: cvc,
            exp_month: expMo,
            exp_year: expYr,
        }, function(status, response) {
            stripeToken = response.id;
            console.log(stripeToken);
            Orders.update({_id: order_id}, { $set: {
              'order_payment_token': stripeToken
            }});
            console.log(order_id);
        });


        var ary = Slots.findOne(slot_id).slot_orders;
        ary[ary.length] = order_id;

        Slots.update({_id: slot_id}, { $set: {
          'slot_orders': ary,
          'slot_num_orders': ary.length
        }});

        Router.go('/dashboard');

        console.log('inserted')


        return false;
    }
});

