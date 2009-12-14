var mbtweet = {};

mbtweet = 
{
	debug			: true ,
	build			: 00001 ,
	version			: "1.0" ,
	bitly_token		: "",
	database:
	{
		name		: "mbtweet",
		version		: "1.0"
	},
	user :
	{
		language	: navigator.language.substr(0,2),
		conv_length	: 2,
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
	init_shorten_url();
	init_window_resize();	

	mbtweetOAuth.callAPI(	"https://api.twitter.com/1/statuses/home_timeline.json" ,
							"GET",
							[
								["callback" , "retreveHome"],
								["count" , "100"]
							],
							{ retry : true }
						);

	mbtweetOAuth.callAPI(	"http://twitter.com/statuses/mentions.json" ,
							"GET",
							[
								["callback" , "retreveMention"],
								["count" , "20"]
							],
							{ retry : true }
						);

	mbtweetOAuth.callAPI(	"https://twitter.com/statuses/user_timeline.json" ,
							"GET",
							[
								["callback" , "retreveMine"],
								["count" , "100"]
							],
							{ retry : true }
						);


// 	mbtweetOAuth.callAPI(	"http://api.twitter.com/1/t_trace/lists/279034/statuses.json" ,
// 							"GET",
// 							[
// 								["callback" , "retreveList"],
// 								["per_page" , "20"]
// 							]
// 						);

	setTimeout( function(){ update_home() } , 90000 );
	setTimeout( function(){ update_mention() } , 130000 );
//	setTimeout( function(){ update_list() } , 120000 );
}

update_home = function()
{
	var since_id = document.querySelector("#home > .entry").id.replace(/[a-z]+_/ , "") + "";
	mbtweetOAuth.callAPI(	"https://api.twitter.com/1/statuses/home_timeline.json" ,
							"GET",
							[
								["callback" , "updateHomeTimeline"],
								["since_id" , since_id],
								["count" , "200"]
							]
						);
	setTimeout( function(){ update_home() } , 90000 );
	return false;
}

update_mention = function()
{
	var since_id = document.querySelector("#mention > .entry").id.replace(/[a-z]+_/ , "") + "";
	mbtweetOAuth.callAPI(	"https://twitter.com/statuses/mentions.json" ,
							"GET",
							[
								["callback" , "updateMentionTimeline"],
								["since_id" , since_id]
							]
						);
	setTimeout( function(){ update_mention() } , 120000 );
	return false;
}

update_list = function()
{
	var since_id = document.querySelector("#list > .entry").id.replace(/[a-z]+_/ , "") + "";
	mbtweetOAuth.callAPI(	"http://api.twitter.com/1/t_trace/lists/279034/statuses.json" ,
							"GET",
							[
								["callback" , "updateListTimeline"],
								["since_id" , since_id]
							]
						);
	setTimeout( function(){ update_list() } , 120000 );
	return false;
}

post_tweet = function( form , event)
{
	event.preventDefault();
	var posting_status = form.status.value + "";
	var posting_in_reply_to_stats_id = form.post_in_reply_to_status_id.value + "";
	mbtweetOAuth.callAPI(	"https://twitter.com/statuses/update.xml" ,
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
	status_editor.value = "@" + in_reply_to_screen_name;

	if( arguments[2] )
	{
		var user_list_string = "";
		for(key in arguments[2])
		{
			var other_user = arguments[2][key].match( /@([a-zA-Z0-9_]+)/ )[1];
			if( other_user != in_reply_to_screen_name && other_user != mbtweet.user.screen_name )
			{
				user_list_string += " @" + other_user;
			}
		}
		status_editor.value += user_list_string;
	}
	status_editor.value += " ";
	status_id_container.value = in_reply_to_status_id;
	status_editor.focus();
	status_editor.setSelectionRange(status_editor.value.length, status_editor.value.length);
}

quote_this = function( in_reply_to_screen_name , in_reply_to_status_id , status_string )
{
	var status_editor 		= document.querySelector("#status");
	var status_id_container = document.querySelector("#post_in_reply_to_status_id");
	var quote_url 			= "http://twitter.com/" + in_reply_to_screen_name + "/status/" + in_reply_to_status_id;
	status_editor.value = "“" + status_string + "” (via @" + in_reply_to_screen_name + " " + quote_url + " )";
	status_id_container.value = "";
	status_editor.focus();
	status_editor.setSelectionRange( 0 , 0 );
}

retweet_this = function( tweet_id_string )
{
	var retweeting_id = tweet_id_string + "";
	var target_tweet	= document.querySelector( "#" + retweeting_id );
	var retweet_button= target_tweet.querySelector( ".retweet" );

	if( !hasClass( retweet_button , "dimm") ) 	// prohibiting to redundant translation
	{
		mbtweetOAuth.callAPI(	"https://api.twitter.com/1/statuses/retweet/" + retweeting_id.match(/[0-9]+/) + ".xml" ,
								"POST",
								[
								],
								[ "retweet" , retweeting_id , ""]
							);
	}
	return true;
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
	window.console.log([ "favorite", favorite_id, tweet_id_string , favorited ]);
	mbtweetOAuth.callAPI(	method_url ,
							"POST",
							[
							],
							[ "favorite" , tweet_id_string , favorited ]
						);
	return true;
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
		
		insert_point.appendChild( translated );
		
		var jsonp_src		= "http://www.google.com/uds/Gtranslate?callback=gTransExp&context=" + tweet_id_string + "&q=" + encodeURIComponent( status_text_string ) + "&key=notsupplied&v=1.0&nocache=1240207680396&langpair=%7C" + mbtweet.user.language;
			jsonp_fetch( jsonp_src );
	}
	return false;
}
