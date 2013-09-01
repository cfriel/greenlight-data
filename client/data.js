var name = "data";
var version = "1.0";

data = function(){};

data.prototype = new Greenlight.Package();

data.prototype.routes =   {
    
    '/data': function()
    {
	Greenlight.log("calling /data route");

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
