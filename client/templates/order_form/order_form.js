Template.orderForm.events({
	"submit .submit_order_form": function(event){
		var first_name = trimInput($('#first_name').val());
		var last_name = trimInput($('#last_name').val());
    	var clothing_type = trimInput($('#clothing_type').val());
    	var gender = trimInput($('#gender').val());
		//insert order here

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