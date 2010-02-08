users_searches = function()
{
}

users_searches.prototype = 
{
	get searches ()
	{
		if (!("_searches" in this))
				this._searches = [];
		return this._searches;
	},
	
	set searches ( x )
	{
		this._searches = x;
	},
}

saved_search = function()
{
}

saved_search.prototype = 
{
	get saved_serch_id ()
	{
		if (!("_saved_serch_id" in this))
				this._saved_serch_id = "";
		return this._saved_serch_id;
	},
	
	set saved_serch_id ( x )
	{
		this._saved_serch_id = x;
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

	get position ()
	{
		if (!("_position" in this))
				this._position = "";
		return this._position;
	},
	
	set position ( x )
	{
		this._position = x;
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
}

get_saved_search = function()
{
	eval( "saved_search=function(data){retreveSavedSearch(data);delete this;}" );
	mbtweetOAuth.callAPI(	"https://api.twitter.com/1/saved_searches.json" ,
							"GET",
							[
								["callback" , "saved_search" ]
							],
							{ retry : true , auth	: true }
						);
}

retreveSavedSearch = function( data )
{
	var new_users_search = new users_searches();
	
	for( var i = 0 ; i < data.length ; i++ )
	{
		var searches_data = data[i];
		var new_search = new list();
			new_search.saved_serch_id	= searches_data.id;
			new_search.name				= searches_data.name;
			new_search.query			= searches_data.query;
			new_search.position			= searches_data.position;
			new_search.created_at		= searches_data.created_at;
						
			new_users_search.searches.push( new_search );
	}

	var search_menu = create_search_menu( new_users_search );
	document.querySelector("#my_saved_search").insertBefore( search_menu , document.querySelector("#my_saved_search").firstChild );
}

create_search_menu = function( new_users_search )
{
	var searches = new_users_search.searches;
	var menu_wrapper			= document.createElement("DIV");
		menu_wrapper.className	= "dock-menu";
		menu_wrapper.id			= "saved_search";

	for( var i = 0 ; i < searches.length ; i++ )
	{
		menu_wrapper.appendChild( search_index( searches[i] ) );
	}
	
	return( menu_wrapper );
}

search_index = function( search )
{
	var search_index 				= document.createElement("DIV");
		search_index.className	= "dock-menu-index";
		search_index.id			= "search_index_" + search.saved_search_id;

	var search_anchor			= document.createElement("A");
		search_anchor.href		= "http://twitter.com/" + search.query;
		search_anchor.innerText	= search.name;
		search_anchor.target	= "_blank";
		search_anchor.mysearch	= search;
		search_anchor.addEventListener(	"click" ,
										function( event )
										{
											event.stopPropagation();
											event.preventDefault();
											if( !event.target.mysearch )
											{
												search_index = event.target.parentNode;
											}
											var search_index = event.target;
											if( !event.shiftKey )  // Shift click openes Twitter Website
											{
												new_search_timeline( search_index.mysearch.query );
											}
											else
											{
												new_search_timeline( search_index.mysearch.query , mbtweet.user.language );												
											}
											addClass( search_index , "active" );
											setTimeout( function()
												{
													removeClass( search_index , "active" );
													
												}, 500);
										},
										false );


		search_index.appendChild( search_anchor );

	return( search_index );
}

