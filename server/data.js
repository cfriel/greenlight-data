var name = "data";
var version = "1.0";

data = function(){};

data.prototype = new data();

data.prototype.metadata = function()
{
    
    return {
	description : "The data package provides functionality for integration with other systems.  It allows users to define endpoints, transforms, streams, and datasets, populating the system with data in realtime.  All data sourced in this manner is automatically indexed and made available immediately."
    };
}();


Meteor.methods({
});

Greenlight.Packages.Data = data.prototype;
    
Greenlight.register_package(name, version, Greenlight.Packages.Data);    

