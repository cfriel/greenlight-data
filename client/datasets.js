var show_list = function()
{
    $('#dataset-list').show();
};

var hide_composer = function()
{
    $('#dataset-composer').hide();
};

var hide_list = function()
{
    $('#dataset-list').hide();
};

var show_composer = function()
{
    $('#dataset-composer').show();
};

var populate = function(id)
{
    Greenlight.log("populating datasets for id " + id);

    var dataset = Greenlight.Datasets.findOne({_id : id});

    if(dataset != null)
    {
	$('#dataset-name').val(dataset.name);
    }
};

Template.datasets.rendered = function()
{
    Deps.autorun(function(){

	var section = Session.get('section');
	var id = Session.get('id');

	if(section == '#datasets-container' && id != null)
	{
	    hide_list();
	    show_composer();
	    populate(id);
	}
	else if(section == '#datasets-container' && id == null)
	{
	    hide_composer();
	    show_list();
	}
    });

};


Template.datasets.created = function()
{
    Pagination.perPage(10);

    Pagination.style('bootstrap');
    Session.set("dataset_page", 1);
}

Template.datasets.results = function () 
{
    Pagination.currentPage(Session.get("dataset_page"));    
    
    return Pagination.collection(
	Greenlight.Datasets.find({}).fetch()
    );
}

Template.datasets.pagination = function(){

    var currentPage = Session.get("dataset_page");
    var count = Greenlight.Datasets.find().count();
    
    if(currentPage && count > 0)
    {
	return Pagination.links(
	    '#select_dataset', count, 
	    {currentPage: currentPage, perPage: 10}
	);
    }
}

Template.endpoints.events({
    'click #create': function()
    {
	hide_list();
	show_composer();
    }
});