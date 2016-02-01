Template.permissions_admin.helpers({
  pending_host_requests: function() {
    return Requests.find({"type": 'host', "request_approved": "false", "request_chapter": Meteor.user().profile.primary_chapter});
  },
  approved_host_requests: function() {
    return Requests.find({"type": 'host', "request_approved": "true", "request_chapter": Meteor.user().profile.primary_chapter});
  },
  are_pending_host_requests: function() {
    return Requests.find({"type": 'host', "request_approved": "false", "request_chapter": Meteor.user().profile.primary_chapter}).fetch();
  },
  are_approved_host_requests: function() {
    return Requests.find({"type": 'host', "request_approved": "true", "request_chapter": Meteor.user().profile.primary_chapter}).fetch();
  },
  statusIs: function(status) {
  	var chapter = Meteor.user().profile.primary_chapter
    return Meteor.user().profile.request_status[chapter] === status;
  }
});

Template.permissions_admin.events({
	"click .request-btn": function(event) {
		var prof = Meteor.user().profile;
    var userId = Meteor.userId();

		var chapter = prof.primary_chapter;
		var updated_request_status = Meteor.user().profile.request_status;
		updated_request_status[chapter] = "processing";
		Meteor.users.update( { _id: userId }, { $set: { 'profile.request_status': updated_request_status}});


		Requests.insert({
		type: 'superadmin',
		request_userId: userId,
    	request_chapter: chapter,
    	request_first_name: prof.first_name,
    	request_last_name: prof.last_name,
    	request_email: Meteor.user().emails[0].address,
    	request_picture: 'somefile',
    	request_phone: prof.phone,
    	request_bio: prof.bio,
    	request_approved: "false"
		});

		location.reload();
	},

  "click .CHAPTERNAME-loungers-list": function(event){
    JSON2CSV = function JSON2CSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var line = '';

        if ($("#labels").is(':checked')) {
            var head = array[0];
            if ($("#quote").is(':checked')) {
                for (var index in array[0]) {
                    var value = index + "";
                    line += '"' + value.replace(/"/g, '""') + '",';
                }
            } else {
                for (var index in array[0]) {
                    line += index + ',';
                }
            }

            line = line.slice(0, -1);
            str += line + '\r\n';
        }

        for (var i = 0; i < array.length; i++) {
            var line = '';

            if ($("#quote").is(':checked')) {
                for (var index in array[i]) {
                    var value = array[i][index] + "";
                    line += '"' + value.replace(/"/g, '""') + '",';
                }
            } else {
                for (var index in array[i]) {
                    line += array[i][index] + ',';
                }
            }

            line = line.slice(0, -1);
            str += line + '\r\n';
        }
        return str;
    }

    console.log('loungers button clicked')
    var json_pre = '[';
    json_pre += '{"Name":"Name","email":"email","phone":"phone","TL_Monthly_Newsletter":"TL_Monthly_Newsletter","Chapter_Monthly_Newsletter":"Chapter_Monthly_Newsletter","Chapter_Weekly_Newsletter":"Chapter_Weekly_Newsletter","Primary_chapter":"Primary_chapter","Role":"Role"},';
    
    var chapter = Meteor.user().profile.primary_chapter
    
    data = Meteor.users.find({'profile.primary_chapter': chapter});
    if (data.fetch()){
      data.forEach(function(user) {
        console.log(user.profile.first_name)
        var role = user.profile.role[chapter];
        if (role) {
          role = role;
        } else {
          role = 'lounger';
        }

        json_pre += '{"Name":"'+user.profile.first_name.replace(/['"]+/g, '')+' '+user.profile.last_name.replace(/['"]+/g, '')+
                    '","email":"'+user.emails[0].address;
        if (user.profile.phone) {
          json_pre += '","phone":"'+user.profile.phone;
        } else {
          json_pre += '","phone":"'+'N/A';
        }
        if (user.profile.notifications) {
            if (user.profile.notifications.tl_monthly_letter) {
              json_pre += '","TL_Monthly_Newsletter":"'+user.profile.notifications.tl_monthly_letter;
            } else {
              json_pre += '","TL_Monthly_Newsletter":"'+'N/A';
            }
            if (user.profile.notifications.chapter_monthly_letters) {
              json_pre += '","Chapter_Monthly_Newsletter":"'+user.profile.notifications.chapter_monthly_letters.toString();
            } else {
              json_pre += '","Chapter_Monthly_Newsletter":"'+'None';
            }
            if (user.profile.notifications.chapter_weekly_letters) {
              json_pre += '","Chapter_Weekly_Newsletter":"'+user.profile.notifications.chapter_weekly_letters.toString();
            } else {
              json_pre += '","Chapter_Weekly_Newsletter":"'+'None';
            }
          } else {
            json_pre += '","TL_Monthly_Newsletter":"'+'N/A';
            json_pre += '","Chapter_Monthly_Newsletter":"'+'None';
            json_pre += '","Chapter_Weekly_Newsletter":"'+'None';
          }            
          json_pre += '","Primary_chapter":"'+ user.profile.primary_chapter +
                      '","Role":"'+ role +'"},';
      });

      json_pre = json_pre.slice(0, -1);
      json_pre += ']'
      console.log(json_pre)
      var json = $.parseJSON(json_pre);

      var csv = JSON2CSV(json);
      var downloadLink = document.createElement("a");
      var blob = new Blob(["\ufeff", csv]);
      var url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = "data.csv";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.log('no loungers for this chapter');
    }
  }
});