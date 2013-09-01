var hide_list = function()
{
};

var show_composer = function()
{
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
    }
});