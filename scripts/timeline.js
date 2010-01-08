// preset timeline object
mbtweet.timeline = 
{
	home		:
				{
					name		: "Home",
					timeline_id	: "home",
					api			: "https://api.twitter.com/1/statuses/home_timeline.json",
					interval	: 60000,
					count		: 100,
					auth		: true,
					cache		: true,
				},
	mention		:
				{
					name		: "Mention",
					timeline_id	: "mention",
					api			: "https://twitter.com/statuses/mentions.json",
					interval	: 120000,
					count		: 50,
					auth		: true,
					cache		: true,
				},
	favorite	:
				{
					name		: "Favorites",
					timeline_id	: "favorite",
					api			: "https://twitter.com/favorites.json",
					interval	: 180000,
					count		: 50,
					auth		: true,
					cache		: false,
				},
	mine		:
				{
					name		: "Your Timeline",
					timeline_id	: "mine",
					api			: "https://twitter.com/statuses/user_timeline.json",
					interval	: 180000,
					count		: 100,
					auth		: true,
					cache		: true,
				},
	message		:
				{
					name		: "Messages",
					timeline_id	: "message",
					api			: "https://twitter.com/direct_messages.json",
					interval	: 180000,
					count		: 20,
					auth		: true,
					cache		: false,
				},
	search		:
				{
					name		: "Search",
					timeline_id	: "search",
					api			: "http://search.twitter.com/search.json",
					interval	: 60000,
					count		: 100,
					auth		: false,
					cache		: false,
				},
}

new_user_timeline = function( target_link , myauth )
{
	var screen_name = "";
	if( target_link.href )
	{
		screen_name = target_link.innerText;
	}
	else
	{
		screen_name = target_link;		
	}
	if( !document.getElementById( screen_name ) )
	{
		var new_timeline = new timeline();
			new_timeline.timeline_id = screen_name;
			new_timeline.name = screen_name + "'s timeline";
			new_timeline.api = "https://twitter.com/statuses/user_timeline/" + screen_name + ".json";
			new_timeline.auth = myauth;
			new_timeline.create();
	}
}

new_list_timeline = function( list )
{
	var myauth = false;
	if( list._mode != "public" ) myauth = true;
	if( !document.getElementById( "list_" + list._list_id ) )
	{
		var new_timeline = new timeline();
			new_timeline.timeline_id = "list_" + list._list_id;
			new_timeline.name = "List:" + list._list_name;
			new_timeline.api = "https://api.twitter.com/1/" + list.user._screen_name + "/lists/" + list._list_id + "/statuses.json";
			new_timeline.auth = myauth;
			new_timeline.create();
	}
}

new_search_timeline = function( query )
{
	var new_search_timeline					= new timeline();
		new_search_timeline.timeline_id		= "search_" + guid().replace(/\-/g , "");
		new_search_timeline.name			= "Search " + query;
		new_search_timeline.api				= mbtweet.timeline.search.api;
		new_search_timeline.interval		= mbtweet.timeline.search.interval;
		new_search_timeline.count			= mbtweet.timeline.search.count;
		new_search_timeline.auth			= mbtweet.timeline.search.auth;
		new_search_timeline.cache			= mbtweet.timeline.search.cache;
		new_search_timeline.search			= new search();
		new_search_timeline.search.query	= query;
		
		new_search_timeline.create();
}

timeline = function( preset )
{
	var self = this;
	if( mbtweet.timeline[preset] && ( document.querySelectorAll( "#" + preset ).length == 0 ))
	{
		this.timeline_id	= mbtweet.timeline[preset].timeline_id;
		this.name			= mbtweet.timeline[preset].name;
		this.api			= mbtweet.timeline[preset].api;
		this.interval		= mbtweet.timeline[preset].interval;
		this.count			= mbtweet.timeline[preset].count;
		this.auth			= mbtweet.timeline[preset].auth;
		this.cache			= mbtweet.timeline[preset].cache;
		if( preset == "search" )
		{
			this.search			= new search();
			this.search.query	= "";
		}
		this.create();
	}
}

