Template.orderForm.events({
	"submit .submit_order_form": function(event){
		var first_name = trimInput($('#first_name').val());
		var last_name = trimInput($('#last_name').val());
    	var clothing_type = trimInput($('#clothing_type').val());
    	var gender = trimInput($('#gender').val());
    	var dorm = trimInput($('#select-a-dorm').val());
      var room_num = trimInput($('#room_num').val());
    	if (Meteor.userId()){
    		var userId = Meteor.userId();

    		Meteor.users.update({_id: userId}, { $set: {
		      'profile.dorm': dorm,
		      'profile.clothing_type': clothing_type,
		      'profile.gender': gender,
          'profile.room_num': room_num,
		    }});
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
      Session.set('order_room_num', room_num);


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

Template.orderForm.helpers({
  storedOrder: function(param) {
  	var session_stored = Session.get(param);
  	var user_param = param.substring(6);

  	if (session_stored) {
  		return session_stored;
  	} else if (Meteor.user()) {
      return Meteor.user().profile[user_param];
  	} else {
  		return null;
  	}
  },

  order_spaced_name: function() {
  	var session_stored = Session.get('order_dorm');

  	if (session_stored) {
  		return session_stored.split('_').join(' ');
  	} else if (Meteor.user()) {
		if (Meteor.user().profile.dorm) {
			return Meteor.user().profile.dorm.split('_').join(' ');
		}
  	} else {
  		return null;
  	}
  }
});

// Trim Helper
var trimInput = function(val){
	if (val) {
		return val.replace(/^\s*|\s*$/g, "");
	}
}