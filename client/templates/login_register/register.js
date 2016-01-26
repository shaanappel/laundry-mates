Template.register.events({
	"submit .form-signup": function(event){
		var email = trimInput(event.target.email.value);
		var password = trimInput(event.target.password.value);
		var password2 = trimInput(event.target.password2.value);
		var first_name = trimInput(event.target.first_name.value);
		var last_name = trimInput(event.target.last_name.value);
		var phone = trimInput(event.target.phone.value);
		var primary_chapter = event.target.primary_chapter.value;
		var newsletter_checked = event.target.tlmonthlynews.checked;
		

		if(isNotEmpty(email) && 
			isNotEmpty(password) && 
			isNotEmpty(first_name) && 
			isNotEmpty(last_name) && 
			isEmail(email) && 
			areValidPasswords(password, password2)){

			Accounts.createUser({
				email: email,
				password: password,
				profile: {
					first_name: first_name,
					last_name: last_name,
					phone: phone,
					primary_chapter: primary_chapter,
					notifications: {
						tl_monthly_letter: newsletter_checked,
						chapter_monthly_letters: [],
						chapter_weekly_letters: []
					},
					role: {
					    IsSuperAdmin: ""
					},
					//Possible statuses: none_sent, processing, denied
					request_status: {}
				}
			}, function(err){
				if(err){
					FlashMessages.sendError('There was an error with registration');
				} else {
					if (Session.get('Route') == '/doatl') {
						Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.primary_chapter': Session.get('selectedChapter') }} );
						Session.set('Route', '/my-upcoming-lounges');
						Router.go('/doatl');
					} else {
						Router.go('/my-upcoming-lounges');
					}
				}
			});

			if(newsletter_checked) {
				handleSubscriber({
			      email: email,
			      action: 'subscribe'
			    });
			}

			var data = {
				first_name: 'New Lounger'
			}
		    var to = email;
		    var subject = "Welcome to Thought Lounge! You just created your profile.";
		    var temp_name = 'welcomeEmail';
		    var file_name = 'welcome.html';

		    Meteor.call('sendEmail', to, subject, data, temp_name, file_name);
		    console.log('sent')

		}


		// Prevent Submit
		return false;
	}
});


// Validation Rules

// Trim Helper
var trimInput = function(val){
	return val.replace(/^\s*|\s*$/g, "");
}

// Check For Empty Fields
isNotEmpty = function(value) {
    if (value && value !== ''){
        return true;
    }
    FlashMessages.sendError("Please fill in all fields");
    return false;
};

// Validate Email
isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    FlashMessages.sendError("Please use a valid email address");
    return false;
};

// Check Password Field
isValidPassword = function(password) {
    if (password.length < 6) {
        FlashMessages.sendError("Password must be at least 6 characters");
        return false;
    }
    return true;
};

// Match Password
areValidPasswords = function(password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirm) {
        FlashMessages.sendError("Passwords do not match");
        return false;
    }
    return true;
};