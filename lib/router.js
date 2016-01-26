Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return [Meteor.subscribe('orders'),]; }
});



Router.map(function(){
	this.route('home', {
	    layoutTemplate: 'layout',
		path: '/',
		template: 'home'
	});


	// Login-Home
	this.route('login', {
	    layoutTemplate: 'form_layout',
		path: '/login',
		template: 'login'
	});

	// Register
	this.route('register', {
	    layoutTemplate: 'form_layout',
		path: '/register',
		template: 'register'
	});

	this.route('ForgotPassword', {
	    layoutTemplate: 'form_layout',
		path: '/forgot',
		template: 'ForgotPassword'
	});

	this.route('ResetPassword', {
	    layoutTemplate: 'form_layout',
		path: '/reset/:token',
		template: 'ResetPassword'
	});
	
	this.route('dashboard', {
		path: '/dashboard',
		layoutTemplate: 'layout',
		template: 'dashboard',
		onBeforeAction: function(){
			if(Meteor.user() == null){
			    Session.set('Route', '/dashboard');
				Router.go('/');
			}
			this.next();
		}
	});
	
});





