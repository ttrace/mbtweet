// preset timeline object
mbtweet.timeline = 
{
	home		:
				{
					name		: "Home",
					timeline_id	: "home",
					spare_api	: "https://api.twitter.com/1/statuses/home_timeline.json",
					api			: "https://twitter.com/statuses/home_timeline.json",
					interval	: 60000,
					count		: 100,
					auth		: true,
					cache		: true,
				},
	mention		:
				{
					name		: "Mention",
					timeline_id	: "mention",
					spare_api	: "https://api.twitter.com/1/statuses/mentions.json",
					api			: "https://twitter.com/statuses/mentions.json",
					interval	: 60000,
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
					spare_api	: "https://api.twitter.com/1/statuses/user_timeline.json",
					api			: "https://twitter.com/statuses/user_timeline.json",
					interval	: 180000,
					count		: 100,
					auth		: true,
					cache		: true,
				},
	following	:
				{
					name		: "Your Following",
					timeline_id	: "following",
					spare_api	: "https://api.twitter.com/1/statuses/friends.json",
					api			: "https://twitter.com/statuses/friends.json",
					interval	: 1800000,
					cursor		: -1,
					auth		: true,
					cache		: true,
				},
	followwers	:
				{
					name		: "Your Followers",
					timeline_id	: "followers",
					spare_api	: "https://api.twitter.com/1/statuses/followers.json",
					api			: "https://twitter.com/statuses/followers.json",
					interval	: 1800000,
					cursor		: -1,
					auth		: true,
					cache		: true,
				},
	rt_by_me	:
				{
					name		: "ReTweets by You",
					timeline_id	: "rtByme",
					spare_api	: "https://api.twitter.com/1/statuses/retweeted_by_me.json",
					api			: "https://twitter.com/statuses/retweeted_by_me.json",
					interval	: 600000,
					count		: 50,
					auth		: true,
					cache		: false,
				},
	rt_to_me	:
				{
					name		: "ReTweets by Others",
					timeline_id	: "rtTome",
					spare_api	: "https://api.twitter.com/1/statuses/retweeted_to_me.json",
					api			: "https://twitter.com/statuses/retweeted_to_me.json",
					interval	: 600000,
					count		: 50,
					auth		: true,
					cache		: false,
				},
	rt_of_me	:
				{
					name		: "Your Tweet, ReTweeted",
					timeline_id	: "rtOfme",
					spare_api	: "https://api.twitter.com/1/statuses/retweets_of_me.json",
					api			: "https://twitter.com/statuses/retweets_of_me.json",
					interval	: 600000,
					count		: 50,
					auth		: true,
					cache		: false,
				},
	message		:
				{
					name		: "Messages",
					timeline_id	: "messages",
					spare_api	: "https://api.twitter.com/1/direct_messages.json",
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
					spare_api	: "http://search.twitter.com/search.json",
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
			new_timeline.api = "https://api.twitter.com/1/statuses/user_timeline/" + screen_name + ".json";
			new_timeline.spare_api = new_timeline.api;
			new_timeline.auth = myauth;
			new_timeline.count = 50;
			new_timeline.create();
	}
}

new_list_timeline = function( list )
{
	var myauth = true;
	if( document.querySelectorAll( "[id^='list_" + list._list_id + "']" ).length == 0 )
	{
		var new_timeline = new timeline();
			new_timeline.timeline_id = "list_" + list._list_id + "_" + guid().replace( /\-/g , '');
			new_timeline.name = "List:" + list._list_name;
			new_timeline.api = "https://api.twitter.com/1/" + list.user._screen_name + "/lists/" + list._list_id + "/statuses.json";
			new_timeline.spare_api = new_timeline.api;
			new_timeline.auth = myauth;
			new_timeline.cache	= true;
			new_timeline.count	= 50;
			new_timeline.create();
	}
}

