// Client side storage handler
// objects are saved onto localstorage with JSON text.
function restore_mb_settings()
{
	mbtweetOAuth.accessToken		= get_storage_Value('mbtweetOAuth_accessToken') 
									? get_storage_Value(('mbtweetOAuth_accessToken'))
									: "";
	mbtweetOAuth.accessTokenSecret	= get_storage_Value('mbtweetOAuth_accessTokenSecret') 
									? get_storage_Value(('mbtweetOAuth_accessTokenSecret'))
									: "";
	mbtweet.user.screen_name		= get_storage_Value('mbtweet_user_screen_name') 
									? get_storage_Value(('mbtweet_user_screen_name'))
									: "";

	window.onbeforeunload = function ()
	{
		return save_storage_Changes();
	};
}

function clearAll()
{
	localStorage.clear();
	restore_pb_values();
}

function set_storage_Value(key, value)
{
	if ( is_localstorage() )
	{
		localStorage.setItem( key, value );
	}
	else
	{
		document.cookie = key + "=" + value + ";path=/;expires = Thu, 1-Jan-2030 00:00:00 GMT;" ;
	}
}

function get_storage_Value( key )
{
	if ( is_localstorage() )
	{
		// upgrading process if key does not exist.
		var value = localStorage.getItem(key);
		if( value == "" || value == null)
		{
			var cookies = document.cookie.split("; ");
			for ( var i = 0 ; i < cookies.length ; i++ )
			{
				var str = cookies[i].split("=");
				if ( str[0] == key ) {
					value = unescape( str[1] );
					break ;
				}
			}
		}
		return( value );
	}
	else
	{
		var cookies = document.cookie.split("; ");
		for ( var i = 0 ; i < cookies.length ; i++ )
		{
			var str = cookies[i].split("=");
			if ( str[0] == key ) {
				return( unescape( str[1] ) );
				break ;
			}
		}
	}
}

function save_storage_Changes()
{
	set_storage_Value('mbtweetOAuth_accessToken'		, mbtweetOAuth.accessToken);
	set_storage_Value('mbtweetOAuth_accessTokenSecret'	, mbtweetOAuth.accessTokenSecret);
	set_storage_Value('mbtweet_user_screen_name'		, mbtweet.user.screen_name);
	return null;
}

function clearValue(value)
{
	if (value == 'myfield1')
	{
		sessionStorage.removeItem(value);
	}
	else
	{
		localStorage.removeItem(value);
	}
	document.getElementById(value).value = '';
}

function is_localstorage()
{
	if ( typeof(localStorage) == 'undefined' || localStorage == null )
	{
		return(false);
	}
	else
	{
		return(true);
	}
}
