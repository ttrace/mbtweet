tweet = function()
{
	var self = this;
}

tweet.prototype = {
/*
	tweet object's parameters
	this should be maintained same with tiwtter API response
	reference
	http://apiwiki.twitter.com/Twitter-REST-API-Method%3A-statuses-home_timeline
	
	parameter name id is changed into "status_id"
	parameter name "rt_user_name" is made for retweeted user.
	parameter name "rt_profile_image_url" is made for retweeted user.
*/

	get status_id ()
	{
		if (!("status_id" in this))
				this._status_id = 0;
		return this._status_id;
	},
	
	set status_id ( x )
	{
		this._status_id = x;
	},

	get created_at ()
	{
		if (!("_created_at" in this))
				this._created_at = "";
		return this._created_at;
	},
	
	set created_at ( x )
	{
		this._created_at = x;
	},

	get in_reply_to_screen_name ()
	{
		if (!("_in_reply_to_screen_name" in this))
				this._in_reply_to_screen_name = "";
		return this._in_reply_to_screen_name;
	},
	
	set in_reply_to_screen_name ( x )
	{
		this._in_reply_to_screen_name = x;
	},

	get in_reply_to_status_id ()
	{
		if (!("_in_reply_to_status_id" in this))
				this._in_reply_to_status_id = "";
		return this._in_reply_to_status_id;
	},
	
	set in_reply_to_status_id ( x )
	{
		this._in_reply_to_status_id = x;
	},

	get in_reply_to_user_id ()
	{
		if (!("_in_reply_to_user_id" in this))
				this._in_reply_to_user_id = "";
		return this._in_reply_to_user_id;
	},
	
	set in_reply_to_user_id ( x )
	{
		this._in_reply_to_user_id = x;
	},

	get favorited ()
	{
		if (!("_favorited" in this))
				this._favorited = false;
		return this._favorited;
	},
	
	set favorited ( x )
	{
		this._favorited = x;
	},

	get geo ()
	{
		if (!("_geo" in this))
				this._geo = {};
		return this._geo;
	},
	
	set geo ( x )
	{
		this._geo = x;
	},

	get source ()
	{
		if (!("_source" in this))
				this._source = "web";
		return this._source;
	},
	
	set source ( x )
	{
		this._source = x;
	},

	get text ()
	{
		if (!("_text" in this))
				this._text = "";
		return this._text;
	},
	
	set text ( x )
	{
		this._text = x;
	},

	get truncated ()
	{
		if (!("_truncated" in this))
				this._truncated = false;
		return this._truncated;
	},
	
	set truncated ( x )
	{
		this._truncated = x;
	},

	get rt_user_name ()
	{
		if (!("_rt_user_name" in this))
				this._rt_user_name = "";
		return this._rt_user_name;
	},
	
	set rt_user_name ( x )
	{
		this._rt_user_name = x;
	},

	get rt_profile_image_url ()
	{
		if (!("_rt_profile_image_url" in this))
				this._rt_profile_image_url = "";
		return this._rt_profile_image_url;
	},
	
	set rt_profile_image_url ( x )
	{
		this._rt_profile_image_url = x;
	},
	
	get screen_name ()
	{
		if (!("_screen_name" in this))
				this._screen_name = "";
		return this._screen_name;
	},
	
	set screen_name ( x )
	{
		this._screen_name = x;
	},

	get profile_image_url ()
	{
		if (!("_profile_image_url" in this))
				this._profile_image_url = "";
		return this._profile_image_url;
	},
	
	set profile_image_url ( x )
	{
		this._profile_image_url = x;
	},
}

user = function()
{
	var self = this;
}

