Template.create.events({
	"click .cancel-create-button": function(event) {
		$('.create-template').addClass('display-none');
		console.log('cancel is working')
	},

	"submit .create-form": function(event){

		var time = $('#time').val();
		var date = $('#date').val();
		var split_date = date.split('-');
		var split_time = time.split(':');
		var year = split_date[0];
		var month = split_date[1]-1;
		var date1 = split_date[2];
		var hours = split_time[0];
		var minutes = split_time[1];
	    var full_date = new Date(year, month, date1, hours, minutes);
	    console.log(full_date)


		function convertTimeAMPM(time){
			//var time = "12:23";
			var time = time.split(':');
			var hours = time[0];
			var minutes = time[1];
			console.log(minutes)
			var timeValue = "" + ((hours < 10) ? hours.split("")[1] : ((hours >12) ? hours -12 :hours));
			    timeValue += ":" + minutes;
			    timeValue += (hours >= 12) ? " P.M." : " A.M.";
			return timeValue;
		}
		
		var weekday = new Array(7);
		weekday[0] =  "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";

		var date_numbers = (full_date.getMonth() + 1) + "/" + full_date.getDate() + "/" + full_date.getFullYear();
		var slot_orders = [];

		Slots.insert({

		slot_mate: Meteor.userId(),
		slot_dorm: $('#select-a-dorm').val().split(' ').join('_'),
		slot_total_num_orders: parseInt($('#number-of-orders').val()),
		slot_date: full_date,
		slot_day: weekday[full_date.getDay()],
		slot_time: convertTimeAMPM(time),
		slot_date_numbers: date_numbers,
		slot_orders: slot_orders,
		slot_num_orders: slot_orders.length,
		slot_date_raw: date,
		slot_time_raw: time
		});

		Router.go('/dashboard');

		return false;
	}
});

