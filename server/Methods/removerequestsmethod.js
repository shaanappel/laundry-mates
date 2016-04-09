Meteor.startup(function() {

    return Meteor.methods({

      removeAllDorms: function() {

        return Dorms.remove({});

      },
      
      removeAllLounges: function() {

        return;

      }

    });

  });
  
