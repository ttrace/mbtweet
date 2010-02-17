var mbtweet = {};

mbtweet = 
{
	debug			: true ,
	build			: 00023 ,
	version			: "1.0" ,
	bitly_token		: "",
	currentSearch	: "",
	database:
	{
		name		: "mbtweet",
		version		: "1.0"
	},
	user :
	{
		profile_image	: "",
		language	: navigator.language.substr(0,2),
		conv_length	: 2,
	},
	rate :
	{
		auth		: 0,
		ip			: 20,
		auth_reset	: 0,
		ip_reset	: 0,
	}
}


var mbtweetOAuth = {};

mbtweetOAuth =
{
	consumerKey   : "qemYQrHH04a3OqYTvBRVhA",
	consumerSecret: "rouEipefKjITze8qZSqi6jev1T7D6bHt3q7ZSj63A8",
	serviceProvider:
	{	signatureMethod     : "HMAC-SHA1",
  		requestTokenURL     : "http://twitter.com/oauth/request_token",
		userAuthorizationURL: "http://twitter.com/oauth/authorize", // a stub,
		accessTokenURL      : "http://twitter.com/oauth/access_token"
  }
};


init_mbtweet = function()
{
	restore_mb_settings();

	if( !mbtweetOAuth.accessToken.match(/^[0-9]{4,4}/) || mbtweetOAuth.accessTokenSecret == "")
	{
		alert("mbtweet requires OAuth authentication with Twitter.com");
		location.href = location.pathname + "about.html";
	}

	if(window.opera&&!window.console)
	{
		console={log:opera.postError};
	};


//	auto updater with using App Cache on HTML5
// Safari 4 can't run...
//     setInterval(function() {
// 	applicationCache.update();
//     }, 5000);
//     applicationCache.addEventListener(
//     	"updateready",
//     	function() {
// 		if (confirm("New update"))
// 		{
// 			applicationCache.swapCache();
// 			location.href = location.href;
// 		}
// 		},
// 	true);


	init_web_database();
	init_status_editor();
	init_shorten_url();
	init_window_resize();
	get_users_lists();
	get_saved_search();

	count_api_rate( { auth : true , main	: true} );
	setTimeout( function(){ count_api_rate( { auth : false , main : true } ) } , 3000 );
	
	var home = new timeline( "home" );
	var mention = new timeline( "mention" );

	mbtweetOAuth.callAPI(	"https://api.twitter.com/1/statuses/user_timeline.json" ,
							"GET",
							[
								["callback" , "retreveMine"],
								["count" , "100"]
							],
							{ retry : true , auth	: true }
						);
}

function count_api_rate( option )
{
	var callback_process = "countRate";
	if( option.auth == false) callback_process = "countNoAuthRate";
	mbtweetOAuth.callAPI(	"https://twitter.com/account/rate_limit_status.json" ,
							"GET",
							[
								["callback" , callback_process ],
							],
							{ method : "rate" , retry : true , auth	: option.auth }
						);

	if( option.main )
	{
		setTimeout( function(){ count_api_rate( { auth : option.auth , main : true } ) } , 600000 );
	}
}


post_tweet = function( form , event)
{
	event.preventDefault();
	var posting_status = form.status.value + "";
	if( form.hashtag.value != "")
	{
		posting_status = posting_status + " " + form.hashtag.value;
	}
	var posting_in_reply_to_stats_id = form.post_in_reply_to_status_id.value + "";
	mbtweetOAuth.callAPI(	"https://twitter.com/statuses/update.xml",
							"POST",
							[
								["status" , posting_status ],
								["in_reply_to_status_id" , posting_in_reply_to_stats_id ],
							],
							[ "status_update" ]
						);
	return true;
}

/*
_test_post_tweet = function( form , event)
{
	event.preventDefault();
	var posting_status = form.status.value + "";
	var posting_in_reply_to_stats_id = form.post_in_reply_to_status_id.value + "";
	mbtweetOAuth.callAPI(	"http://twitter.com/statuses/update.json" ,
							"PIPES",
							[
								["status" , posting_status ],
								["in_reply_to_status_id" , posting_in_reply_to_stats_id ],
							],
							[ "status_update" ]
						);
	return true;
}
*/