user.prototype = 
{
/*
	user object's parameters
	this should be maintained same with tiwtter API response

	reference
	http://apiwiki.twitter.com/Twitter-REST-API-Method%3A-statuses-home_timeline
	
	parameter name "protect" is changed into "user_protected"
*/

	get created_at ()
	{
		if (!("_created_at" in this))
				this._created_at = "";
		return this._created_at;
	},
	
	set created_at ( x )
	{
		this._created_at = x;
	},

	get description ()
	{
		if (!("_description" in this))
				this._description = "";
		return this._description;
	},
	
	set description ( x )
	{
		this._description = x;
	},

	get favourites_count ()
	{
		if (!("_favourites_count" in this))
				this._favourites_count = 0;
		return this._favourites_count;
	},
	
	set favourites_count ( x )
	{
		this._favourites_count = x;
	},

	get followers_count ()
	{
		if (!("_followers_count" in this))
				this._followers_count = 0;
		return this._followers_count;
	},
	
	set followers_count ( x )
	{
		this._followers_count = x;
	},

	get following ()
	{
		if (!("_following" in this))
				this._following = false;
		return this._following;
	},
	
	set following ( x )
	{
		this._following = x;
	},

	get friends_count ()
	{
		if (!("_friends_count" in this))
				this._friends_count = 0;
		return this._friends_count;
	},
	
	set friends_count ( x )
	{
		this._friends_count = x;
	},

	get geo_enabled ()
	{
		if (!("_geo_enabled" in this))
				this._geo_enabled = false;
		return this._geo_enabled;
	},
	
	set geo_enabled ( x )
	{
		this._geo_enabled = x;
	},

	get user_id ()
	{
		if (!("_user_id" in this))
				this._user_id = 0;
		return this._user_id;
	},
	
	set user_id ( x )
	{
		this._user_id = x;
	},

	get location ()
	{
		if (!("_location" in this))
				this._location = "";
		return this._location;
	},
	
	set location ( x )
	{
		this._location = x;
	},

	get name ()
	{
		if (!("_name" in this))
				this._name = "";
		return this._name;
	},
	
	set name ( x )
	{
		this._name = x;
	},

	get notifications ()
	{
		if (!("_notifications" in this))
				this._notifications = false;
		return this._notifications;
	},
	
	set notifications ( x )
	{
		this._notifications = x;
	},

	get user_protected ()
	{
		if (!("_user_protected" in this))
				this._user_protected = false;
		return this._user_protected;
	},
	
	set user_protected ( x )
	{
		this._user_protected = x;
	},

	get screen_name ()
	{
		if (!("_screen_name" in this))
				this._screen_name = "";
		return this._screen_name;
	},
	
	set screen_name ( x )
	{
		this._screen_name = x;
	},
	
	get statuses_count ()
	{
		if (!("_statuses_count" in this))
				this._statuses_count = 0;
		return this._statuses_count;
	},
	
	set statuses_count ( x )
	{
		this._statuses_count = x;
	},

	get time_zone ()
	{
		if (!("_time_zone" in this))
				this._time_zone = "";
		return this._time_zone;
	},
	
	set time_zone ( x )
	{
		this._time_zone = x;
	},

	get utc_offset ()
	{
		if (!("_utc_offset" in this))
				this._utc_offset = 0;
		return this._utc_offset;
	},
	
	set utc_offset ( x )
	{
		this._utc_offset = x;
	},

	get url ()
	{
		if (!("_url" in this))
				this._url = "";
		return this._url;
	},
	
	set url ( x )
	{
		this._url = x;
	},

	get verified ()
	{
		if (!("_verified" in this))
				this._verified = false;
		return this._verified;
	},
	
	set verified ( x )
	{
		this._verified = x;
	},
	
	get profile_background_color ()
	{
		if (!("_profile_background_color" in this))
				this._profile_background_color = "#9ae4e7";
		return this._profile_background_color;
	},
	
	set profile_background_color ( x )
	{
		this._profile_background_color = x;
	},

	get profile_background_image_url ()
	{
		if (!("_profile_background_image_url" in this))
				this._profile_background_image_url = "";
		return this._profile_background_image_url;
	},
	
	set profile_background_image_url ( x )
	{
		this._profile_background_image_url = x;
	},

	get profile_background_tile ()
	{
		if (!("_profile_background_tile" in this))
				this._profile_background_tile = false;
		return this._profile_background_tile;
	},
	
	set profile_background_tile ( x )
	{
		this._profile_background_tile = x;
	},

	get profile_image_url ()
	{
		if (!("_profile_image_url" in this))
				this._profile_image_url = "";
		return this._profile_image_url;
	},
	
	set profile_image_url ( x )
	{
		this._profile_image_url = x;
	},

	get profile_link_color ()
	{
		if (!("_profile_link_color" in this))
				this._profile_link_color = "#0010f0";
		return this._profile_link_color;
	},
	
	set profile_link_color ( x )
	{
		this._profile_link_color = x;
	},

	get profile_sidebar_border_color ()
	{
		if (!("_profile_sidebar_border_color" in this))
				this._profile_sidebar_border_color = "#87bd04";
		return this._profile_sidebar_border_color;
	},
	
	set profile_sidebar_border_color ( x )
	{
		this._profile_sidebar_border_color = x;
	},

	get profile_sidebar_fill_color ()
	{
		if (!("_profile_sidebar_fill_color" in this))
				this._profile_sidebar_fill_color = "#e0f10a";
		return this._profile_sidebar_fill_color;
	},
	
	set profile_sidebar_fill_color ( x )
	{
		this._profile_sidebar_fill_color = x;
	},

	get profile_text_color ()
	{
		if (!("_profile_text_color" in this))
				this._profile_text_color = "#000000";
		return this._profile_text_color;
	},
	
	set profile_text_color ( x )
	{
		this._profile_text_color = x;
	},

}

