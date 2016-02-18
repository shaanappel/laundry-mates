Meteor.startup(function() {
    Stripe.setPublishableKey('pk_test_7qnA4pgwAdBKjAwfyWvFTGRc');
});

Meteor.startup(function() {
    var handler = StripeCheckout.configure({
        key: 'pk_test_7qnA4pgwAdBKjAwfyWvFTGRc',
        token: function(token) {}
    });
});