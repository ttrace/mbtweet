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
    
	if( !(mbtweet_method.auth == false) )
	{
		window.console.log( mbtweet_method.auth );
		OAuth.completeRequest( message, accessor );        
		OAuth.SignatureMethod.sign( message, accessor );
	}
	var access_URL = action + "?" + OAuth.formEncode( message.parameters );

 	if( method == "GET" )
 	{
		jsonp_fetch( access_URL , action , method, parameter , mbtweet_method );
	}
	else if( method == "POST")
	{
		post_method( access_URL , mbtweet_method );
	}
// 	else if( method == "PIPES")
// 	{
// 		jsonp_fetch( "http://pipes.yahoo.com/pipes/pipe.run?_id=c61a07bae7f57ad13c74a0fec778c68c&_render=json&" + access_URL.replace(/(^.+json\?)/ , "") );	
// 	}

 return true;
};

retreveMine = function(data)
{
	for( i = 0 ; i < data.length ; i++ )
	{
		create_tweet_element( data[i] , true );
	}
}

countRate = function(data)
{
/*
hourly_limit: 150
remaining_hits: 146
reset_time: "Fri Dec 25 10:44:15 +0000 2009"
reset_time_in_seconds: 1261737855
*/
	var hourly_rate_index = document.querySelector(".hourly-rate");
		hourly_rate_index.style.width = data.hourly_limit + "px";
	var remaining_hits_index = document.querySelector(".rate");
		remaining_hits_index.style.width = data.remaining_hits + "px";
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
	window.console.log(data);
	var hourly_rate_index = document.querySelector(".hourly-rate.no-auth");
		hourly_rate_index.style.width = data.hourly_limit + "px";
	var remaining_hits_index = document.querySelector(".rate.no-auth");
		remaining_hits_index.style.width = data.remaining_hits + "px";
		remaining_hits_index.innerText = data.remaining_hits;
	var reset_time_in_seconds = document.querySelector(".reset-time.no-auth");
	var time = new Date( data.reset_time_in_seconds * 1000 );
		reset_time_in_seconds.innerText = "IP Rate reset time is " + time.getHours() + ":" + time.getMinutes();

	mbtweet.rate.ip			= data.remaining_hits;
	mbtweet.rate.ip_reset	= data.reset_time_in_seconds;
}

retreveSearch = function( data )
{
	var search_timeline = document.querySelector("#search");
//	var insert_target = document.querySelector("#search > .read.more");
	window.console.log( "search: " , data );
	for( i = 0 ; i < data.results.length ; i++ )
	{
		create_search_element( data.results[i] ).buildEntry( search_timeline );
	}
}

updateSearchTimeline = function(data)
{
	var search_timeline = document.querySelector("#search");
	var insert_target = document.querySelector("#search > .entry");

	for( i = 0 ; i < data.results.length ; i++ )
	{
		create_search_element( data.results[i] ).buildEntry( search_timeline , "insert" , insert_target );
	}
}