reply_to = function( in_reply_to_screen_name , in_reply_to_status_id )
{
	var status_editor = document.querySelector("#status");
	var status_id_container = document.querySelector("#post_in_reply_to_status_id");
	var reply_to_container = document.querySelector("#in_reply_to");
		reply_to_container.value = "@" + in_reply_to_screen_name;
	var reply_link = document.querySelector("#reply_link");
		reply_link.checked = true;

	if( arguments[2] )
	{
//		status_editor.value += "@" + in_reply_to_screen_name;
		if(mbtweet.debug)window.console.log( arguments[2] );
		arguments[2].push( "@" + in_reply_to_screen_name );
		var user_list_string = "";
		for(key in arguments[2])
		{
			var other_user = arguments[2][key].match( /@([a-zA-Z0-9_]+)/ )[1];
			if(mbtweet.debug)window.console.log( arguments[2] , other_user , other_user != in_reply_to_screen_name , other_user != mbtweet.user.screen_name , !status_editor.value.match( new RegExp(other_user) ));
			if( other_user != mbtweet.user.screen_name && !status_editor.value.match( new RegExp(other_user) ) && !user_list_string.match( new RegExp(other_user) ) )
			{
				user_list_string = "@" + other_user + " " + user_list_string;
			}
		}
		status_editor.value += user_list_string;
	}
	else
	{
		status_editor.value = "@" + in_reply_to_screen_name + " ";
	}
	//status_editor.value += " ";
	status_id_container.value = in_reply_to_status_id;
	status_editor.focus();
	status_editor.setSelectionRange(status_editor.value.length, status_editor.value.length);
}

remove_in_reply_to = function()
{
	var status_id_container = document.querySelector("#post_in_reply_to_status_id");
		status_id_container.value = "";

	var reply_link = document.querySelector("#reply_link");
		reply_link.checked = false;
}

reply_to_message = function( in_reply_to_screen_name )
{
	var status_editor = document.querySelector("#status");
	var status_id_container = document.querySelector("#post_in_reply_to_status_id");
	status_editor.value = "D " + in_reply_to_screen_name + " ";

	status_id_container.value = "";
	status_editor.focus();
	status_editor.setSelectionRange(status_editor.value.length, status_editor.value.length);
}

quote_this = function( in_reply_to_screen_name , in_reply_to_status_id , status_string )
{
	var status_editor 		= document.querySelector("#status");
	var status_id_container = document.querySelector("#post_in_reply_to_status_id");
	var quote_url 			= "http://twitter.com/" + in_reply_to_screen_name + "/status/" + in_reply_to_status_id;
	status_editor.value = "“" + status_string + "” (via @" + in_reply_to_screen_name + " " + quote_url + ")";
	status_id_container.value = "";
	status_editor.focus();
	status_editor.setSelectionRange( 0 , 0 );
}

retweet_this = function( tweet_id_string )
{
	if( confirm("Retweet to your followers?") )
	{
		var retweeting_id = tweet_id_string + "";
		var target_tweet	= document.querySelector( "#" + retweeting_id );
		var retweet_button= target_tweet.querySelector( ".retweet" );
	
		if( !hasClass( retweet_button , "dimm") ) 	// prohibiting to redundant translation
		{
			mbtweetOAuth.callAPI(	"https://api.twitter.com/1/statuses/retweet/" + retweeting_id.match(/[0-9]+$/) + ".xml" ,
									"POST",
									[
									],
									[ "retweet" , retweeting_id , ""]
								);
		}
		return true;
	}
}

