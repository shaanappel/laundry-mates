Template.orderList.events({
	"click .back": function(event){
		Router.go('/dashboard');
	}
});

Template.orderList.helpers({
  orders: function() {
    var ary = this.slot_orders;
    return Orders.find({_id: { $in: ary}});
    
  },

  are_orders: function() {
  	var ary = this.slot_orders;
    return Orders.find({_id: { $in: ary}}).fetch();
    
  },

   mate_name: function() {
    var mateId = this.slot_mate
    return Meteor.users.findOne({_id:mateId}).profile.first_name;
  },
});