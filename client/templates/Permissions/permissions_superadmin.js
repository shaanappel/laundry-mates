Template.permissions_superadmin.helpers({
  pending_mate_requests: function() {
    return Requests.find({"type": 'mate', "request_approved": "false"});
  },
  approved_mate_requests: function() {
    return Requests.find({"type": 'mate', "request_approved": "true"});
  },
  are_pending_mate_requests: function() {
    return Requests.find({"type": 'mate', "request_approved": "false"}).fetch();
  },
  are_approved_mate_requests: function() {
    return Requests.find({"type": 'mate', "request_approved": "true"}).fetch();
  }
});

Template.permissions_superadmin.events({
  "click .view-loungers-btn": function(event){
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
    json_pre += '{"Name":"Name","email":"email","phone":"phone","TL_Monthly_Newsletter":"TL_Monthly_Newsletter","Chapter_Monthly_Newsletter":"Chapter_Monthly_Newsletter","Chapter_Weekly_Newsletter":"Chapter_Weekly_Newsletter","Primary_chapter":"Primary_chapter"},';
    

    data = Meteor.users.find();
    data.forEach(function(user) {
      console.log(user.profile.first_name)
      json_pre += '{"Name":"'+user.profile.first_name+' '+user.profile.last_name+
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
        json_pre += '","Primary_chapter":"'+ user.profile.primary_chapter +'"},';
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
  }
});