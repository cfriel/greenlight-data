var hide_list = function()
{
    $('#datasets-list').hide();
};

var show_composer = function()
{
    $('#datasets-composer').show();
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