Template.transforms.owner = function()
{
    var self = this;
    var ownerId = self.owner;

    var owner = Meteor.users.findOne({_id: ownerId});
    
    return owner.username;
}

var hide_list = function()
{
    $('#transform-list').hide();
};

var show_composer = function()
{
    $('#transform-composer').show();
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
	configure_editor();
    },
    'click #create-transform' : function()
    {
	var name = $('#transform-name').val();
	var configuration = window.editor.getValue();
	
	var transform = new Greenlight.Transform({name:name, configuration:configuration});
	
	transform.save();

    }
});