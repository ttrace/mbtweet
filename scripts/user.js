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

