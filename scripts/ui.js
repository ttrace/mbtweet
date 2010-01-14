mbui = {
	window_resize_token	: "init",
};
	
init_window_resize = function()
{
	var timeline_css_list = getMatchedCSSRules( document.querySelector(".timeline") , '')
	for( key in timeline_css_list )
	{
		if( timeline_css_list[key].selectorText == ".timeline")
		{
			mbui = {
					timeline_css_height : timeline_css_list[key].style,
					window_resize_token	: "init",
					}
		}
	}
	window.addEventListener ( 'resize' , function(){ window_resize_starter() } , true);	
	window_resize( "init" );
}

window_resize_starter = function()
{
	mbui.window_resize_token = guid();
	var window_resize_token = mbui.window_resize_token;
	setTimeout( function()
				{
					window_resize( window_resize_token );
				},
				500);
	fit_holizontal_width();
}

window_resize = function( window_resize_token )
{
	if( window_resize_token == mbui.window_resize_token )
	{
		var timeline_list = document.querySelectorAll(".timeline");
		var collumn_wrapper = document.querySelector("#column");
		for( var i = 0 ; i < timeline_list.length ; i++ )
		{
			collumn_wrapper.style.height	= window.innerHeight - 60 + "px";
			timeline_list[i].style.height	= window.innerHeight - 105 + "px";
		}
	}
	return( false );
}

function fit_holizontal_width()
{
	var column_wrapper = document.querySelector("#column");
	var timelines = column_wrapper.querySelectorAll(".timeline_column");
	var total_width = 0;
	for( var i = 0 ; i < timelines.length ; i++ )
	{
		if( timelines[i].style.display != "none" )
		{
			total_width += timelines[ i ].offsetWidth + 10;
		}
	}
	column_wrapper.style.width = total_width + "px";
}

status_counter = function()
{
	var status_editor		= document.querySelector("#status");
	var hashtag_editor		= document.querySelector("#hashtag");
	var counter				= document.querySelector("#counter");
	var counter_length		= 140 - status_editor.value.length - hashtag_editor.value.length;
		counter.innerText	= counter_length;
}

remove_unread = function( target_id )
{
	var target_query = target_id + "";
	var start_element = document.querySelector( target_query );
	var timeline		= start_element.parentNode;
		removeClass( start_element , "unread");

	var target_elements = document.querySelectorAll( target_query + " ~ .entry" );
	for( var i = 0 ; i < target_elements.length ; i++)
	{
		removeClass( target_elements[i] , "unread");
	}

	//counting number of tweets.
	unread_counter( timeline.id );
}

unread_counter = function( timeline_id )
{
	var timeline = document.getElementById( timeline_id + "_column" );
	timeline.querySelector(".unread-counter").innerText = timeline.querySelectorAll(".unread").length + "/" + timeline.querySelectorAll(".entry:not(.conv)").length;
}