legacy_retweet = function( in_reply_to_screen_name , in_reply_to_status_id , status_string )
{
	var status_editor 		= document.querySelector("#status");
	var status_id_container = document.querySelector("#post_in_reply_to_status_id");
	var quote_url 			= "http://twitter.com/" + in_reply_to_screen_name + "/status/" + in_reply_to_status_id;
	if( status_editor.value != ("@" + in_reply_to_screen_name + " ") )
	{
		if(mbtweet.debug)window.console.log( "regacy RT" ,status_editor.value, ("@" + in_reply_to_screen_name),status_editor.value );
		status_id_container.value = "";	
	}
	status_editor.value = "RT @" + in_reply_to_screen_name + ": "+ status_string;
	status_editor.focus();
	if(mbtweet.debug)window.console.log( "regacy RT" , status_id_container.value );
	status_editor.setSelectionRange( 0 , 0 );
}

favorite_this = function( status_id_string , tweet_id_string , fave_status )
{
	var favorited		= fave_status;
	var favorite_id		= status_id_string + "";
	var method_url		= "";

	var target_tweet	= document.querySelector( "#" + tweet_id_string );
		addClass( target_tweet , "loading" );

	if( !hasClass( target_tweet , "favorited" ) )
	{
		favorited = false;
		method_url = "http://twitter.com/favorites/create/" + favorite_id + ".xml";
	}
	else
	{
		favorited = true;
		method_url = "http://twitter.com/favorites/destroy/" + favorite_id + ".xml";	
	}
	if( mbtweet.debug )window.console.log([ "favorite", favorite_id, tweet_id_string , favorited ]);
	mbtweetOAuth.callAPI(	method_url ,
							"POST",
							[
							],
							[ "favorite" , tweet_id_string , favorited ]
						);
	return true;
}

destroy_this = function( status_id_string , tweet_id_string )
{
	if( confirm("Sure you want to delete this tweet?") )
	{
		var status_id = status_id_string;
		var target_tweet	= document.querySelector( "#" + tweet_id_string );
	
		method_url = "https://twitter.com/statuses/destroy/" + status_id + ".xml";
		if( mbtweet.debug )window.console.log([ "destroy", status_id_string, tweet_id_string ]);
	
		mbtweetOAuth.callAPI(	method_url ,
								"POST",
								[
								],
								[ "destroy" , status_id_string ]
							);
		return true;
	}
}

destroy_this_message = function( status_id_string , tweet_id_string )
{
	if( confirm("Sure you want to delete this message?") )
	{
		var status_id = status_id_string;
		var target_tweet	= document.querySelector( "#" + tweet_id_string );
	
		method_url = "https://twitter.com/direct_messages/destroy/" + status_id + ".xml";
		if( mbtweet.debug )window.console.log([ "destroy", status_id_string, tweet_id_string ]);
	
		mbtweetOAuth.callAPI(	method_url ,
								"POST",
								[
								],
								[ "destroy" , status_id_string ]
							);
		return true;
	}
}

translate_this = function( tweet_id_string , status_text_string )
{
	var target_query = "#" + tweet_id_string;
	var target_tweet	= document.querySelector( target_query );
	var insert_point	= target_tweet.querySelector(".u-string");
	var translate_button		= target_tweet.querySelector( ".translate" );

	if( !hasClass( translate_button , "dimm") )
	{	// prohibiting to redundant translation
		translate_button.className = "translate dimm"
	
		var translated				= document.createElement("DIV");
			translated.className	= "translated loading";
			translated.innerText	= "loading";

		var jsonp_src		= "http://www.google.com/uds/Gtranslate?callback=gTransExp&q=" + encodeURIComponent( status_text_string ) + "&key=notsupplied&v=1.0&nocache=1240207680396&langpair=%7C" + mbtweet.user.language;
//		var jsonp_src		= "http://www.google.com/uds/Gtranslate?callback=gTransExp&context=" + tweet_id_string + "&q=" + encodeURIComponent( status_text_string ) + "&key=notsupplied&v=1.0&nocache=1240207680396&langpair=%7C" + mbtweet.user.language;
// 			translated.addEventListener( "webkitAnimationEnd",
// 										function( event )
// 										{
// 											jsonp_fetch( jsonp_src );										
// 										},
// 										false);
		insert_point.appendChild( translated );
		jsonp_fetch( jsonp_src );
	}
	return false;
}
