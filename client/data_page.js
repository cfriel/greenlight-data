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

Template.data_page.events({
  'click #endpoints': function() {  
      navigate('#endpoints-container');
  },
  'click #transforms': function() {  
      navigate('#transforms-container');
  },
  'click #datasets': function() {  
      navigate('#datasets-container');
  },
  'click #streams': function() {  
      navigate('#streams-container');
  }
});