timeline.prototype = 
{
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

	get timeline_id ()
	{
		if (!("_timeline_id" in this))
				this._timeline_id = "";
		return this._timeline_id;
	},
	
	set timeline_id ( x )
	{
		this._timeline_id = x;
	},

	// base URL for fetching timelines
	get api ()
	{
		if (!("_api" in this))
				this._api = "";
		return this._api;
	},
	
	set api ( x )
	{
		this._api = x;
	},

	// fetching interval
	get interval ()
	{
		if (!("_interval" in this))
				this._interval = 180000;
		return this._interval;
	},
	
	set interval ( x )
	{
		this._interval = x;
	},

	// fetching number of statuses
	get count ()
	{
		if (!("_count" in this))
				this._count = 20;
		return this._count;
	},
	
	set count ( x )
	{
		this._count = x;
	},

	// store on  database?
	get cache ()
	{
		if (!("_cache" in this))
				this._cache = false;
		return this._cache;
	},
	
	set cache ( x )
	{
		this._cache = x;
	},

	get auth ()
	{
		if (!("_auth" in this))
				this._auth = false;
		return this._auth;
	},
	
	set auth ( x )
	{
		this._auth = x;
	},
}

search = function()
{
	var self = this;
}

search.prototype = 
{
	get query ()
	{
		if (!("_query" in this))
				this._query = "";
		return this._query;
	},
	
	set query ( x )
	{
		this._query = x;
	},
}

timeline.prototype.create = function()
{
	var self = this;

	var timeline_column = document.createElement("DIV");
		timeline_column.className = "timeline_column";
		timeline_column.id = this.timeline_id + "_column";
		this.timelineColumn = timeline_column;
	
	var timeline_header = document.createElement("DIV");
		timeline_header.className = "timeline_header";
		timeline_header.innerHTML = this.name;
	timeline_column.appendChild( timeline_header );
	
	if( this.timeline_id == "search" )
	{
		var search_field		= document.createElement("INPUT");
			search_field.id		= "search_keyword";
			search_field.type	= "search";
			search_field.addEventListener(	"change",
											function(){ retreve_search( search_field ) },
											false);
		timeline_header.appendChild( search_field );			
	}
	
	var timeline_count = document.createElement("SPAN");
		timeline_count.className = "unread-counter";
		timeline_count.innerText = "0";
	timeline_header.appendChild( timeline_count );
		this.counter = timeline_count;

	var timeline_shrink = document.createElement("DIV");
		timeline_shrink.className = "timeline-button shrink";
		timeline_shrink.innerText = "-";
		timeline_shrink.addEventListener( "click" , function(){ self.shrink() } , false );
	timeline_header.insertBefore( timeline_shrink , timeline_header.firstChild );

	var timeline_close = document.createElement("DIV");
		timeline_close.className = "timeline-button close";
		timeline_close.innerText = "×";
		timeline_close.addEventListener( "click" , function(){ self.close() } , false );
	timeline_header.insertBefore( timeline_close , timeline_header.firstChild );

	var timeline = document.createElement("DIV");
		timeline.className = "timeline";
		timeline.id = this.timeline_id;
	timeline_column.appendChild( timeline );
		this.timeline = timeline;

	document.querySelector("#column").appendChild( timeline_column );

	fit_holizontal_width();

	window_resize( mbui.window_resize_token );

	if( !this.search )
	{
		this.init();
	}
	else if( this.search.query != "")
	{
		this.search.init( this );
	}
}

timeline.prototype.init = function()
{
	var timeline_object = this.timeline;
	eval( "initial" + this.timeline_id + "=function(data){initialTimeline(data,'" + this.timeline_id + "' , " + this.cache + ")}" );

	mbtweetOAuth.callAPI(	this.api ,
							"GET",
							[
								["callback" , "initial" + this.timeline_id ],
								["count" , this.count ],
							],
							{ auth	: this.auth }
						);
	var my_timeline = this;
	setTimeout( function(){ count_api_rate( { auth : my_timeline.auth , main : false } ) } , 1000 );
	setTimeout( function(){ my_timeline.update() } , this.interval );
	return false;
}