create_tweet_element = function( data , cache )
{
	var tweet_data = data;
	if( data.retweeted_status )
	{
		tweet_data.retweeted_status.id = tweet_data.id;
		tweet_data.retweeted_status.favorited = false;
		tweet_data = data.retweeted_status;
	}
	if( data.sender )
	{
		tweet_data.user = tweet_data.sender;
	}
	var newTweet = new tweet();
		newTweet.status_id					 = tweet_data.id;
		newTweet.created_at					 = tweet_data.created_at;
		newTweet.in_reply_to_screen_name	 = tweet_data.in_reply_to_screen_name;
		newTweet.in_reply_to_status_id		 = tweet_data.in_reply_to_status_id;
		newTweet.in_reply_to_user_id		 = tweet_data.in_reply_to_user_id;
		newTweet.favorited					 = tweet_data.favorited;
		newTweet.geo						 = tweet_data.geo;
		newTweet.source						 = tweet_data.source;
		newTweet.text						 = tweet_data.text;
		newTweet.truncated					 = tweet_data.truncated;

		newTweet.screen_name				 = tweet_data.user.screen_name;
		newTweet.profile_image_url			 = tweet_data.user.profile_image_url;

		newTweet.user.created_at			 = tweet_data.user.created_at;
		newTweet.user.description			 = tweet_data.user.description;
		newTweet.user.favourites_count		 = tweet_data.user.favourites_count;
		newTweet.user.followers_count		 = tweet_data.user.followers_count;
		newTweet.user.following				 = tweet_data.user.following;
		newTweet.user.friends_count			 = tweet_data.user.friends_count;
		newTweet.user.geo_enabled			 = tweet_data.user.geo_enabled;
		newTweet.user.user_id				 = tweet_data.user.id;
		newTweet.user.location				 = tweet_data.user.location;
		newTweet.user.name					 = tweet_data.user.name;
		newTweet.user.notifications			 = tweet_data.user.notifications;
		newTweet.user.user_protected		 = tweet_data.user.protected;
		newTweet.user.screen_name			 = tweet_data.user.screen_name;
		newTweet.user.statuses_count		 = tweet_data.user.statuses_count;
		newTweet.user.time_zone				 = tweet_data.user.time_zone;
		newTweet.user.utc_offset			 = tweet_data.user.utc_offset;
		newTweet.user.url					 = tweet_data.user.url;
		newTweet.user.verified				 = tweet_data.user.verified;
		newTweet.user.profile_background_color		 = tweet_data.user.profile_background_color;
		newTweet.user.profile_background_image_url	 = tweet_data.user.profile_background_image_url;
		newTweet.user.profile_background_tile		 = tweet_data.user.profile_background_tile;
		newTweet.user.profile_image_url				 = tweet_data.user.profile_image_url;
		newTweet.user.profile_link_color			 = tweet_data.user.profile_link_color;
		newTweet.user.profile_sidebar_border_color	 = tweet_data.user.profile_sidebar_border_color;
		newTweet.user.profile_sidebar_fill_color	 = tweet_data.user.profile_sidebar_fill_color;
		newTweet.user.profile_text_color			 = tweet_data.user.profile_text_color;

		var user_json = JSON.stringify( newTweet.user );
		mbdatabase.save_user( user_json );

		var status_json = JSON.stringify( newTweet );
//		window.console.log( cache )
		if( cache )
		{
			mbdatabase.save_status( status_json );
		}

	if( data.retweeted_status )
	{
		newTweet.rt_user_name				 = data.user.screen_name;
		newTweet.rt_profile_image_url		 = data.user.profile_image_url;
	}
	return( newTweet );
}

create_search_element = function( data )
{
	var tweet_data = data;
/*
//	search JSON.
// {"text":"@twitterapi  http:\/\/tinyurl.com\/ctrefg",
//      "to_user_id":396524,
//      "to_user":"TwitterAPI",
//      "from_user":"jkoum",
//      "id":1478555574,   
//      "from_user_id":1833773,
//      "iso_language_code":"nl",
//      "source":"<a href="http:\/\/twitter.com\/">twitter<\/a>",
//      "profile_image_url":"http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/118412707\/2522215727_a5f07da155_b_normal.jpg",
//      "created_at":"Wed, 08 Apr 2009 19:22:10 +0000"}
*/
	var newTweet = new tweet();
		newTweet.status_id					 = tweet_data.id;
		newTweet.created_at					 = tweet_data.created_at;
	var source_string						 = tweet_data.source.replace(/\&lt;/g , "<");
		source_string						 = source_string.replace(/\&gt;/g , ">");
		source_string						 = source_string.replace(/\&quote;/g , '"');
		newTweet.source						 = source_string;
		
		newTweet.text						 = tweet_data.text;

		newTweet.user.user_id				 = tweet_data.from_user_id;
		newTweet.user.screen_name			 = tweet_data.from_user;
		newTweet.user.profile_image_url		 = tweet_data.profile_image_url;
		
		newTweet.screen_name				 = tweet_data.from_user;
		newTweet.profile_image_url			 = tweet_data.profile_image_url;
		newTweet.user.user_id				 = tweet_data.from_user_id;

		newTweet.in_reply_to_screen_name	 = null;
		newTweet.in_reply_to_status_id		 = null;
		newTweet.in_reply_to_user_id		 = null;

	return( newTweet );
}

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
			status_counter();
			break;

		case "retweet":
			var retweet_button = document.querySelector( "#" + api_method[1] + " .retweet" );
				retweet_button.innerText = "Retweeted";
				retweet_button.className = "retweet dimm";
			break;
		
		case "favorite":
			window.console.log("fave bug =" , api_method[1] );
//			var fave_entry = document.querySelector( "#" + api_method[1] );
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
		
		default:
		break;
	}
	
	document.querySelector("#post").removeChild( event.target );
	
	if( document.querySelector("#proxy_frame") )
	{
		document.querySelector("#post").removeChild( document.querySelector("#proxy_frame") );
	}
	window.console.log( event );
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
