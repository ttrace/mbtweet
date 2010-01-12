users_lists = function()
{
}

users_lists.prototype =
{
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

	get lists ()
	{
		if (!("_lists" in this))
				this._lists = [];
		return this._lists;
	},
	
	set lists ( x )
	{
		this._lists = x;
	},
}

list = function()
{
}

list.prototype =
{
	get list_id ()
	{
		if (!("_list_id" in this))
				this._list_id = "";
		return this._list_id;
	},
	
	set list_id ( x )
	{
		this._list_id = x;
	},

	get list_name ()
	{
		if (!("_list_name" in this))
				this._list_name = "";
		return this._list_name;
	},
	
	set list_name ( x )
	{
		this._list_name = x;
	},

	get full_name ()
	{
		if (!("_full_name" in this))
				this._full_name = "";
		return this._full_name;
	},
	
	set full_name ( x )
	{
		this._full_name = x;
	},

	get slug ()
	{
		if (!("_slug" in this))
				this._slug = "";
		return this._slug;
	},
	
	set slug ( x )
	{
		this._slug = x;
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

	get subscriber_count ()
	{
		if (!("_subscriber_count" in this))
				this._subscriber_count = 0;
		return this._subscriber_count;
	},
	
	set subscriber_count ( x )
	{
		this._subscriber_count = x;
	},

	get member_count ()
	{
		if (!("_member_count" in this))
				this._member_count = 0;
		return this._member_count;
	},
	
	set member_count ( x )
	{
		this._member_count = x;
	},

	get uri ()
	{
		if (!("_uri" in this))
				this._uri = "";
		return this._uri;
	},
	
	set uri ( x )
	{
		this._uri = x;
	},

	get mode ()
	{
		if (!("_mode" in this))
				this._mode = "public";
		return this._mode;
	},
	
	set mode ( x )
	{
		this._mode = x;
	},

}

get_users_lists = function( screen_name , target )
{
	if( !screen_name ) screen_name = mbtweet.user.screen_name;
	var target_id = "";
	if( target )target_id = target.id;

	eval( screen_name + "_s_list=function(data){retreveLists(data,'" + screen_name + "','" + target_id + "')}" );
	mbtweetOAuth.callAPI(	"http://api.twitter.com/1/" + screen_name + "/lists.json" ,
							"GET",
							[
								["callback" , screen_name + "_s_list" ]
							],
							{ retry : true , auth	: true }
						);

}

get_users_subscrption_lists = function( screen_name , target )
{
	var target_id = "";
	if( target )target_id = target.id;

	eval( screen_name + "_s_list=function(data){retreveLists(data,'" + screen_name + "','" + target_id + "','subscribe')}" );
	mbtweetOAuth.callAPI(	"http://api.twitter.com/1/" + screen_name + "/lists/subscriptions.json" ,
							"GET",
							[
								["callback" , screen_name + "_s_list" ]
							],
							{ retry : true , auth	: true }
						);
}

retreveLists = function( data , screen_name , target_id , type )
{
	var new_users_lists = new users_lists();
		new_users_lists.screen_name = screen_name;
	
	for( var i = 0 ; i < data.lists.length ; i++ )
	{
		var list_data = data.lists[i];
		var new_list = new list();
			new_list.user = new user();
			new_list.list_id			= list_data.id;
			new_list.list_name			= list_data.name;
			new_list.full_name			= list_data.full_name;
			new_list.slug				= list_data.slug;
			new_list.description		= list_data.description;
			new_list.subscriber_count	= list_data.subscriber_count;
			new_list.member_count		= list_data.member_count;
			new_list.uri				= list_data.uri;
			new_list.mode				= list_data.mode;
			
			new_list.user.screen_name		= list_data.user.screen_name;
			new_list.user.profile_image_url	= list_data.user.profile_image_url;
			
			new_users_lists.lists.push( new_list );
	}

	if( !type )
	{
		var menu_wrapper = create_list_menu( new_users_lists );
		get_users_subscrption_lists( screen_name , menu_wrapper );
	}
	else if(type == 'subscribe')
	{
		for( var i = 0 ; i < new_users_lists.lists.length ; i++ )
		{
			document.getElementById( target_id ).appendChild( list_index( new_users_lists.lists[i] ) );
		}	
	}
}

create_list_menu = function( users_lists )
{
	var lists = users_lists.lists;
	var menu_wrapper			= document.createElement("DIV");
		menu_wrapper.className	= "lists";
		menu_wrapper.id			= "index_of_" + users_lists.screen_name + "_s_lists";

	for( var i = 0 ; i < lists.length ; i++ )
	{
		menu_wrapper.appendChild( list_index( lists[i] ) );
	}
	
	if( mbtweet.user.screen_name == users_lists.screen_name )
	{
		document.querySelector("#my_lists").appendChild( menu_wrapper );
	}
	return( menu_wrapper );
}

list_index = function( list )
{
	var list_index 				= document.createElement("DIV");
		list_index.className	= "list-index";
		list_index.id			= "list_index_" + list.list_id;

//	if( mbtweet.user.screen_name != list.user.screen_name )
//	{
		var	list_icon			= document.createElement("IMG");
			list_icon.className	= "list-icon";
			list_icon.src		= list.user.profile_image_url;
			list_index.appendChild( list_icon );
//	}
	var list_anchor				= document.createElement("A");
		list_anchor.href		= "http://twitter.com" + list.uri;
		list_anchor.title		= list.full_name;
		list_anchor.target		= "_blank";
		list_anchor.innerText	= list.list_name;
		list_anchor.list		= list;
		list_anchor.addEventListener(	"click" ,
										function( event )
										{
											if( !event.shiftKey )  // Shift click openes Twitter Website
											{
												event.preventDefault();
												window.console.log( event.target.list );
												new_list_timeline( event.target.list );
											}
										},
										false );


		list_index.appendChild( list_anchor );

	return( list_index );
}
