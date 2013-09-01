var hide_list = function()
{
};

var show_composer = function()
{
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
