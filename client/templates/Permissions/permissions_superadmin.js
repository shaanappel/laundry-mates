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
  "click .view-all_slots-btn": function(event){
      Router.go("/admin_upcoming_slots")
  }
});