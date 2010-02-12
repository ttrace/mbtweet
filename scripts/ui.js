mbui = {
	window_resize_token	: "init",
};
	
init_window_resize = function()
{
// 	var timeline_css_list = getMatchedCSSRules( document.querySelector(".timeline") , '')
// 	for( key in timeline_css_list )
// 	{
// 		if( timeline_css_list[key].selectorText == ".timeline")
// 		{
// 			mbui = {
// 					timeline_css_height : timeline_css_list[key].style,
// 					window_resize_token	: "init",
// 					}
// 		}
// 	}
	window.addEventListener ( 'resize' , function(){ window_resize_starter() } , true);	
	window_resize( "init" );
}

init_status_editor = function()
{
	var editor = document.querySelector("#post_editor");
		editor.addEventListener(	"DOMSubtreeModified",
									function()
									{
										status_editor_update();
									},
									false);
}

status_editor_update = function()
{
	var editor = document.querySelector("#post_editor");
	var status_form = document.querySelector("#status");
		status_form.value = editor.innerText;
	if(mbtweet.debug)window.console.log(editor.innerText);
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
		var api_rate_counter = document.querySelector(".api-rate");
		for( var i = 0 ; i < timeline_list.length ; i++ )
		{
			collumn_wrapper.style.height	= window.innerHeight - 60 + "px";
			timeline_list[i].style.height	= window.innerHeight - 105 + "px";
		}
		if( window.innerWidth <= 870 )
		{
			api_rate_counter.style.display = "none";
		}
		else
		{
			api_rate_counter.style.display = "block";
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
		if( i > 100 )
		{
			target_elements[i].parentNode.removeChild( target_elements[i] );
//			target_elements[i].style.display = "none";
		}
	}
	var left_target_elements = document.querySelectorAll( target_query + " ~ .entry" );
		timeline.max_id = left_target_elements[ ( left_target_elements.length - 1 ) ].id.replace(/^.+\-([0-9]+)$/ , "$1");
		window.console.log( timeline , target_elements[ ( left_target_elements.length - 1 ) ] , timeline.max_id );
	//counting number of tweets.
	unread_counter( timeline.id );
}

timeline_tail_cutter = function( timeline )
{
	var entry_list = document.querySelectorAll( "#" + timeline.id + " > .entry");
		window.console.log( entry_list.length , timeline.id );
	
	if( entry_list.length > 100 )
	{
		for( var i = 100 ; i < entry_list.length ; i++)
		{
			timeline.removeChild( entry_list[i] );		
		}
		timeline.max_id = timeline.lastChild.previousElementSibling.id.replace(/^.+\-([0-9]+)$/ , "$1");
		window.console.log( timeline );
		
		unread_counter( timeline.id );
	}
}

unread_counter = function( timeline_id )
{
	var timeline = document.getElementById( timeline_id + "_column" );
	timeline.querySelector(".unread-counter").innerText = timeline.querySelectorAll(".unread").length + "/" + timeline.querySelectorAll(".entry:not(.conv)").length;
}

anchor_HTML = function( linked_source )
{
	linked_source = linked_source.replace( mbutil.isUrlRegexp		, "<a href='$1' target='_blank' rel='noreferrer'>$1</a>$6");
	linked_source = linked_source.replace( /([^\/]|^)(www\.[\w\d:#@%\/;$\(\)~_\?\+-=\\\.&]+\.[\w\d:#@%\/;$\(\)~_\?\+-=\\\.&]+)/g , "<a href='http://$2' target='_blank'>$2</a>" );
	linked_source = linked_source.replace(/blank\'\>([^\<]{28})[^\<]+\<\/a/g, "blank'>$1...</a");
	linked_source = linked_source.replace(/(^|[^\S\/])#((([^\s\(\)\\\!\@\#\$\%\^\&\+\=\;\:\"\'\|\<\>\,\.\~\?]|[0-9a-zA-Z_\-])+[0-9a-zA-Z_\-]+){1,16})/g ,"$1<a class='hashtag' href='" + window.location.protocol + "//twitter.com/search?q=%23$3' target='_blank'>#$3</a>");
	linked_source = linked_source.replace(/[@＠]([0-9a-zA-Z\_\-]+\/[0-9a-zA-Z\_\-]+)/g,"@<a class='list' href='" + window.location.protocol + "//twitter.com/$1' target='_blank'>$1</a>");
	linked_source = linked_source.replace(/[@＠]([0-9a-zA-Z\_\-]+)/g,"@<a class='sname' href='" + window.location.protocol + "//twitter.com/$1' target='_blank'>$1</a>");

//	linked_source = linked_source.replace(/&amp;/g , "&amp;amp;");
	return( linked_source );
}
