var bind_adapters = function(dataset)
{
    var adapters = ["foo", "bar", "baz", "qux"];

    var select2 = $("#s").select2({

        minimumInputLength: 1,

        query: function (query) {
	    
	    var data = {results: []}, i, j, s;
	    
	    var count = 0;
	    var limit = 10;
	    
	    if(query.term)
	    {
		for (var j = 0; j < adapters.length && count < limit; j++) {
		    data.results.push( {id: 1, text: adapters[j]});
		    count++;
		}
	    }
	
	    query.callback(data);
	}
    });
    
    $('#s').on("change", function(e) { 
	console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
	Meteor.Router.to(e.val);
    });
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

Template.endpoints.events({
    'click #create': function()
    {
	hide_list();
	show_composer();
    }
});