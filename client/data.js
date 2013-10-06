var name = "data";
var version = "1.0";

data = function(){};

data.prototype = new Greenlight.Package();

data.prototype.routes =   {
    
    '/data': function()
    {
	Greenlight.log("calling /data route");

	Session.set('session', null);
	Session.set('id', null);

	return 'data_page';
    },

    '/data/endpoints': function()
    {
	Greenlight.log("calling /data/endpoints route");

	Session.set('section', '#endpoints-container');
	Session.set('id', null);

	return 'data_page';
    },

    '/data/transforms': function()
    {
	Greenlight.log("calling /data/transforms route");

	Session.set('section', '#transforms-container');
	Session.set('id', null);

	return 'data_page';
    },

    '/data/datasets': function()
    {
	Greenlight.log("calling /data/datasets route");

	Session.set('section', '#datasets-container');
	Session.set('id', null);

	return 'data_page';
    },

    '/data/streams': function()
    {
	Greenlight.log("calling /data/streams route");

	Session.set('section', '#streams-container');
	Session.set('id', null);

	return 'data_page';
    },

    '/data/endpoints/:id': function(id)
    {
	Greenlight.log("calling /data/endpoints route");

	Session.set('section', '#endpoints-container');
	Session.set('id', id);

	return 'data_page';
    },

    '/data/transforms/:id': function(id)
    {
	Greenlight.log("calling /data/transforms route");

	Session.set('section', '#transforms-container');
	Session.set('id', id);

	return 'data_page';
    },

    '/data/datasets/:id': function(id)
    {
	Greenlight.log("calling /data/datasets route");

	Session.set('section', '#datasets-container');
	Session.set('id', id);

	return 'data_page';
    },

    '/data/streams/:id': function(id)
    {
	Greenlight.log("calling /data/streams route");

	Session.set('section', '#streams-container');
	Session.set('id', id);

	return 'data_page';
    }



};

data.prototype.default_route = {

    '/' : function()
    {
	Greenlight.log("calling default route");

	return 'data_page';
    }

};

Greenlight.Packages.Data = data.prototype;

Meteor.startup(function(){

    Greenlight.log("loading data package");
    
    Greenlight.register_package(name, version, Greenlight.Packages.Data);

});
