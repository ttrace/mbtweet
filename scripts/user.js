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

create_user_element = function( data , cache , cursor )
{
	var user_data = data;
	var newUser	= new user();

		newUser.created_at			 = user_data.created_at;
		newUser.description			 = user_data.description;
		newUser.favourites_count	 = user_data.favourites_count;
		newUser.followers_count		 = user_data.followers_count;
		newUser.following			 = user_data.following;
		newUser.friends_count		 = user_data.friends_count;
		newUser.geo_enabled			 = user_data.geo_enabled;
		newUser.user_id				 = user_data.id;
		newUser.location			 = user_data.location;
		newUser.name				 = user_data.name;
		newUser.notifications		 = user_data.notifications;
		newUser.user_protected		 = user_data.protected;
		newUser.screen_name			 = user_data.screen_name;
		newUser.statuses_count		 = user_data.statuses_count;
		newUser.time_zone			 = user_data.time_zone;
		newUser.utc_offset			 = user_data.utc_offset;
		newUser.url					 = user_data.url;
		newUser.verified				 = user_data.verified;
		newUser.profile_background_color		 = user_data.profile_background_color;
		newUser.profile_background_image_url	 = user_data.profile_background_image_url;
		newUser.profile_background_tile		 = user_data.profile_background_tile;
		newUser.profile_image_url				 = user_data.profile_image_url;
		newUser.profile_link_color			 = user_data.profile_link_color;
		newUser.profile_sidebar_border_color	 = user_data.profile_sidebar_border_color;
		newUser.profile_sidebar_fill_color	 = user_data.profile_sidebar_fill_color;
		newUser.profile_text_color			 = user_data.profile_text_color;

	// later cache-able codes

	return( newUser );
}

user.prototype.buildUserInfo = function( target , append_mode )
{
	var entry_wrapper = document.createElement("DIV");
		entry_wrapper.className = "entry";
		entry_wrapper.id = target.id + "-" + this.user_id;
	this.entry_wrapper = entry_wrapper;

	var icon_wrapper = document.createElement("DIV");
		icon_wrapper.className = "icon_wrapper";
	entry_wrapper.appendChild( icon_wrapper );

	var icon = document.createElement("DIV");
		icon.className = "icon";
		icon.style.backgroundImage = "url(" + this.profile_image_url + ")";
	icon_wrapper.appendChild( icon );

	var status_wrapper = document.createElement("DIV");
		status_wrapper.className = "u-status";
	entry_wrapper.appendChild( status_wrapper );

	var status_string_wrapper = document.createElement("DIV");
		status_string_wrapper.className = "u-string";
	status_wrapper.appendChild( status_string_wrapper );
		
	var user_name = document.createElement("A");
		user_name.className = "user-name";
		user_name.href = "http://twitter.com/" + this.screen_name;
		user_name.innerText = this.screen_name;
		user_name.title = this.name;
		user_name.target = "_blank";
	status_string_wrapper.appendChild( user_name );

	var string = document.createElement("SPAN");
		string.className = "status-text";
	var linked_source = "";
	if( this.description )
	{
		linked_source += this.description;
	}
// 		string.innerHTML = anchor_HTML(linked_source);
	if( this.following && target.id.match(/^followers/) )
	{
		linked_source += "<br><b>Following</b>" ;
	}
		linked_source += "<br><b>number of Following : </b>" + this.friends_count;
		linked_source += "<br><b>number of Followers : </b>" + this.followers_count;
		linked_source += "<br><b>Tweets: </b>" + this.statuses_count;
	if( this.location )
	{
		linked_source += "<br><b>Location: </b>" + this.location;
	}
 		string.innerHTML = linked_source;
	status_string_wrapper.appendChild( string );

	var sname_list = status_string_wrapper.querySelectorAll("a.user-name , a.sname");
	for( var i = 0 ; i < sname_list.length ; i++ )
	{
		var load_with_auth = false;
		if( hasClass( sname_list[i] , "user-name" ) && this.user_protected )
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

	var meta = document.createElement("DIV");
		meta.className = "status-meta";
	var meta_source = "Created at " + new Date( this.created_at ).toString().replace(/:[0-9][0-9]\s.+/,'');
		meta.innerHTML = meta_source;
	status_wrapper.appendChild( meta );

	var append_status_id = this.status_id;
	var option = arguments[2];
		option.cursor = cursor;

	append_status( append_status_id , entry_wrapper , target , "insert" , option );
}
