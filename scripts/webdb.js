function init_web_database()
{
	mbdatabase = new mbdata();
	mbdatabase.open_database();	
	mbdatabase.init_table();	
}

mbdata = function()
{
	var self = this;
}

mbdata.prototype = 
{
	get db ()
	{
		if (!("_db" in this))
				this._db = {};
		return this._db;
	},
	
	set db ( x )
	{
		this._db = x;
	},

}

mbdata.prototype.open_database = function(  )
{
	try
	{
		if ( window.openDatabase )
		{
			if( mbtweet.debug )
			{
				mbtweet.database.name += "_dev";
			}
			this.db = openDatabase( mbtweet.database.name, mbtweet.database.version , "database pbedit image datarray" , 200000 );
			if (!this.db)
			{
					alert("Some problem occurs. It may your database storage size limitation is too small for this application\nデータベースストレージ用の容量が不足しているなどの問題が発生しました。");
			}
		}
		else	//not in case that not support Web Database API
		{
			alert("Your browser does not support HTML5 Web Database API.");
		}

	}
	catch(error)
	{
		if( mbtweet.debug ) window.console.log( error.message );
	}
}

mbdata.prototype.init_table = function()
{
	this.db.transaction(
		function( tx )
		{
			tx.executeSql(
				"SELECT user_id FROM user_data LIMIT 1",
				[],
				function( tx , result )
				{
				},
				function( tx , error )
				{
					tx.executeSql(
						"CREATE TABLE status_data (status_id TEXT ,created_at TEXT ,in_reply_to_screen_name TEXT ,in_reply_to_status_id TEXT ,in_reply_to_user_id TEXT ,favorited BOOL ,geo TEXT ,source TEXT ,text TEXT ,truncated BOOL, screen_name TEXT, profile_image_url TEXT)",
						[],
						function( tx ){},
						function( tx , error)
						{
							if( mbtweet.debug )window.console.log( "Error on creating user table" , error );
						}
					);
					tx.executeSql(
						"CREATE TABLE user_data (created_at TEXT , description TEXT , favourites_count NUMBER , followers_count NUMBER , following NUMBER , friends_count NUMBER , geo_enabled BOOL , user_id TEXT , location TEXT , name TEXT , notifications BOOL , user_protected BOOL , screen_name TEXT , statuses_count NUMBER , time_zone TEXT , utc_offset TEXT , url TEXT , verified NUMBER , profile_background_color TEXT , profile_background_image_url TEXT , profile_background_tile TEXT , profile_image_url TEXT , profile_link_color TEXT , profile_sidebar_border_color TEXT , profile_sidebar_fill_color TEXT , profile_text_color TEXT)",
						[],
						function( tx ){},
						function( tx , error)
						{
							if( mbtweet.debug )window.console.log( "Error on creating user table" , error );
						}
					);
				}
			);
		}
	);
}

mbdata.prototype.save_status = function( status_json )
{
	this.db.transaction(
		function( tx )
		{
		var status = eval('(' + status_json + ')');
//		window.console.log( status );

			tx.executeSql(
				"SELECT status_id FROM status_data WHERE status_id = ?",
				[
					status._status_id + ""
				],
				function( tx , result )
				{
					if( result.rows.length == 0 )
					{
						( function( tx , status ){ insert_status( tx , status ) } )( tx , status );
					}
					else if( result.rows.length > 0 )
					{
						tx.executeSql(
							"DELETE FROM status_data WHERE status_id = ?",
							[
								status._status_id + ""
							],
							function( tx , result ){
							
							},
							function( tx , error)
							{
								if( mbtweet.debug )window.console.log( "Error on remove_user(): " , error );							
							}
						);						
						( function( tx , status ){ insert_status( tx , status ) } )( tx , status );
					}
				},
				function( tx , error)
				{
					//mbdatabase.save( user , "new");
					if( mbtweet.debug )window.console.log( "Error on save_user(): " , error );
				}
			);
		}
	);
}

mbdata.prototype.save_user = function( user_json )
{
	this.db.transaction(
		function( tx )
		{
		var user = eval('(' + user_json + ')');

			tx.executeSql(
				"SELECT user_id FROM user_data WHERE screen_name = ?",
					[
						user._screen_name
					] ,
				function( tx , result )
				{
					//window.console.log( result.rows );	
					if( result.rows.length == 0 )
					{
						( function( tx , user ){ insert_user( tx , user ) } )( tx , user );
						//mbdatabase.save( user_json , "new" );
					}
					else if( result.rows.length > 0 )
					{
						//window.console.log( user._screen_name , result.rows.length );
						tx.executeSql(
							"DELETE FROM user_data WHERE screen_name = ?",
							[
								user._screen_name
							],
							function( tx , result ){
							
							},
							function( tx , error)
							{
								if( mbtweet.debug )window.console.log( "Error on remove_user(): " , error );							
							}
						);
//						mbdatabase.save( user_json , "new" );
						( function( tx , user ){ insert_user( tx , user ) } )( tx , user );
					}
				},
				function( tx , error)
				{
					if( mbtweet.debug )window.console.log( "Error on save_user(): " , error );
				}
			);
		}
	);
}

insert_status = function( tx , status )
{
	tx.executeSql(
		"INSERT INTO status_data ( status_id , created_at , in_reply_to_screen_name , in_reply_to_status_id , in_reply_to_user_id , favorited , geo , source , text , truncated , screen_name , profile_image_url ) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?, ?)" ,
		[
			status._status_id + "",
			status._created_at , 
			status._in_reply_to_screen_name , 
			status._in_reply_to_status_id + "",
			status._in_reply_to_user_id + "",
			status._favorited , 
			status._geo , 
			status._source , 
			status._text , 
			status._truncated , 
			status._screen_name , 
			status._profile_image_url
		],
		function( tx )
		{
		},
		function( tx , error)
		{
			if( mbtweet.debug )window.console.log( "Error on insert tweet status(): " , error );
		}
	);
}

insert_user = function( tx , user )
{
	tx.executeSql(
		"INSERT INTO user_data (created_at , description , favourites_count , followers_count , following , friends_count , geo_enabled , user_id , location , name , notifications , user_protected , screen_name , statuses_count , time_zone , utc_offset , url , verified , profile_background_color , profile_background_image_url , profile_background_tile , profile_image_url , profile_link_color , profile_sidebar_border_color , profile_sidebar_fill_color , profile_text_color ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)" ,
		[ 
			"" , //user._created_at ,
			"" , //user._description ,
			"" , //user._favourites_count ,
			user._followers_count ,
			user._following ,
			user._friends_count ,
			user._geo_enabled ,
			(user._user_id + "") ,
			user._location ,
			user._name ,
			user._notifications ,
			user._user_protected ,
			user._screen_name ,
			user._statuses_count ,
			"" , //user._time_zone ,
			"" , //user._utc_offset ,
			user._url ,
			user._verified ,
			"" , //user._profile_background_color ,
			"" , //user._profile_background_image_url ,
			"" , //user._profile_background_tile ,
			user._profile_image_url ,
			"" , //user._profile_link_color ,
			"" , //user._profile_sidebar_border_color ,
			"" , //user._profile_sidebar_fill_color ,
			"" //user._profile_text_color
		],
		function( tx )
		{
		},
		function( tx , error)
		{
			if( mbtweet.debug )window.console.log( "Error on save_asnew_user(): " , error );
		}
	);
}

