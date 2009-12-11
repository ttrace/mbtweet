/*
	utility function and objects
*/
mbutil = {
//	isUrlRegexp : /((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)([\"\'\s\(\)\[\]]|$)/g ,
	isUrlRegexp : /((https?):((\/)|(\\\\))+[\w\d:#@%\/;$()~_?\+-=\\\.&]*)([\"\'\s\(\)\[\]]|$)?/g ,
}


S4 = function()
{
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

guid = function()
{
	return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
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
jsonp_fetch = function( access_URL , action , method, parameter , mbtweet_method )
{
	var loader		= document.createElement("script");
		loader.src	= access_URL;
	var loader_id	= guid();
		loader.id	= loader_id;
	
	document.getElementsByTagName( "head" )[0].appendChild( loader );
	
	loader.addEventListener("load" ,
							function(){
								if( !this.type )
								{
									window.console.log( "Loading jsonp is failed" );
									if( mbtweet_method.retry == true)
									{
										mbtweetOAuth.callAPI( action , method, parameter , mbtweet_method );
									}
								}
								setTimeout(
									function() {
									//	document.getElementsByTagName("head")[0].removeChild( document.getElementById( loader_id ) );
									}
									,500);
							},
							false);
	return( false );
}