mbtweetOAuth.callAPI = function( action , method, parameter , mbtweet_method )
{
    var accessor = { consumerSecret: mbtweetOAuth.consumerSecret
                   , tokenSecret   : mbtweetOAuth.accessTokenSecret};
    var message = { action: action
                  , method: method
                  , parameters: 
                  	[
                  		[ "oauth_consumer_key" , mbtweetOAuth.consumerKey ],
                  		[ "oauth_token" , mbtweetOAuth.accessToken ],
                  		[ "oauth_signature_method" , mbtweetOAuth.signatureMethod ],
                  	]
                  };

    for (var i = 0; i < parameter.length; i++ )
    {
         var input = parameter[i];
             message.parameters.push([ parameter[i][0], parameter[i][1] ]);
    }
    
	if( !(mbtweet_method.auth == false) || ( mbtweet.rate.ip < mbtweet.rate.auth ) && ( mbtweet_method && !( mbtweet_method.auth == false && mbtweet_method.method =="rate" )) )
	{
		OAuth.completeRequest( message, accessor );        
		OAuth.SignatureMethod.sign( message, accessor );
		var access_URL = action + "?" + OAuth.formEncode( message.parameters );
	}
	else
	{
		var access_URL = action + "?" + formEncode_noOAuth( parameter );
	}

 	if( method == "GET" )
 	{
		jsonp_fetch( access_URL , action , method, parameter , mbtweet_method );
	}
	else if( method == "POST")
	{
		post_method( access_URL , mbtweet_method );
	}

 return true;
};

formEncode_noOAuth = function formEncode( parameters ) {
	var form = "";
	var list = [];

	for (var p in parameters) {
		list.push([parameters[p][0] , parameters[p][1]]);
	}

	for (var p = 0; p < list.length; ++p) {
		var value = list[p][1];
		if (value == null) value = "";
		if (form != "") form += '&';
		form += OAuth.percentEncode(list[p][0]) +'='+ OAuth.percentEncode(value);
	}
	return form;
}

retreveMine = function(data)
{
	mbtweet.user.profile_image = data[0].user.profile_image_url;
	document.querySelector(".dock .user-icon").src = mbtweet.user.profile_image;
	document.querySelector("body").style.backgroundImage = "url(" + data[0].user.profile_background_image_url + ")";
	document.querySelector("body").style.backgroundColor = "#" + data[0].user.profile_background_color;
//	if(mbtweet.debug)window.console.log(data[0].user);
	for( i = 0 ; i < data.length ; i++ )
	{
		create_tweet_element( data[i] , true );
	}
}

countRate = function( data )
{
/*
hourly_limit: 150
remaining_hits: 146
reset_time: "Fri Dec 25 10:44:15 +0000 2009"
reset_time_in_seconds: 1261737855
*/
	var hourly_rate_index = document.querySelector(".hourly-rate");
		hourly_rate_index.style.width = "150px";
	var remaining_hits_index = document.querySelector(".rate");
//		remaining_hits_index.style.width = data.remaining_hits + "px";
		remaining_hits_index.style.width = ( data.remaining_hits / data.hourly_limit ) * 150 + "px";
		remaining_hits_index.innerText = data.remaining_hits;
	var reset_time_in_seconds = document.querySelector(".reset-time");
	var time = new Date( data.reset_time_in_seconds * 1000 );
		reset_time_in_seconds.innerText = "Auth Rate reset time is " + time.getHours() + ":" + time.getMinutes();

	mbtweet.rate.auth		= data.remaining_hits;
	mbtweet.rate.auth_reset	= data.reset_time_in_seconds;
}

countNoAuthRate = function(data)
{
/*
hourly_limit: 150
remaining_hits: 146
reset_time: "Fri Dec 25 10:44:15 +0000 2009"
reset_time_in_seconds: 1261737855
*/
	var hourly_rate_index = document.querySelector(".hourly-rate.no-auth");
		hourly_rate_index.style.width = "150px";
	var remaining_hits_index = document.querySelector(".rate.no-auth");
		remaining_hits_index.style.width = ( data.remaining_hits / data.hourly_limit ) * 150 + "px";
		remaining_hits_index.innerText = data.remaining_hits;
	var reset_time_in_seconds = document.querySelector(".reset-time.no-auth");
	var time = new Date( data.reset_time_in_seconds * 1000 );
		reset_time_in_seconds.innerText = "IP Rate reset time is " + time.getHours() + ":" + time.getMinutes();

	mbtweet.rate.ip			= data.remaining_hits;
	mbtweet.rate.ip_reset	= data.reset_time_in_seconds;
}