new_search_timeline = function( query , language )
{
	var new_search_timeline					= new timeline();
		new_search_timeline.timeline_id		= "hashtag_" + guid().replace(/\-/g , "");
		if( query.match(/^\#/) )
		{
			new_search_timeline.name			= "Search Hashtag: " + query;
		}
		else
		{
			new_search_timeline.name			= "Search " + query;		
		}
		new_search_timeline.api				= mbtweet.timeline.search.api;
		new_search_timeline.interval		= mbtweet.timeline.search.interval;
		new_search_timeline.count			= mbtweet.timeline.search.count;
		new_search_timeline.auth			= mbtweet.timeline.search.auth;
		new_search_timeline.cache			= mbtweet.timeline.search.cache;
		new_search_timeline.search			= new search();
		new_search_timeline.search.query	= query;
		if( language != "")
		{
			new_search_timeline.search.lang	= language;
		}
		new_search_timeline.create();
}

timeline = function( preset )
{
	var self = this;
	if( mbtweet.timeline[preset] && ( document.querySelectorAll( "#column [id^='" + preset + "']" ).length == 0 ))
	{
		this.timeline_id	= mbtweet.timeline[preset].timeline_id + "_" + guid().replace( /\-/g , '');
		if( mbtweet.timeline[preset].timeline_id == "search")
		{
			this.timeline_id = "search";
		}
		this.name			= mbtweet.timeline[preset].name;
		this.api			= mbtweet.timeline[preset].api;
		this.spare_api		= mbtweet.timeline[preset].spare_api;
		this.interval		= mbtweet.timeline[preset].interval;
		this.count			= mbtweet.timeline[preset].count;
		if( mbtweet.timeline[preset].cursor )
		{
			this.cursor		= mbtweet.timeline[preset].cursor;
		}
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
		if ( this.auth && mbtweet.rate.auth < 50)
		{
			if(mbtweet.debug)window.console.log( this.auth , mbtweet.rate.auth , "Rate is shortning", this.timeline_id );
			this._api = this._spare_api;
		}
		return this._api;
	},
	
	set api ( x )
	{
		this._api = x;
	},

	// base URL for fetching timelines
	get spare_api ()
	{
		if (!("_api" in this))
				this._spare_api = "";
		return this._spare_api;
	},
	
	set spare_api ( x )
	{
		this._spare_api = x;
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

	get icon ()
	{
		if (!("_icon" in this))
				this._icon = "";
		return this._icon;
	},
	
	set icon ( x )
	{
		this._icon = x;
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

	get lang ()
	{
		if (!("_lang" in this))
				this._lang = "";
		return this._lang;
	},
	
	set lang ( x )
	{
		this._lang = x;
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

	var timeline_readmore = document.createElement("DIV");
		timeline_readmore.className = "read-more";
		timeline_readmore.innerText = "Load next page";

	this.timeline = timeline;

	//if( this.timeline_id.match(/^search/ )
	if( this.search && this.search.query == "" )
	{
		var search_field		= document.createElement("INPUT");
			search_field.id		= "search_keyword";
			search_field.type	= "search";
			search_field.searchtimeline = this;
			search_field.addEventListener(	"change",
											function( event )
											{
												event.target.searchtimeline.search.query = event.target.value;
												if( event.target.shiftKey == true )
												{
													event.target.searchtimeline.search.lang = mbtweet.user.language;
//													if(mbtweet.debug)window.console.log( event.target.searchtimeline );
													event.target.searchtimeline.search.init( event.target.searchtimeline );
												}
												else
												{
													event.target.searchtimeline.search.lang = "";
													event.target.searchtimeline.search.init( event.target.searchtimeline );
												}
											},
											false);
			search_field.addEventListener(	"keydown",
											function( event )
											{
												if( event.shiftKey )
												{
													event.target.shiftKey = true;
												}
												else
												{
													event.target.shiftKey = false;												
												}
											},
											false);
		timeline_header.appendChild( search_field );			
	}

	if( this.timeline_id.match(/^follow/) )
	{
		timeline_readmore.addEventListener(	"click",
											function( event )
											{
												var cursor = event.target.cursor;
												if( !event.shiftKey )
												{
													self.loadCursor( cursor );
												}
												else
												{
													event.target.timeline = self;
													self.loadCursor( cursor , "eternal" );
												}
											},
											false);
	}
	else if( this.search )
	{
		timeline_readmore.addEventListener(	"click",
											function( event )
											{
												var cursor = event.target.cursor;
													self.loadMaxSearch();
											},
											false);	
	}
	else
	{
		timeline_readmore.addEventListener(	"click",
											function( event )
											{
												var cursor = event.target.cursor;
													self.loadMax();
											},
											false);
	}
		timeline.appendChild( timeline_readmore );

	timeline_column.appendChild( timeline );
	
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
	eval( "initial" + this.timeline_id + "=function(data){initialTimeline(data,'" + this.timeline_id + "' , " + this.cache + ");delete this}" );

	if( !this.cursor )
	{
		mbtweetOAuth.callAPI(	this.api ,
								"GET",
								[
									["callback" , "initial" + this.timeline_id ],
									["count" , this.count ],
									["per_page" , this.count ],
								],
								{ auth	: this.auth }
							);
	}
	else
	{
		mbtweetOAuth.callAPI(	this.api ,
								"GET",
								[
									["callback" , "initial" + this.timeline_id ],
									["cursor" , this.cursor ],
								],
								{ auth	: this.auth }
							);	
	}
	var my_timeline = this;
	setTimeout( function(){ count_api_rate( { auth : my_timeline.auth , main : false } ) } , 1000 );
	setTimeout( function(){ my_timeline.update() } , this.interval );
	return false;
}

timeline.prototype.loadMax = function()
{
	var max_id = (this.timeline.max_id);
	window.console.log( max_id , this.timeline.max_id );
	eval( "initial" + this.timeline_id + "=function(data){initialTimeline(data,'" + this.timeline_id + "' , " + this.cache + ",'removefirst');delete this}" );

	mbtweetOAuth.callAPI(	this.api ,
							"GET",
							[
								["callback" , "initial" + this.timeline_id ],
								["max_id" , max_id ],
								["count" , this.count ],
								["per_page" , this.count ],
							],
							{ auth	: this.auth }
						);
	return false;
}

timeline.prototype.loadMaxSearch = function()
{
	var max_id = (this.timeline.max_id);
	if(mbtweet.debug)window.console.log( this );
	eval( "initial" + this.timeline_id + "=function(data){initialSearchTimeline(data,'" + this.timeline_id + "' , " + this.cache + ",'removefirst');delete this}" );

	mbtweetOAuth.callAPI(	this.api ,
							"GET",
							[
								["callback" , "initial" + this.timeline_id ],
								["q" , this.search.query ],
								["lang" , this.search.lang ],
								["rpp" , "50"],
								["max_id" , max_id ],
							],
							{ auth	: false }
						);
	return false;
}

timeline.prototype.loadCursor = function( cursor , option )
{
	eval( "initial" + this.timeline_id + "=function(data){initialTimeline(data,'" + this.timeline_id + "' , " + this.cache + ");delete this}" );

	if( option == "eternal" )
	{
		eval( "initial" + this.timeline_id + "=function(data){initialTimeline(data,'" + this.timeline_id + "' , " + this.cache + ",'eternal');delete this}" );
	}
	mbtweetOAuth.callAPI(	this.api ,
							"GET",
							[
								["callback" , "initial" + this.timeline_id ],
								["cursor" , cursor ],
							],
							{ auth	: this.auth }
						);
	return false;
}

timeline.prototype.update = function()
{
	if( document.getElementById( this.timeline.id )  && !this.timeline_id.match(/^follow/) )
	{
		var timeline_object = this.timeline;
		var since_id = timeline_object.querySelector(".entry").id.replace(/.+\-([0-9]+)$/ , "$1") + "";
		eval( "update" + this.timeline_id + "=function( data ){updateTimeline(data,'" + this.timeline_id + "' , " + this.cache + ");delete this}" );
		mbtweetOAuth.callAPI(	this.api ,
								"GET",
								[
									["callback" , "update" + this.timeline_id ],
									["since_id" , since_id],
									["per_page" , this.count ],
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
	var timeline_object = document.querySelector( "#" + timeline.timeline_id );
	var old_entry = timeline_object.querySelectorAll( " .entry" );
	for( i = 0 ; i < old_entry.length ; i++ )
	{
		timeline_object.removeChild( old_entry[i] );
	}

	eval( "initial" + timeline.timeline_id + "=function(data){initialSearchTimeline(data,'" + timeline.timeline_id + "' , " + timeline.cache + ");delete this}" );

	mbtweetOAuth.callAPI(	timeline.api ,
							"GET",
							[
								["callback" , "initial" + timeline.timeline_id ],
								["q" , this.query ],
								["lang" , this.lang ],
								["rpp" , "50"],
							],
							{ auth	: false }
						);

	var init_query = this.query;
	setTimeout( function(){ timeline.search.update( timeline , init_query ) } , timeline.interval );
	return false;
}

search.prototype.update = function( timeline , init_query )
{
	if(mbtweet.debug)window.console.log( init_query , this.query );
	var timeline_object = timeline.timeline;
	if( document.getElementById( timeline_object.id ) && init_query == this.query )
	{
		var timeline_object = timeline.timeline;
		var since_id = timeline_object.querySelector(".entry").id.replace(/.+\-([0-9]+)$/ , "$1") + "";
		eval( "update" + timeline.timeline_id + "=function( data ){updateSearchTimeline(data,'" + timeline.timeline_id + "' , " + timeline.cache + ")}" );
		mbtweetOAuth.callAPI(	timeline.api ,
								"GET",
								[
									["callback" , "update" + timeline.timeline_id ],
									["since_id" , since_id],
									["q" , this.query ],
									["lang" , this.lang ],
									["rpp" , "100"],
								],
								{ auth	: false }
							);
		var init_query = this.query;
		setTimeout( function(){ timeline.search.update( timeline , init_query ) } , timeline.interval );
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
	var insert_target = timeline.querySelector(".read-more");

	if( !target_id.match(/^(following|followers)/) )
	{
		var max_id = "";
		var i = 0;
		if( arguments[3] == "removefirst" ) i = 1;
		for( i ; i < data.length ; i++ )
		{
			max_id = data[i].id;
			create_tweet_element( data[i] , cache ).buildEntry( timeline );
		}
		timeline.max_id = max_id;
	}
	else
	{
		cursor = data.next_cursor;
		for( var i = 0 ; i < data.users.length ; i++ )
		{
			create_user_element( data.users[i] , cache , cursor ).buildUserInfo( timeline , "insert" , insert_target );
		}
		if( arguments[3] == "eternal" && cursor != 0 )
		{
			insert_target.timeline.loadCursor( cursor , "eternal" );
		}
	}
	
	if( target_id.match(/^messages/) )
	{
		eval( "initial" + timeline.id + "=function(data){insertSortTimeline(data,'" + timeline.id + "');delete this}" );
		mbtweetOAuth.callAPI(	"http://twitter.com/direct_messages/sent.json" ,
								"GET",
								[
									["callback" , "initial" + timeline.id ],
									["count" , mbtweet.timeline.message.count ],
									["per_page" , mbtweet.timeline.message.count ],
								],
								{ auth	: mbtweet.timeline.message.auth }
							);		
	}
}

updateTimeline = function( data , target_id , cache )
{
	var timeline = document.getElementById( target_id );
	var insert_target = timeline.querySelector(".entry");

	for( var i = 0 ; i < data.length ; i++ )
	{
		create_tweet_element( data[i] , cache ).buildEntry( timeline , "insert" , insert_target );
	}
}

insertSortTimeline = function( data , target_id , cache )
{
	var timeline = document.getElementById( target_id );
	var insert_target = timeline.querySelector(".entry");

	for( var i = 0 ; i < data.length ; i++ )
	{
		create_tweet_element( data[i] , cache ).buildEntry( timeline , "sort" , insert_target );
	}
}

initialSearchTimeline = function( data , target_id , cache )
{
	var max_id = "";
	var timeline = document.getElementById( target_id );
	var insert_target = timeline.querySelector(".read-more");

	var i = 0;
	if( arguments[3] == "removefirst" ) i = 1;
	for( i ; i < data.results.length ; i++ )
	{
		max_id = data.results[i].id;
		create_search_element( data.results[i] ).buildEntry( timeline );
	}
	timeline.max_id = max_id;
}

updateSearchTimeline = function( data , target_id , cache )
{
	//window.console.log( data , target_id , cache );
	var timeline = document.getElementById( target_id );
	var insert_target = timeline.querySelector(".entry");

	for( var i = 0 ; i < data.results.length ; i++ )
	{
		create_search_element( data.results[i] ).buildEntry( timeline , "insert" , insert_target );
	}
}
