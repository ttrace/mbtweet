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
				this._geo = null;
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

create_tweet_element = function( data , cache )
{
	var tweet_data = data;
//	if(mbtweet.debug)if( tweet_data.geo )window.console.log( JSON.stringify(tweet_data.geo) , tweet_data.id );

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
		// adding tweet object behavior
		newTweet.user = new user();

		newTweet.status_id					 = tweet_data.id;
		newTweet.created_at					 = tweet_data.created_at;
		newTweet.in_reply_to_screen_name	 = tweet_data.in_reply_to_screen_name;
		newTweet.in_reply_to_status_id		 = tweet_data.in_reply_to_status_id;
		newTweet.in_reply_to_user_id		 = tweet_data.in_reply_to_user_id;
		newTweet.favorited					 = tweet_data.favorited;
		// geolocation data type seems not fixed yet.
//	if( tweet_data.geo )
//	{
		newTweet.geo						 = tweet_data.geo;
//	}
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
	var newTweet = new tweet();
		newTweet.user = new user();

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

tweet.prototype.buildEntry = function( target , append_mode )
{
	var conv_length = mbtweet.user.conv_length;
	if( append_mode == "conv")
	{
		conv_length = arguments[2] - 1;
	}

	var entry_wrapper = document.createElement("DIV");
		entry_wrapper.className = "entry";
		entry_wrapper.id = target.id + "-" + this.status_id;
	this.entry_wrapper = entry_wrapper;

	if( append_mode == "conv" ) //conversation id
	{
		entry_wrapper.id = target.id + "_"+ this.status_id;
	}

	var isRetweeted = false;

	if( this.user.screen_name == mbtweet.user.screen_name )
	{
		entry_wrapper.className += " mine";
	}
	else if( this.text.match( RegExp( "@" + mbtweet.user.screen_name ) ) )
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

	var icon = document.createElement("DIV");
		icon.className = "icon";
		icon.style.backgroundImage = "url(" + this.user.profile_image_url + ")";
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
 		string.innerHTML = anchor_HTML(linked_source);
	status_string_wrapper.appendChild( string );

	// open new user's timeline in mbtweet
	var sname_list = status_string_wrapper.querySelectorAll("a.user-name , a.sname");
	for( var i = 0 ; i < sname_list.length ; i++ )
	{
		var load_with_auth = false;
		if( hasClass( sname_list[i] , "user-name" ) && this.user.user_protected )
		{
			load_with_auth = true;
		}
		sname_list[i].load_with_auth = load_with_auth;
		sname_list[i].addEventListener( "click" ,
										function( event )
										{
											if( !event.shiftKey )  // Shift click openes Twitter Website
											{
												event.preventDefault();
												new_user_timeline( event.target , event.target.load_with_auth );
											}
										},
										false );
	}

	var hashtag_list =  status_string_wrapper.querySelectorAll("a.hashtag");
	for( var i = 0 ; i < hashtag_list.length ; i++ )
	{
		//var query = hashtag_list[i].innerText;
		//window.console.log( query );
		hashtag_list[i].addEventListener( 	"click",
											function( event )
											{
												if( !event.shiftKey )
												{
													event.preventDefault();
													new_search_timeline( event.target.innerText );
												}
												else
												{
													event.preventDefault();
													new_search_timeline( event.target.innerText , mbtweet.user.language );												
												}
											},
											false );
	}

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

			var media_wrapper = document.createElement("DIV");
				media_wrapper.className = "thumbnail";
			var media_anchor = document.createElement("A");
				media_anchor.className = "thumbnail";
				media_anchor.target = "_blank";
			var media_thumbnail = document.createElement("IMG");
				media_thumbnail.className = "thumbnail";
				
			media_anchor.appendChild( media_thumbnail );
			media_wrapper.appendChild( media_anchor );
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
	if( this.source )
	{
		// tweet.source is not exist on direct messages
		meta_source += "from " + this.source + " ";
	}
		meta.innerHTML = meta_source;

	if( this.geo != null && this.geo != "null" && this.geo )
	{
//		if(mbtweet.debug)window.console.log( "in building tweet elements" , this.geo , this.status_id );

		var geolocation						= document.createElement("DIV");
			geolocation.className			= "geolocation";
			geolocation.id			= entry_wrapper.id + "-geo";			

		var geolocation_anchor				= document.createElement("A");
			geolocation_anchor.className	= "geolocation";
			geolocation_anchor.href			= "http://maps.google.com/?q=" + this.geo.coordinates[0] + "," + this.geo.coordinates[1] + "&ll=" + this.geo.coordinates[0] + "," + this.geo.coordinates[1] + "&z=";
			geolocation_anchor.target		= "_blank";
			geolocation_anchor.innerText	= "➢";
			
			get_geolocation_info( geolocation.id , [ this.geo.coordinates[0] , this.geo.coordinates[1] ]);
			
			geolocation.appendChild( geolocation_anchor );
			status_string_wrapper.insertBefore( geolocation , string );
	}
		
	status_wrapper.appendChild( meta );
	
	status_wrapper.tweet = this;
	status_wrapper.addEventListener(	"mouseover",
											function( event )
											{
												if( event.eventPhase == 1 )
												{
													if( event.target.parentNode.tweet && !hasClass( event.target , "thumbnail" ) )
													{
														event.target.parentNode.tweet.popMeta();
														event.stopPropagation();
													}
													else if( event.target.parentNode.parentNode.tweet && !hasClass( event.target , "thumbnail" ) )
													{
														event.target.parentNode.parentNode.tweet.popMeta();
														event.stopPropagation();
													}
												}
												else if( event.eventPhase == 2 )
												{
													//event.stopPropagation();
													event.target.tweet.popMeta();
												}
											},
											true
											);

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
				conv_chain.id			= "conv-" + entry_wrapper.id;
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

tweet.prototype.remove_action = function( event )
{
	var action_list = this.entry_wrapper.querySelectorAll( ".action" );
	if( action_list.length > 0)
	{
		action_list[0].parentNode.removeChild( action_list[0] );
	}
}

tweet.prototype.popMeta = function()
{
	var entry_wrapper = this.entry_wrapper;

	if( entry_wrapper.querySelector('.u-status').querySelectorAll(".action").length == 0 )
	{
		var other_menu = document.querySelectorAll( ".action" );
		if( other_menu.length > 0)
		{
			for( var i = 0 ; i < other_menu.length ; i++)
			{
				other_menu[i].parentNode.removeChild( other_menu[i] );
			}
		}
		// action menu build
		var action = document.createElement("DIV");
			action.className = "action";
	
		var user_name = this.user.screen_name + "";
		var status_id_string = this.status_id + "";
		var status_text_string = this.text + "";
		var tweet_id_string		= entry_wrapper.id + ""; 
	
		if( !entry_wrapper.id.match(/^messages/))
		{
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
			if( this.user.user_protected == false && this.user.screen_name != mbtweet.user.screen_name )
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
			
			// delete menu build
			if( this.user.screen_name == mbtweet.user.screen_name )
			{
				var destroy			= document.createElement("A");
					destroy.className = "destroy";
				destroy.innerText = "Delete";
				destroy.addEventListener("click" ,
										function( event )
										{
											event.preventDefault();
											destroy_this( status_id_string , tweet_id_string );
										},
										false );

				action.appendChild( destroy );		
			}
		}
		else // direct messages
		{
			// reply menu build
			var reply			= document.createElement("A");
				reply.className	= "reply";
				reply.href		= "http://twitter.com/" + this.user.screen_name + "";
		
				reply.addEventListener("click" ,
										function( event )
										{
											event.preventDefault();
											reply_to_message( user_name );									
										},
										false );
				reply.innerText = "Reply";
				action.appendChild( reply );
		}
		entry_wrapper.querySelector(".u-status").appendChild( action );
	}
}

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
			var timeline			= document.querySelector( "#" + entry_wrapper.id.match(/([a-zA-Z0-9_]+)\-[0-9]+/)[1] );
			var target_scrollTop	= timeline.scrollTop;
			var current_margin		= 0;
			
			switch ( append_mode )
			{
				case "insert":
						target.insertBefore( entry_wrapper , option );
					break;
				
				case "conv":
						var original_status_id = status_id;
						var timeline_name = target.id.match(/conv\-([a-zA-Z0-9_]+)/)[1];
						var load_conv_button = target.querySelector( ".load-conv" );
						if( hasClass( load_conv_button , "noreply") )
						{
							removeClass( load_conv_button , "noreply");
							addClass( load_conv_button , "no-reply");
							current_margin =- 36;
						}
					
						var original_element_id = timeline_name + "-" + original_status_id;
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

			unread_counter( timeline.id );			
			// fixsing view
			if( entry_wrapper.offsetTop <= target_scrollTop + 4 )
			{
				timeline.scrollTop = target_scrollTop + entry_wrapper.offsetHeight + current_margin;

				if( append_mode != "conv" )
				{
					if( !hasClass(entry_wrapper.nextElementSibling , "read-more") )
					{
						addClass( entry_wrapper , "unread" );
					}
					entry_wrapper.addEventListener( 
						"click" ,
						function( event ){
							event.stopPropagation();
							remove_unread( target_id );
						},
						false );
				}
				unread_counter( timeline.id );
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
		//counting number of tweets.
		unread_counter( target.id );
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
							newTweet.user = new user();
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
							newTweet.geo						 = eval('(' + status_row['geo'] + ')');
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
