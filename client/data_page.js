var hide_containers = function()
{
    hide_container('#endpoints-container');
    hide_container('#transforms-container');    
    hide_container('#datasets-container');    
    hide_container('#streams-container');
};

var hide_container = function(selector)
{
    $(selector).hide();
};

var show_container = function(selector)
{
    $(selector).show();
};

var navigate = function(selector)
{
    hide_containers();
    show_container(selector);
};

Template.data_page.rendered = function()
{

    Deps.autorun(function(){
	
	var section = Session.get('section');
	
	if(section != null)
	{
	    navigate(section);
	}
	
    });
};

Template.data_page.events({
  'click #endpoints': function() {  
      Meteor.Router.to('/data/endpoints');
  },
  'click #transforms': function() {  
      Meteor.Router.to('/data/transforms');
  },
  'click #datasets': function() {  
      Meteor.Router.to('/data/datasets');
  },
  'click #streams': function() {  
      Meteor.Router.to('/data/streams');
  }
});
