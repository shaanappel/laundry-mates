Meteor.methods({

  stripeCreateCustomer: function(token, email){
    check([token, email], [Match.Any]);

    var stripeCustomer = new Future();

    Stripe.customers.create({
      source: token,
      email: email
    }, function(error, customer){
      if (error){
        stripeCustomer.return(error);
      } else {
        stripeCustomer.return(customer);
      }
    });

    return stripeCustomer.wait();
  },


  'chargeCard': function(stripeToken) {
    check([stripeToken], [Match.Any]);
    var Stripe = StripeAPI('sk_test_UB4JIQNcwgJT8JD7071X5S8x');

    Stripe.charges.create({
      amount: 1000,
      currency: 'usd',
      source: stripeToken
    }, function(err, charge) {
      console.log(err, charge);
      console.log("errorsooooo");
    });
  }

});