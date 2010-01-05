/*
	utility function and objects
*/
mbutil = {
//	isUrlRegexp : /((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)([\"\'\s\(\)\[\]]|$)/g ,
	isUrlRegexp		: /((https?):((\/)|(\\\\))+[\w\d:#@%\/;$~_\?\+-=\\\.&]*)([\"\'\s\(\)\[\]]|$)?/g ,
	isWWWUrlRegexp	: /[^:](www\.[\w\d:#@%\/;$\(\)~_\?\+-=\\\.&]*)/g ,
}


S4 = function()
{
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

guid = function()
{
	return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

base58_decode = function(snipcode)
{
	var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
	var num = snipcode.length;
	var decoded = 0;
	var multi = 1;
	for ( var i = (num-1) ; i >= 0 ; i-- )
	{
		decoded = decoded + multi * alphabet.indexOf(snipcode[i]);
		multi = multi * alphabet.length;
	}
	return decoded;
}

//Standard function
hasClass = function(ele,cls)
{
	try
	{
		return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	}
	catch(err)
	{
		return false;
	}
}

addClass = function(ele,cls)
{
	if (!hasClass(ele,cls)) ele.className += " " + cls + " ";
}

removeClass = function(ele,cls)
{
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className = ele.className.replace( reg , " ");
	}
}

hasURL = function( string )
{
	var url_detection_regexp = /(file|http|https):\/\/\/?(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	if( string.match( url_detection_regexp ) )
	{
		return( string.match( url_detection_regexp ) );
	}
	else
	{
		return( false );
	}
}

//pbtweet functions
jsonp_fetch = function( access_URL , action , method , parameter , mbtweet_method )
{
	var loader		= document.createElement("script");
		loader.src	= access_URL;
	var loader_id	= guid();
		loader.id	= loader_id;
		loader.setAttribute('language','javascript'); 
		loader.setAttribute('type', 'text/javascript');
	
	document.getElementsByTagName( "head" )[0].appendChild( loader );
	
	loader.addEventListener("DOMActivate",
							function( event )
							{
								if( mbtweet.debug )window.console.log( "Error on loading jsonp" , event , event.target );
							}
	);
	
	loader.addEventListener("load" ,
							function( event ){
//								if( mbtweet.debug )window.console.log( "Loading jsonp" , event , event.target );
// 								if( !event.target )
// 								{
// 									window.console.log( "Loading jsonp is failed" , this.type );
// 									if( mbtweet_method.retry == true)
// 									{
// 									//	mbtweetOAuth.callAPI( action , method, parameter , mbtweet_method );
// 									}
// 								}
// 
								setTimeout(
									function() {
									document.getElementsByTagName("head")[0].removeChild( document.getElementById( loader_id ) );
									}
									,500);
								return true;
							},
							false);
	return( false );
}

// following codes are used after twitter support XHR2.
// function __jsonp_fetch( access_URL , action , method , parameter , mbtweet_method )
// {
// 	window.console.log( access_URL );
// 	var update_req = new XMLHttpRequest();
// 	update_req.onreadystatechange = function()
// 	{
// 		if(update_req.readyState == 4 && update_req.status == 200)
// 		{
// 			window.console.log( update_req.responseText );
// 		}
// 	}
// 	update_req.open('GET' , access_URL , true );
// 	update_req.setRequestHeader("Accept", "application/json, text/javascript, */*");
// 	update_req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
// 	update_req.send();
// }
