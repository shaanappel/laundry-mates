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

    var stripeKey = Meteor.settings.private.stripe.testSecretKey;
    var Stripe = StripeAPI(stripeKey);

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