// retreveSearch = function( data )
// {
// 	var search_timeline = document.querySelector("#search");
// 	for( i = 0 ; i < data.results.length ; i++ )
// 	{
// 		create_search_element( data.results[i] ).buildEntry( search_timeline );
// 	}
// }
// 
// updateInitSearchTimeline = function(data)
// {
// 	var search_timeline = document.querySelector("#search");
// 	var insert_target = document.querySelector("#search > .entry");
// 
// 	for( i = 0 ; i < data.results.length ; i++ )
// 	{
// 		create_search_element( data.results[i] ).buildEntry( search_timeline , "insert" , insert_target );
// 	}
// }

place_timeline = function(data)
{
	window.console.log(data);
}

post_method = function( url , api_method )
{
	if( document.querySelector("#proxy_frame") )
	{
		document.querySelector("#post").removeChild( document.querySelector("#proxy_frame") );
	}
	
	var proxy_token			= guid();
	var pxcatch_frame = document.createElement("IFRAME");
		pxcatch_frame.id	= proxy_token;
		pxcatch_frame.name	= proxy_token;
		pxcatch_frame.style.display = "none";
	document.querySelector("#post").appendChild( pxcatch_frame );

		pxcatch_frame.addEventListener(
			"load",
			function(event)
			{
				catch_post( event , api_method )
			},
			true
		);

	var proxy_frame = document.createElement("IFRAME");
		proxy_frame.id = "proxy_frame";
		proxy_frame.style.display = "none";
	document.querySelector("#post").appendChild( proxy_frame );
	
	var post_process = proxy_frame.contentWindow.document;
		post_process.open();
		post_process.write('<form method="POST" action="'+ url +'" target="' + proxy_token + '">');
		post_process.write('</form>');
		post_process.write('<script>window.onload = function(){document.forms[0].submit();}</script>');
		post_process.close();
}

catch_post = function( event , api_method )
{
	//window.console.log( api_method );
	switch ( api_method[0] )
	{
		case "status_update":
			document.querySelector("#status").value = "";
			document.querySelector("#post_in_reply_to_status_id").value = "";
			remove_in_reply_to();
			status_counter();
			break;

		case "retweet":
			var retweet_button = document.querySelector( "#" + api_method[1] + " .retweet" );
					retweet_button.innerText = "Retweeted";
				retweet_button.className = "retweet dimm";
			break;
		
		case "favorite":
			if(mbtweet.debug)window.console.log("fave bug =" , api_method[1] );
			var fave_entry = document.querySelector( "[id$='" + api_method[1] + "']" );
			var fave_status = api_method[2];
			var fave_button = document.querySelector( "#" + api_method[1] + " .favorite" );
			
			if( !fave_status )
			{
				addClass( fave_entry , "favorited");
				fave_button.innerText = "☆";
			}
			else
			{
				removeClass( fave_entry , "favorited");
				fave_button.innerText = "★";
			}
			break;

		case "destroy":
			var destroy_entries = document.querySelectorAll( "[id$='" + api_method[1] + "']" );
			for( var i = 0 ; i < destroy_entries.length ; i++ )
			{
				if(mbtweet.debug)window.console.log("destroy =" , api_method[1] , destroy_entries);
				destroy_entries[i].parentNode.removeChild( destroy_entries[i] );
			}
			break;
		
		default:
		break;
	}
	
	document.querySelector("#post").removeChild( event.target );
	
	if( document.querySelector("#proxy_frame") )
	{
		document.querySelector("#post").removeChild( document.querySelector("#proxy_frame") );
	}
}

function __post_method( url )
{
	window.console.log( url );
	var update_req = new XMLHttpRequest();
	update_req.onreadystatechange = function()
	{
		if(update_req.readyState == 4 && update_req.status == 200)
		{
			window.console.log( update_req.responseText );
		}
	}
	update_req.open('POST' , url , true);
	update_req.setRequestHeader("Accept", "application/json, text/javascript, */*");
	update_req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	update_req.send(null);
}
