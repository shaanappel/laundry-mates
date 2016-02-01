Template.host_request_superadmin.helpers({
  pending_host_requests: function() {
    return Requests.find({"type": 'host', "request_approved": "false", "request_chapter": this.name});
  },
  approved_host_requests: function() {
    return Requests.find({"type": 'host', "request_approved": "true", "request_chapter": this.name});
  },
  are_pending_host_requests: function() {
    return Requests.find({"type": 'host', "request_approved": "false", "request_chapter": this.name}).fetch();
  },
  are_approved_host_requests: function() {
    return Requests.find({"type": 'host', "request_approved": "true", "request_chapter": this.name}).fetch();
  }
});