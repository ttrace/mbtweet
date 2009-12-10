mbtweetOAuth.callAPI = function( action , method, parameter )
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

	OAuth.completeRequest( message, accessor );        
	OAuth.SignatureMethod.sign( message, accessor );
	var access_URL = action + "?" + OAuth.formEncode( message.parameters );

 	if( method == "GET" )
 	{
		jsonp_fetch( access_URL );
	}
	else if( method == "POST")
	{
		post_method( access_URL , arguments[3] );
	}
	else if( method == "PIPES")
	{
		jsonp_fetch( "http://pipes.yahoo.com/pipes/pipe.run?_id=c61a07bae7f57ad13c74a0fec778c68c&_render=json&" + access_URL.replace(/(^.+json\?)/ , "") );	
	}

 return true;
};

retreveHome = function(data)
{
	var home = document.querySelector("#home");
	var insert_target = document.querySelector("#home > .read.more");

	for( i = 0 ; i < data.length ; i++ )
	{
		create_tweet_element( data[i] ).buildEntry( home );
	}
}

retreveMention = function(data)
{
	var mention = document.querySelector("#mention");
	var insert_target = document.querySelector("#mention > .read.more");

	for( i = 0 ; i < data.length ; i++ )
	{
		create_tweet_element( data[i] ).buildEntry( mention );
	}
}

retreveMine = function(data)
{
	for( i = 0 ; i < data.length ; i++ )
	{
		create_tweet_element( data[i] );
	}
}

retreveList = function(data)
{
	var list = document.querySelector("#list");
	var insert_target = document.querySelector("#list > .read.more");

	for( i = 0 ; i < data.length ; i++ )
	{
		create_tweet_element( data[i] ).buildEntry( list );
	}
}

updateHomeTimeline = function(data)
{
	var home = document.querySelector("#home");
	var insert_target = document.querySelector("#home > .entry");

	for( i = 0 ; i < data.length ; i++ )
	{
		create_tweet_element( data[i] ).buildEntry( home , "insert" , insert_target );
	}
}

updateMentionTimeline = function(data)
{
	var mention = document.querySelector("#mention");
	var insert_target = document.querySelector("#mention > .entry");

	for( i = 0 ; i < data.length ; i++ )
	{
		create_tweet_element( data[i] ).buildEntry( mention , "insert" , insert_target );
	}
}

updateListTimeline = function(data)
{
	var list = document.querySelector("#list");
	var insert_target = document.querySelector("#list > .entry");

	for( i = 0 ; i < data.length ; i++ )
	{
		create_tweet_element( data[i] ).buildEntry( list , "insert" , insert_target );
	}
}

create_tweet_element = function( data )
{
	var tweet_data = data;
	if( data.retweeted_status )
	{
		tweet_data.retweeted_status.id = tweet_data.id;
		tweet_data.retweeted_status.favorited = tweet_data.favorited;
		tweet_data = data.retweeted_status;
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
		mbdatabase.save_status( status_json );
		
	if( data.retweeted_status )
	{
		newTweet.rt_user_name				 = data.user.screen_name;
		newTweet.rt_profile_image_url		 = data.user.profile_image_url;
	}
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
