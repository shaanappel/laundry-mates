Template.slot_info_form.events({
	"submit .update-slot": function(event){
		var id = this._id;


		var time = $('#time' + id).val();
		var date = $('#date' + id).val();
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
		

		Slots.update({_id: id}, { $set: {
		"slot_dorm": $('#dorm'+id).val().split(' ').join('_'),
		"slot_total_num_orders": parseInt($('#number-of-orders'+id).val()),
		"slot_date": full_date,
		"slot_day": weekday[full_date.getDay()],
		"slot_time": convertTimeAMPM(time),
		"slot_date_numbers": date_numbers,
		"slot_date_raw": date,
		"slot_time_raw": time
		}} );
		console.log('slot updated')
		location.reload();
		return false;
	},

	"click .delete-btn-1": function(event){
		var new_participant_array = this.lounge_participants;
		var participant = this.lounge_participants[1];
		var index = new_participant_array.indexOf(participant);
		new_participant_array = _.without(new_participant_array, participant);
		var new_name_array = this.lounge_participants_names;
		new_name_array.splice(index,1);
		console.log(index)
		console.log(new_participant_array)
		console.log(new_name_array)
		console.log(1)
		Lounges.update({_id: this._id}, { $set: {
		'lounge_participants': new_participant_array,
		'lounge_num_participants': new_participant_array.length,
		'lounge_participants_names': new_name_array
		}} );
	},

	"click .cancel-lounge-button": function(event){
		var slotId = this._id;
		var slot = this;
		var x = window.confirm("Are you sure you want to delete this Slot?");
		if (x) {
			var ordersToRemove = slot.slot_orders;
			var arrayLength = ordersToRemove.length;
			for (var i = 0; i < arrayLength; i++) {
			    Orders.remove({_id: ordersToRemove[i]});
			}
			Slots.remove({_id: slotId});
		}
	}
});