tweet.prototype.buildEntry = function( target , append_mode )
{
	var conv_length = mbtweet.user.conv_length;
	if( append_mode == "conv")
	{
		conv_length = arguments[2] - 1;
	}

	var entry_wrapper = document.createElement("DIV");
		entry_wrapper.className = "entry";
		entry_wrapper.id = target.id + "_" + this.status_id;

	if( append_mode == "conv" ) //conversation id
	{
		entry_wrapper.id = target.id + "_"+ this.status_id;
	}

	var isRetweeted = false;

	if( this.user.screen_name == mbtweet.user.screen_name )
	{
		entry_wrapper.className += " mine";
	}
	else if( this.text.match( RegExp( mbtweet.user.screen_name ) ) )
	{
		entry_wrapper.className += " mention";
	}
	
	if( this.favorited == true )
	{
		entry_wrapper.className += " favorited";
	}

	if( this.rt_user_name != "")
	{
		entry_wrapper.className += " retweeted";	
		isRetweeted = true;
	}
	
	if( append_mode == "conv" )
	{
		entry_wrapper.className += " conv";	
	}

	var icon_wrapper = document.createElement("DIV");
		icon_wrapper.className = "icon_wrapper";
	entry_wrapper.appendChild( icon_wrapper );

	var icon = document.createElement("IMG");
		icon.className = "icon";
		icon.src = this.user.profile_image_url;
	icon_wrapper.appendChild( icon );

	if( isRetweeted )
	{
		var rt_icon = document.createElement("IMG");
			rt_icon.className = "rt-icon";
			rt_icon.src = this.rt_profile_image_url;
		icon_wrapper.appendChild( rt_icon );
	}
	
	var status_wrapper = document.createElement("DIV");
		status_wrapper.className = "u-status";
	entry_wrapper.appendChild( status_wrapper );

//	if( hasClass( entry_wrapper , "mine" ) )
//	{
//		entry_wrapper.insertBefore( status_wrapper , icon_wrapper );
//	}
	
	var status_string_wrapper = document.createElement("DIV");
		status_string_wrapper.className = "u-string";
	status_wrapper.appendChild( status_string_wrapper );
		
	var user_name = document.createElement("A");
		user_name.className = "user-name";
		user_name.href = "http://twitter.com/" + this.user.screen_name;
		user_name.innerText = this.user.screen_name;
		user_name.title = this.user.name;
		user_name.target = "_blank";
	status_string_wrapper.appendChild( user_name );

	if( isRetweeted )
	{
		var rt_connect = document.createElement("span");
			rt_connect.innerText = " > ";
		status_string_wrapper.appendChild( rt_connect );

		var rt_user_name = document.createElement("A");
			rt_user_name.className = "user-name";
			rt_user_name.href = "http://twitter.com/" + this.rt_user_name;
			rt_user_name.innerText = this.rt_user_name;
			rt_user_name.title = this.rt_user_name;
			rt_user_name.target = "_blank";
		status_string_wrapper.appendChild( rt_user_name );
	}
	
	// string build
	var string = document.createElement("SPAN");
		string.className = "status-text";

	var linked_source = this.text;
		linked_source = linked_source.replace( mbutil.isUrlRegexp		, "<a href='$1' target='_blank'>$1</a>$6");
		linked_source = linked_source.replace( /([^\/]|^)(www\.[\w\d:#@%\/;$\(\)~_\?\+-=\\\.&]+\.[\w\d:#@%\/;$\(\)~_\?\+-=\\\.&]+)/g , "<a href='http://$2' target='_blank'>$2</a>" );
		linked_source = linked_source.replace(/blank\'\>([^\<]{28})[^\<]+\<\/a/g, "blank'>$1...</a");
		linked_source = linked_source.replace(/#((([^\s\(\)\\\-\!\@\#\$\%\^\&\+\=\;\:\"\'\|\<\>\,\.\~\?]|[0-9a-zA-Z_])+[0-9a-zA-Z_]+){1,16}(\s+|$))/g ,"<a hashtag' href='" + window.location.protocol + "//twitter.com/search?q=%23$2' target='_blank'>#$2</a>$4");
		linked_source = linked_source.replace(/[@＠]([0-9a-zA-Z\_\-]+)/g,"@<a class='sname' href='" + window.location.protocol + "//twitter.com/$1' target='_blank'>$1</a>");

		string.innerHTML = linked_source.replace(/&amp;/g , "&amp;amp;");
	status_string_wrapper.appendChild( string );

	// image attachment
	var url_list = string.querySelectorAll("a");
	for( var i = 0 ; i < url_list.length ; i++ )
	{
		var media_url = url_list[i].href;
		var media_carrier = has_media_url( media_url );
		if( media_carrier )
		{
			// append blank image
			var media_blank = document.createElement("DIV");
				media_blank.className = "thumbnail_blank";
			status_string_wrapper.insertBefore( media_blank , status_string_wrapper.firstChild );

			var media_wrapper = document.createElement("A");
				media_wrapper.className = "thumbnail";
				media_wrapper.target = "_blank";
			var media_thumbnail = document.createElement("IMG");
				media_thumbnail.className = "thumbnail";
				
			media_wrapper.appendChild( media_thumbnail );
			entry_wrapper.insertBefore( media_wrapper , icon_wrapper );
			
			setTimeout( function()
				{
					fetch_media_thumbnail( entry_wrapper.id , media_url , media_carrier );
				}
				, 200 );
			
			break;
		}
	}
	
	// shorten URL expander
	for( var i = 0 ; i < url_list.length ; i++ )
	{
		var shorten_url = url_list[i].href;
		var shorten_url_carrier = has_shorten_url( shorten_url );	
		if( shorten_url_carrier )
		{
			// append shorten url event.
			addClass( url_list[i] , "shorten-url" );
			url_list[i].addEventListener( "mouseover",
											function( event )
											{
												addClass( event.target , "loading" );
												event.target.removeEventListener( "mouseover" , arguments.callee);
												url_expander( event.target , shorten_url_carrier );
											},
											false);
		}
	}
	
	var meta = document.createElement("DIV");
		meta.className = "status-meta";
	var meta_source;

		meta_source = new Date( this.created_at ).toString().replace(/:[0-9][0-9]\s.+/,'') + " ";
		meta_source += "from " + this.source + " ";
	
		meta.innerHTML = meta_source;
		
	status_wrapper.appendChild( meta );

	// action menu build
	var action = document.createElement("DIV");
		action.className = "action";

	var user_name = this.user.screen_name + "";
	var status_id_string = this.status_id + "";
	var status_text_string = this.text + "";
	var tweet_id_string		= entry_wrapper.id + ""; 


	// favorite menu build
	var fave_status = this.favorited;
	var favorite = document.createElement("A");
		favorite.className = "favorite";
		favorite.addEventListener("click" ,
								function( event )
								{
									favorite_this( status_id_string , tweet_id_string , fave_status );
								},
								false );
	if( this.favorited == false)
		{
			favorite.innerText = "★";
		}
		else
		{
			favorite.innerText = "☆";
		}
		action.appendChild( favorite );

	// Translate via menu build
	var translate			= document.createElement("A");
		translate.className	= "translate";
		translate.addEventListener("click" ,
									function( event )
									{
										translate_this( tweet_id_string , status_text_string )
									},
									false );
		translate.innerText = "Translate";
		action.appendChild( translate );


	// Quote via menu build
	var quote			= document.createElement("A");
		quote.className	= "quote";

	if( this.user.user_protected == false)
		{
			quote.addEventListener("click" ,
									function( event )
									{
										event.preventDefault();
										quote_this( user_name , status_id_string , status_text_string );
									},
									false );
		}
		// alerting notice for protected user.
		else
		{
			var alert_msg = user_name + " is protected.\nTake care for retweeting " + user_name + "'s tweet.";
			quote.addEventListener("click" ,
									function( event )
									{
										event.preventDefault();
										alert( alert_msg );
										quote_this( user_name , status_id_string , status_text_string );
									},
									false );		
		}
		quote.innerText = "Quote";
		action.appendChild( quote );

	// retweet menu build
	var retweet = document.createElement("A");
		retweet.className = "retweet dimm";
	if( this.user.user_protected == false)
		{
			retweet.className = "retweet";
			retweet.addEventListener("click" ,
									function( event )
									{
										if( !event.shiftKey )
										{
											retweet_this( tweet_id_string );
										}
										else
										{
											legacy_retweet( user_name , status_id_string , status_text_string );
										}
									},
									false );
			retweet.innerText = "ReTweet";
			action.appendChild( retweet );
		}

	// reply menu build
	var reply			= document.createElement("A");
		reply.className	= "reply";
		reply.href		= "http://twitter.com/" + this.user.screen_name + "";

	var user_name_list = this.text.match( /[@＠]([a-zA-Z0-9_]+)/g );
		reply.addEventListener("click" ,
								function( event )
								{
									event.preventDefault();
									if( event.shiftKey ) // reply all @[screen_name]
									{
										reply_to( user_name , status_id_string , user_name_list );
									}
									else
									{
										reply_to( user_name , status_id_string );									
									}
								},
								false );
		reply.innerText = "Reply";
		action.appendChild( reply );

		entry_wrapper.appendChild( action );

	// conversation chains
	if( hasClass( target , "conv" ) )
	{
		var load_conv_button = target.querySelector( ".load-conv" );
		target.removeChild( load_conv_button );

		var new_load_conv_button 	= document.createElement("DIV");
			new_load_conv_button.className = "load-conv";
											
 		if( this.in_reply_to_status_id != null && this.in_reply_to_status_id != "null" )
 		{
			new_load_conv_button.innerHTML = "load in reply to <a href='http://twitter.com/" + this.in_reply_to_screen_name + "/status/" + this.in_reply_to_status_id + "' target='_blank'>" + this.in_reply_to_screen_name + "</a>";
			var target_id = target.id;
			var my_status_in_reply_to_status_id = this.in_reply_to_status_id;
			new_load_conv_button.addEventListener( "click", 
													function( event )
														{
															window.console.log( event , this );
															load_conversation	( target_id , my_status_in_reply_to_status_id , 10 );
														},
													false);
 		}
 		else
 		{
 			new_load_conv_button.innerHTML = "";
			addClass( new_load_conv_button , "noreply" );
		}
		target.appendChild( new_load_conv_button );
	}
	
	if( this.in_reply_to_status_id != null && this.in_reply_to_status_id != "null" && conv_length > 0)
	{
		var my_status = this;

		if( hasClass( target , "conv" ) )
		{
			var target_id = target.id;
				my_status_in_reply_to_status_id = my_status.in_reply_to_status_id;
			
//			if( mbtweet.debug )window.console.log( target_id , my_status_in_reply_to_status_id , conv_length );
			
			setTimeout(
						(function( target_id , my_status_in_reply_to_status_id , conv_length )
							{
							load_conversation	( target_id , my_status_in_reply_to_status_id , conv_length )
							}
						)( target_id , my_status_in_reply_to_status_id , conv_length ),
						300 );
		}
		else
		{
			var conv_chain				= document.createElement("DIV");
				conv_chain.id			= "conv_" + entry_wrapper.id;
				conv_chain.className	= "conv";
	
			var load_conv_button 		= document.createElement("DIV");
				load_conv_button.className = "load-conv";
				load_conv_button.innerHTML = "load in reply to <a href='http://twitter.com/" + my_status.in_reply_to_screen_name + "/status/" + my_status.in_reply_to_status_id + "' target='_blank'>" + my_status.in_reply_to_screen_name + "</a>";

			var conv_chain_id = conv_chain.id;
			var my_status_in_reply_to_status_id = this.in_reply_to_status_id;
			var more_load_conv_length = mbtweet.conv_length;
			
			conv_chain.appendChild( load_conv_button );
			entry_wrapper.appendChild( conv_chain );

			load_conv_button.addEventListener( "click", 
													function( event )
														{
															window.console.log( event , this );
															load_conversation	( target_id , my_status_in_reply_to_status_id , 10 );
														},
													false);
			
			var conv_chain_id = conv_chain.id;
			var my_status_in_reply_to_status_id = my_status.in_reply_to_status_id;
// 			if( mbtweet.debug ) window.console.log(
// 								conv_chain_id ,
// 								my_status_in_reply_to_status_id,
// 								conv_length
// 							);


			setTimeout(
				(
					function(
								conv_chain_id ,
								my_status_in_reply_to_status_id,
								conv_length
							)
							{
							load_conversation	(
													conv_chain_id ,
													my_status_in_reply_to_status_id,
													conv_length
												)
							}
				)
				(
					conv_chain_id ,
					my_status_in_reply_to_status_id,
					conv_length
				),
			300 );
		}
	}

	var option = arguments[2];
	var append_status_id = this.status_id;
	append_status( append_status_id , entry_wrapper , target , append_mode , option );

	return false;
	
}

// adding tweet object behavior
tweet.prototype.user = new user();

/*
	status handling functions
	status_id		: appending tweet element's object id.
	entry_wrapper	: appending tweet element
	target			: appending parent element
	append_mode		: appending mode. insert or conversation
	option			: option values.
*/
function append_status( status_id , entry_wrapper , target , append_mode , option )
{
	var target_id = "#" + entry_wrapper.id;
	if( append_mode )
	{
		if( !target.querySelector( target_id ) )
		{
			var timeline			= document.querySelector( "#" + entry_wrapper.id.match(/([a-z]+)_[0-9]+/)[1] );
			var target_scrollTop	= timeline.scrollTop;
			var current_margin		= 0;
			
			switch ( append_mode )
			{
				case "insert":
						target.insertBefore( entry_wrapper , option );
					break;
				
				case "conv":
						var original_status_id = status_id;
						var timeline_name = target.id.match(/conv_([a-z]+)/)[1];
						var load_conv_button = target.querySelector( ".load-conv" );
						if( hasClass( load_conv_button , "noreply") )
						{
							removeClass( load_conv_button , "noreply");
							addClass( load_conv_button , "no-reply");
							current_margin =- 36;
						}
					
						var original_element_id = timeline_name + "_" + original_status_id;
						var removing_status	= document.querySelectorAll( "#" + original_element_id );

						if( removing_status.length != 0 )
						{
							if( removing_status[0].offsetTop <= target_scrollTop )
							{
								current_margin =- removing_status[0].offsetHeight;
							}
							if( option == (mbtweet.user.conv_length - 1) )
							{
								 //current_margin =- 10;
							}
							removing_status[0].parentNode.removeChild( removing_status[0] );
						}
						// try for listed item.
						if( hasClass( load_conv_button.previousElementSibling , "conv" ) )
						{
							//current_margin =- 6;
						}
						else
						{
							//current_margin =- 6;						
						}
						
						target.insertBefore( entry_wrapper , load_conv_button );
					break;
				default:
					break;
			}
			
			//counting number of tweets.
			timeline.parentNode.querySelector(".unread-counter").innerText = timeline.querySelectorAll(".unread").length + "/" + timeline.querySelectorAll(".entry:not(.conv)").length;

			// fixsing view
			if( entry_wrapper.offsetTop <= target_scrollTop + 1 )
			{
				timeline.scrollTop = target_scrollTop + entry_wrapper.offsetHeight + current_margin;

				if( append_mode != "conv" )
				{
					addClass( entry_wrapper , "unread" );
					entry_wrapper.addEventListener( 
						"click" ,
						function( event ){
							event.stopPropagation();
							remove_unread( target_id );
						},
						false );
				}
			}
		}
		else
		{
		//	if( mbtweet.debug )window.console.log( target_id , target );
		}
	}
	else
	{
		target.appendChild( entry_wrapper );
	}
}


load_conversation = function( conv_chain_id , in_reply_to_status_id , conv_length )
{
//	if( mbtweet.debug ) window.console.log( conv_chain_id , in_reply_to_status_id , conv_length );
	mbdatabase.db.transaction(
		function( tx ){
			tx.executeSql(
				"SELECT status_id , status_data.created_at , status_data.in_reply_to_screen_name , status_data.in_reply_to_status_id , status_data.in_reply_to_user_id , status_data.favorited , status_data.geo , status_data.source , status_data.text , status_data.truncated , status_data.screen_name , status_data.profile_image_url , user_data.user_protected , user_data.name FROM status_data, user_data WHERE ( status_id = ? AND status_data.screen_name = user_data.screen_name) LIMIT 1",
				[ in_reply_to_status_id + "" ],
				function( tx , result )
				{
					if( result.rows.length > 0)
					{
						var status_row = result.rows.item(0);
						var newTweet = new tweet();
							newTweet.status_id					 = status_row['status_id'];
							newTweet.created_at					 = status_row['created_at'];
							newTweet.in_reply_to_screen_name	 = status_row['in_reply_to_screen_name'];
							newTweet.in_reply_to_status_id		 = status_row['in_reply_to_status_id'];
							newTweet.in_reply_to_user_id		 = status_row['in_reply_to_user_id'];
						if( status_row['favorited'] == "true")
						{
							newTweet.favorited = true;
						}
						else
						{
							newTweet.favorited = false;							
						}
							newTweet.geo						 = status_row['geo'];
							newTweet.source						 = status_row['source'];
							newTweet.text						 = status_row['text'];
						if( status_row['truncated'] == "true")
						{
							newTweet.truncated = true;
						}
						else
						{
							newTweet.truncated = false;							
						}
							newTweet.user.screen_name			 = status_row['screen_name'];
							newTweet.user.name					 = status_row['name'];
							newTweet.user.profile_image_url		 = status_row['profile_image_url'];
						if( status_row['user_protected'] == "true")
						{
							newTweet.user.user_protected = true;
						}
						else
						{
							newTweet.user.user_protected = false;							
						}
						
						var conv_container = document.querySelectorAll( "#" + conv_chain_id );
						//if( mbtweet.debug ) window.console.log( conv_chain_id , "conv" , conv_length  );

						if( conv_container.length != 0 )
						{
							newTweet.buildEntry( conv_container[0] , "conv" , conv_length );
						}
					}
					else
					{
						//if( mbtweet.debug ) window.console.log( "not found " , in_reply_to_status_id  );					
					}
				},
				function( tx , error)
				{
					if( mbtweet.debug ) window.console.log( "on loading conversation:" , error );
				}
			);
		}
	);
	return false;
}
