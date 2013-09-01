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
