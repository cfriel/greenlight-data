var bind_adapters = function(dataset)
{
    var adapters = Greenlight.Adapters.find().fetch();

    adapters.every(function(element, index, array){
	element.id = element._id;
	element.text = element.name;
	return true;
    });

    var select2 = $("#s").select2({
        data: 	adapters
    });
    
};

var show_list = function()
{
    $('#endpoint-list').show();
};

var hide_composer = function()
{
    $('#endpoint-composer').hide();
};

var hide_list = function()
{
    $('#endpoint-list').hide();
};

var show_composer = function()
{
    $('#endpoint-composer').show();
    bind_adapters();
};

var populate = function(id)
{
    Greenlight.log("populating endpoints for id " + id);

    var endpoint = Greenlight.Endpoints.findOne({_id : id});

    if(endpoint != null)
    {
	$('#name').val(endpoint.name);
    }
};

Template.endpoints.rendered = function()
{
    Deps.autorun(function(){
	var section = Session.get('section');
	var id = Session.get('id');

	if(section == '#endpoints-container' && id != null)
	{
	    hide_list();
	    show_composer();
	    populate(id);
	}
	else if(section == '#endpoints-container' && id == null)
	{
	    hide_composer();
	    show_list();
	}
    });
};

Template.endpoints.created = function()
{
    Pagination.perPage(10);

    Pagination.style('bootstrap');
    Session.set("endpoint_page", 1);
}

Template.endpoints.results = function () 
{
    Pagination.currentPage(Session.get("endpoint_page"));    
    
    return Pagination.collection(
	Greenlight.Endpoints.find({}).fetch()
    );
}

Template.endpoints.pagination = function(){

    var currentPage = Session.get("endpoint_page");
    var count = Greenlight.Endpoints.find().count();
    
    if(currentPage && count > 0)
    {
	return Pagination.links(
	    '#select_endpoint', count, 
	    {currentPage: currentPage, perPage: 10}
	);
    }
}

Template.endpoints.owner = function()
{
    var self = this;
    var ownerId = self.owner;

    var owner = Meteor.users.findOne({_id: ownerId});
    
    return owner.username;
}


Template.endpoints.adapter = function()
{
    var self = this;
    var adapterId = self.adapter;

    var adapter = Greenlight.Adapters.findOne({_id: adapterId});
    
    return adapter.name;
}

Template.endpoints.events({
    'click #create': function()
    {
	hide_list();
	show_composer();
    },
    'click #create-endpoint' : function()
    {
	var name = $('#name').val();
	var adapter = $('#s').val();
	var configuration = $('#connection').val();
	
	var endpoint = new Greenlight.Endpoint({name:name, adapter:adapter, configuration:configuration});
	
	endpoint.save();

    }
});