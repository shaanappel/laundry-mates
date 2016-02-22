Meteor.startup(function() {
	var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
    Stripe.setPublishableKey(stripeKey);
});

Meteor.startup(function() {
	var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
    var handler = StripeCheckout.configure({
        key: stripeKey,
        token: function(token) {}
    });
});