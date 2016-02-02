Template.orderForm.events({
	"submit .submit_order_form": function(event){
		var first_name = trimInput($('#first_name').val());
		var last_name = trimInput($('#last_name').val());
    	var clothing_type = trimInput($('#clothing_type').val());
    	var gender = trimInput($('#gender').val());
    	var dorm = trimInput($('#select-a-dorm').val());
    	if (Meteor.userId()){
    		var userId = Meteor.userId();
    	} else {
    		var userId = "guest";
    	}

    	Session.set('order_dorm', dorm);
    	Session.set('dorm', dorm);
    	Session.set('order_userId', userId);
    	Session.set('order_first_name', first_name);
    	Session.set('order_last_name', last_name);
    	Session.set('order_clothing_type', clothing_type);
    	Session.set('order_gender', gender);


		/*//insert order here
		Orders.insert({
			order_dorm: dorm,
			order_userId: userId,
	    	order_first_name: first_name,
	    	order_last_name: last_name,
	    	order_clothing_type: clothing_type,
	    	order_gender: gender
		});
		console.log('inserted')
		*/


		Router.go('/schedule');

		return false;
	}
});

// Trim Helper
var trimInput = function(val){
	if (val) {
		return val.replace(/^\s*|\s*$/g, "");
	}
}