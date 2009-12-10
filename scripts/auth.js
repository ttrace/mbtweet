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
		conv_length	: 3,
	}
}

mbtweetOAuth =
{
	consumerKey   	: "qemYQrHH04a3OqYTvBRVhA",
	consumerSecret	: "rouEipefKjITze8qZSqi6jev1T7D6bHt3q7ZSj63A8",
	serviceProvider	: {signatureMethod     : "HMAC-SHA1" }
};

init_auth = function()
{
	var captured_oauth_token = "";
	if( location.search.match(/\?oauth_token/) )
	{
		captured_oauth_token = location.search.match(/\?oauth_token\=(.+)/)[1];
		restore_mb_settings();
		mbtweetOAuthActivate.oauth_token_secret = mbtweetOAuth.oauth_token_secret;

		document.querySelector("#start").style.display = "none";
		document.querySelector("#post_key").style.display = "none";
		document.querySelector("#go_pbtweet").style.display = "block";

		mbtweetOAuthActivate.callAPI(	"http://twitter.com/oauth/access_token" ,
						"POST",
						[
							["oauth_token" , captured_oauth_token],
						]
					);
	}
}

jump_to_auth_page = function()
{
	var key_list = document.forms[0].keys.value.match(/^oauth_token\=(.+)\&oauth_token_secret\=(.+)$/);
	if( key_list.length != 0 )
	{
		mbtweetOAuth.accessToken		= key_list[1];
		mbtweetOAuth.accessTokenSecret	= key_list[2];
		save_storage_Changes();
		location.href = "http://twitter.com/oauth/authorize?" + key_list[0];
	}
	else
	{
		alert( "Please copy all text and paste to OAuth token and token secret keys." );
	}
}

open_pbtweet = function()
{
	var key_list = document.forms[0].pbkey.value.split("&");
	if( key_list.length != 0 )
	{
		mbtweetOAuth.accessToken		= key_list[0].match(/oauth_token\=(.+)/)[1];
		mbtweetOAuth.accessTokenSecret	= key_list[1].match(/oauth_token_secret\=(.+)/)[1];
		mbtweet.user.screen_name		= key_list[3].match(/screen_name\=(.+)/)[1];
		save_storage_Changes();
		location.href = "http://taiyolab.com/pbtweet_app/";
	}
	else
	{
		alert( "Please copy all text and paste to activate keys." );
	}
}

mbtweetOAuthActivate =
{
	consumerKey		: mbtweetOAuth.consumerKey,
	consumerSecret	: mbtweetOAuth.consumerSecret,
	serviceProvider	: mbtweetOAuth.serviceProvider,
};

request_token  = function()
{
	mbtweetOAuthActivate.callAPI(	"http://twitter.com/oauth/request_token" ,
							"POST",
							[
								["callback" , "retreveRequestToken"],
							]
						);
}

retreveRequestToken = function(data)
{
    window.console.log( data );
}

mbtweetOAuthActivate.callAPI = function( action , method, parameter )
{
    var accessor = { consumerSecret: mbtweetOAuthActivate.consumerSecret };
    var message = { action: action
                  , method: method
                  , parameters: 
                  	[
                  		[ "oauth_consumer_key" , mbtweetOAuthActivate.consumerKey ],
                  		[ "oauth_signature_method" , mbtweetOAuthActivate.signatureMethod ],
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
	else
	{
		post_activate( access_URL );
	}

 return true;
}

post_activate = function( url )
{
	if( document.querySelector("#proxy_frame") )
	{
		document.querySelector("#post").removeChild( document.querySelector("#proxy_frame") );
	}
	
	var proxy_token			= guid();
	var pxcatch_frame = document.createElement("IFRAME");
		pxcatch_frame.id	= proxy_token;
		pxcatch_frame.name	= proxy_token;
		//pxcatch_frame.style.display = "none";
		document.querySelector("#post").appendChild( pxcatch_frame );

	if( location.href.match(/\?oauth_token\=/) )
	{
		pxcatch_frame.addEventListener(
			"load",
			function(event)
			{
				document.querySelector("#start").style.display = "none";
				document.querySelector("#post_key").style.display = "none";
				document.querySelector("#go_pbtweet").style.display = "block";
			},
			true
		);
	}
	else
	{
		pxcatch_frame.addEventListener(
			"load",
			function(event)
			{
				document.querySelector("#start").style.display = "none";
				document.querySelector("#post_key").style.display = "block";
			},
			true
		);
	}

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
