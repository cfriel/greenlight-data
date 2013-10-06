Template.transforms.owner = function()
{
    var self = this;
    var ownerId = self.owner;

    var owner = Meteor.users.findOne({_id: ownerId});
    
    return owner.username;
}

var show_list = function()
{
    $('#transform-list').show();
};

var hide_composer = function()
{
    $('#transform-composer').hide();
};

var hide_list = function()
{
    $('#transform-list').hide();
};

var show_composer = function()
{
    $('#transform-composer').show();
    configure_editor();

};


var configure_editor = function()
{
    window.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
	mode: "javascript",
        lineNumbers: true
    });
}

var populate = function(id)
{
    Greenlight.log("populating transforms for id " + id);

    var transform = Greenlight.Transforms.findOne({_id : id});

    if(transform != null)
    {
	$('#transform-name').val(transform.name);
	window.editor.setValue(transform.configuration);
    }
};

Template.transforms.rendered = function()
{
    Deps.autorun(function(){

	var section = Session.get('section');
	var id = Session.get('id');

	if(section == '#transforms-container' && id != null)
	{
	    hide_list();
	    show_composer();
	    populate(id);
	}
	else if(section == '#transforms-container' && id == null)
	{
	    hide_composer();
	    show_list();
	}
    });

};

Template.transforms.created = function()
{
    Pagination.perPage(10);

    Pagination.style('bootstrap');
    Session.set("transform_page", 1);
}

Template.transforms.results = function () 
{
    Pagination.currentPage(Session.get("transform_page"));    
    
    return Pagination.collection(
	Greenlight.Transforms.find({}).fetch()
    );
}

Template.transforms.pagination = function(){

    var currentPage = Session.get("transform_page");
    var count = Greenlight.Transforms.find().count();
    
    if(currentPage && count > 0)
    {
	return Pagination.links(
	    '#select_transform', count, 
	    {currentPage: currentPage, perPage: 10}
	);
    }
}


Template.transforms.events({
    'click #create': function()
    {
	hide_list();
	show_composer();
    },
    'click #create-transform' : function()
    {
	var name = $('#transform-name').val();
	var configuration = window.editor.getValue();
	
	var transform = new Greenlight.Transform({name:name, configuration:configuration});
	
	transform.save();

    }
});