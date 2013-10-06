var bind_transforms = function()
{
    var transforms = Greenlight.Transforms.find().fetch();

    transforms.every(function(element, index, array){
	element.id = element._id;
	element.text = element.name;
	return true;
    });

    var select2 = $("#t").select2({
        data: 	transforms
    });
    
};

var bind_endpoints = function()
{
    var endpoints = Greenlight.Endpoints.find().fetch();

    endpoints.every(function(element, index, array){
	element.id = element._id;
	element.text = element.name;
	return true;
    });

    var select2 = $("#e").select2({
        data: 	endpoints
    });
    
};

var bind_datasets = function()
{
    var datasets = Greenlight.Datasets.find().fetch();

    datasets.every(function(element, index, array){
	element.id = element._id;
	element.text = element.name;
	return true;
    });

    var select2 = $("#d").select2({
        data: 	datasets
    });
    
};


var configure_editor = function()
{
    window.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
	mode: "javascript",
        //indentWithTabs: true,
        //smartIndent: true,
        lineNumbers: true,
        //matchBrackets : true,
        //autofocus: true
    });
}

Template.streams.owner = function()
{
    var self = this;
    var ownerId = self.owner;

    var owner = Meteor.users.findOne({_id: ownerId});
    
    return owner.username;
}

var hide_list = function()
{
    $('#stream-list').hide();
};

var show_composer = function()
{
    $('#stream-composer').show();
    bind_endpoints();
    bind_transforms();
    bind_datasets();
};

Template.streams.created = function()
{
    Pagination.perPage(10);

    Pagination.style('bootstrap');
    Session.set("stream_page", 1);
}

Template.streams.results = function () 
{
    Pagination.currentPage(Session.get("stream_page"));    
    
    return Pagination.collection(
	Greenlight.Streams.find({}).fetch()
    );
}

Template.streams.pagination = function(){

    var currentPage = Session.get("stream_page");
    var count = Greenlight.Streams.find().count();
    
    if(currentPage && count > 0)
    {
	return Pagination.links(
	    '#select_stream', count, 
	    {currentPage: currentPage, perPage: 10}
	);
    }
}

Template.streams.events({
    'click #create': function()
    {
	hide_list();
	show_composer();
    },
    'click #create-stream' : function()
    {
	var name = $('#stream-name').val();
	
	var stream = new Greenlight.Stream({name:name});
	
	stream.save();

    }

});