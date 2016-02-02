Template.pay.events({
	"click .pay": function(event){
    Orders.insert({
      order_dorm: Session.get('order_dorm'),
      order_userId: Session.get('order_userId'),
      order_first_name: Session.get('order_first_name'),
      order_last_name: Session.get('order_last_name'),
      order_clothing_type: Session.get('order_clothing_type'),
      order_gender: Session.get('order_gender')
    });

    

    console.log('inserted')

	}
});