timeline.prototype.update = function()
{
	if( document.getElementById( this.timeline.id ) )
	{
		var timeline_object = this.timeline;
		var since_id = timeline_object.querySelector(".entry").id.replace(/.+\-([0-9]+)$/ , "$1") + "";
		eval( "update" + this.timeline_id + "=function( data ){updateTimeline(data,'" + this.timeline_id + "' , " + this.cache + ")}" );
		mbtweetOAuth.callAPI(	this.api ,
								"GET",
								[
									["callback" , "update" + this.timeline_id ],
									["since_id" , since_id],
									["count" , this.count ],
								],
								{ auth	: this.auth }
							);
		var my_timeline = this;
		setTimeout( function(){ count_api_rate( { auth : my_timeline.auth , main : false } ) } , 2000 );
		setTimeout( function(){ my_timeline.update() } , this.interval );
	}
	return false;
}

search.prototype.init = function( timeline )
{
	var timeline_object = timeline.timeline;
	eval( "initial" + timeline.timeline_id + "=function(data){initialSearchTimeline(data,'" + timeline.timeline_id + "' , " + timeline.cache + ")}" );

	mbtweetOAuth.callAPI(	timeline.api ,
							"GET",
							[
								["callback" , "initial" + timeline.timeline_id ],
								["q" , this.query ],
								["rpp" , "20"],
							],
							{ auth	: false }
						);
	setTimeout( function(){ timeline.search.update( timeline ) } , timeline.interval );
	return false;
}

search.prototype.update = function( timeline )
{
	var timeline_object = timeline.timeline;
	if( document.getElementById( timeline_object.id ) )
	{
		var timeline_object = timeline.timeline;
		var since_id = timeline_object.querySelector(".entry").id.replace(/.+\-([0-9]+)$/ , "$1") + "";
		eval( "update" + timeline.timeline_id + "=function( data ){updateSearchTimeline(data,'" + timeline.timeline_id + "' , " + timeline.cache + ")}" );
		mbtweetOAuth.callAPI(	timeline.api ,
								"GET",
								[
									["callback" , "update" + timeline.timeline_id ],
									["q" , this.query ],
									["rpp" , "100"],
								],
								{ auth	: false }
							);
		setTimeout( function(){ timeline.search.update( timeline ) } , timeline.interval );
	}
	return false;
}

timeline.prototype.shrink = function()
{
	fit_holizontal_width();
	addClass( this.timelineColumn , "fitting" );
	this.timelineColumn.addEventListener(	"webkitTransitionEnd",
											function( event )
											{
												if( hasClass( event.target , "timeline_column" ) )
												{
													removeClass( this.timelineColumn , "fitting" );
													fit_holizontal_width();
													event.target.removeEventListener( "webkitTransitionEnd" , arguments.callee );
												}
											},
											false );
	if( hasClass( this.timelineColumn , "mini" ) )
	{
		var column_wrapper = document.querySelector("#column");
		var timelines = column_wrapper.querySelectorAll(".timeline_column");
			column_wrapper.style.width = ( column_wrapper.offsetWidth + 290 ) + "px";
		removeClass( this.timelineColumn , "mini" );
	}
	else
	{
		addClass( this.timelineColumn , "mini" );
	}
	
}

timeline.prototype.close = function()
{
	document.querySelector( "#column" ).removeChild( this.timelineColumn );
	fit_holizontal_width();
	delete this;
}

initialTimeline = function( data , target_id , cache )
{
	var timeline = document.getElementById( target_id );
	var insert_target = timeline.querySelector(".read.more");

	for( i = 0 ; i < data.length ; i++ )
	{
		create_tweet_element( data[i] , cache ).buildEntry( timeline );
	}

}

updateTimeline = function( data , target_id , cache )
{
	var timeline = document.getElementById( target_id );
	var insert_target = timeline.querySelector(".entry");

	for( i = 0 ; i < data.length ; i++ )
	{
		create_tweet_element( data[i] , cache ).buildEntry( timeline , "insert" , insert_target );
	}
}

initialSearchTimeline = function( data , target_id , cache )
{
	var timeline = document.getElementById( target_id );
	var insert_target = timeline.querySelector(".read.more");

	for( i = 0 ; i < data.results.length ; i++ )
	{
		create_search_element( data.results[i] ).buildEntry( timeline );
	}
}

updateSearchTimeline = function( data , target_id , cache )
{
	window.console.log( data , target_id , cache );
	var timeline = document.getElementById( target_id );
	var insert_target = timeline.querySelector(".entry");

	for( i = 0 ; i < data.results.length ; i++ )
	{
		create_search_element( data.results[i] ).buildEntry( timeline , "insert" , insert_target );
	}
}
