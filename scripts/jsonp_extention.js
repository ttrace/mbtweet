// inserting google translation result into tweet's string
gTransExp = function( data ){
//	var translate_parent	= document.querySelector( "#" + arguments[0] ).querySelector( ".u-string" );
//	var translate_element	= document.querySelector( "#" + arguments[0] ).querySelector( ".translated" );
//	var translate_parent	= document.querySelector( "#" + arguments[0] ).querySelector( ".u-string" );
	var translate_element	= document.querySelector( ".translated.loading" );
	if( data.responseData == null) // in error case
	{
		translate_element.innerText = data.responseDetails;
		removeClass(translated_object,'loading');
	}
	else
	{
		var context = data.responseData.translatedText;
		var original_lang = mbtweet.defined_language[ data.responseData.detectedSourceLanguage ];
		if( original_lang == mbtweet.user.language )
		{
			removeClass( translate_element ,'loading');
			translate_element.innerHTML = "" + context + " -- translated from :" + original_lang;
		}
		else
		{
			// correctry translated
			removeClass( translate_element ,'loading');
			translate_element.innerHTML = "" + context + " -- translated from :" + original_lang;
		}
	}
}

// media supports
mbutil.defined_media_regexp = 
{
	twitpic_carrier		: /(http\:\/\/twitpic.com\/[a-zA-Z0-9]+)/,
	pikchur_carrier		: /(http\:\/\/pk.gd\/([a-zA-Z0-9]+))/,
	movapic_carrier		: /http\:\/\/movapic.com\/pic\/([a-z0-9]+)/,
	gyazo_carrier		: /(http\:\/\/gyazo.com\/[a-zA-Z0-9]+.png)/,
	tweetphoto_carrier	: /http\:\/\/pic\.gd\/([a-zA-Z0-9]+)/,
	yfrog_carrier		: /http\:\/\/yfrog.[a-z]+\/([a-zA-Z0-9]+)/,
	photoshare_carrier	: /(http\:\/\/www.bcphotoshare\.com\/photos\/([0-9][0-9])[0-9]+\/([0-9]+))/,
	flickr_carrier		: /http\:\/\/flic\.kr\/p\/([a-zA-Z0-9]+)/,
	flickrcom_carrier	: /http\:\/\/www\.flickr.com\/photos\/[a-z]+\/([0-9]+)/
}

has_media_url = function( url )
{
	for( key in mbutil.defined_media_regexp )
	{
		var media_url = url.match( mbutil.defined_media_regexp[key] );
		if( media_url )
		{
			return( key )
		}
	}
}

// shorten url
mbutil.defined_snipurl_regexp = 
{
	bitly_carrier		: /(http:\/\/|www\.)(bit\.ly|j\.mp|tcrn\.ch|on\.wsj\.com|nyti\.ms|4sq\.com|mee\.bo)\/([a-zA-Z0-9]+)/,
	am6_carrier			: /(http:\/\/|www\.)(am6\.jp)\/([a-zA-Z0-9]+)/,
}

has_shorten_url = function( url )
{
	for( key in mbutil.defined_snipurl_regexp )
	{
		var shorten_url = url.match( mbutil.defined_snipurl_regexp[key] );
		if( shorten_url )
		{
			return( key )
		}
	}
}

fetch_media_thumbnail = function( status_id , media_url , media_carrier )
{
//	window.console.log( "fetch_media_thumbnail:" , status_id , media_url , media_carrier );

	switch ( media_carrier ) {
		case "twitpic_carrier":
			var pic_thumb_src = media_url.match(mbutil.defined_media_regexp[media_carrier])[1].replace(/http\:\/\/twitpic\.com\/([0-9a-zA-Z0-9]+)/,"http://twitpic.com/show/thumb/$1");
			place_picture( status_id , pic_thumb_src , media_url );
			break;
		
		case "pikchur_carrier":
			var pic_thumb_src = "http://img.pikchur.com/pic_" + media_url.match(mbutil.defined_media_regexp[media_carrier])[2] + "_s.jpg?ls=";
			place_picture( status_id , pic_thumb_src , media_url );
			break;

		case "twitvid_carrier":
			var pic_thumb_src = media_url.match(mbutil.defined_media_regexp[media_carrier])[1].replace(/http\:\/\/twitvid\.com\/([0-9a-zA-Z0-9]+)/,"http://cdn.twitvid.com/thumbnails/$1.jpg");
			place_picture( status_id , pic_thumb_src , media_url );
			break;

		case "movapic_carrier":
			var pic_thumb_src = "http://image.movapic.com/pic/s_" + media_url.match(mbutil.defined_media_regexp[media_carrier])[1] +".jpeg";
			place_picture( status_id , pic_thumb_src , media_url );
			break;

		case "gyazo_carrier":
			var pic_thumb_src = media_url;
			place_picture( status_id , pic_thumb_src , media_url );
			break;

		case "tweetphoto_carrier":
			var pic_thumb_query	= media_url.match(mbutil.defined_media_regexp[media_carrier])[1];
				access_URL		= "http://pipes.yahoo.com/pipes/pipe.run?_id=bad514af30be9c742b19fd563c257a6b&_render=json&snipcode=" + pic_thumb_query + "&parentid=" + status_id + "&_callback=mediaJson";
			jsonp_fetch( access_URL );
			break;

		case "yfrog_carrier":
			var pic_thumb_src = "http://yfrog.com/" + media_url.match(mbutil.defined_media_regexp[media_carrier])[1] + ".th.jpg";
			place_picture( status_id , pic_thumb_src , media_url );
			break;

		case "photoshare_carrier":
			var pic_thumb_src = "http://images.bcphotoshare.com/storages/" + media_url.match(mbutil.defined_media_regexp[media_carrier])[3] +"/thumb180.jpg";
			place_picture( status_id , pic_thumb_src , media_url );
			break;

		case "flickr_carrier":
			var pic_thumb_query = media_url.match(mbutil.defined_media_regexp[media_carrier])[1];
				access_URL = "http://pipes.yahoo.com/pipes/pipe.run?_id=416a1c6eb426f097dcd35aa745cfe22d&_render=json&snipcode=" + base58_decode(pic_thumb_query) + "&parentid=" + status_id + "&_callback=mediaJson";
			jsonp_fetch( access_URL );
			break;

		case "flickrcom_carrier":
			var pic_thumb_query = media_url.match(mbutil.defined_media_regexp[media_carrier])[1];
				access_URL = "http://pipes.yahoo.com/pipes/pipe.run?_id=416a1c6eb426f097dcd35aa745cfe22d&_render=json&snipcode=" + pic_thumb_query + "&parentid=" + status_id + "&_callback=mediaJson";

			jsonp_fetch( access_URL );
			break;


		default:
			break;
	}

//  getting bkite.com image
// 	if (media_url.match(bkite_carrier)){
// 		var pic_thumb_query = media_url.replace(/.+<a\ [^\>]*href\=\"http\:\/\/bkite\.com\/([0-9a-zA-Z]+)\".+/,"http://bkite.com/objects/$1");
// 		var pic_thumb_loader = document.createElement('script');
// 		pic_thumb_loader.src = "http://pipes.yahoo.com/pipes/pipe.run?_id=WC_YK2IU3hGdr4ty6icw5g&_render=json&snipcode=" + pic_thumb_query + "&parentid=" + id + "&_callback=mediaJson";
// 		document.getElementsByTagName("head")[0].appendChild(pic_thumb_loader);
// 	}
//  getting 12sec.tv image
// 	if (media_url.match(sec_carrier)){
// 		var pic_thumb_query = media_url.match(sec_carrier)[1];
// 		var pic_thumb_loader = document.createElement('script');
// 		pic_thumb_loader.src = "http://pipes.yahoo.com/pipes/pipe.run?_id=db3a5299e7cc3465a16b8333891cdc8d&_render=json&snipcode=" + pic_thumb_query + "&parentid=" + id + "&_callback=mediaJson";
// 		document.getElementsByTagName("head")[0].appendChild(pic_thumb_loader);
// 	}
//  getting tumblr.com image
// 	if (media_url.match(tumbl_carrier)){
// 		var pic_thumb_query = media_url.match(tumbl_carrier)[1];
// 		var pic_thumb_loader = document.createElement('script');
// 		pic_thumb_loader.src = "http://pipes.yahoo.com/pipes/pipe.run?_id=d6a5ce53ecce335477faf60122f8f7f3&_render=json&snipcode=" + pic_thumb_query + "&parentid=" + id + "&_callback=mediaJson";
// 		document.getElementsByTagName("head")[0].appendChild(pic_thumb_loader);
// 	}

//  getting bctiny_carrier image
// 	if (media_url.match(bctiny_carrier)){
// 		var pic_thumb_query = media_url.match(bctiny_carrier)[1];
// 		var pic_thumb_loader = document.createElement('script');
// 		pic_thumb_loader.src = "http://pipes.yahoo.com/pipes/pipe.run?_id=a5de4b4f98184e4d59896d907948397a&_render=json&snipcode=" + pic_thumb_query + "&parentid=" + id + "&_callback=mediaJson";
// 		document.getElementsByTagName("head")[0].appendChild(pic_thumb_loader);
// 	}
// 	return false;
}

place_picture = function( status_id , pic_thumb_src , pic_href )
{
//	window.console.log( "place_picture:" , status_id , pic_thumb_src , pic_href );
	var pic_thumb_wrapper		= document.querySelector("#" + status_id + " a.thumbnail");
	var pic_thumb				= document.querySelector("#" + status_id + " img.thumbnail");
		pic_thumb_wrapper.href	= pic_href;
		pic_thumb.src			= pic_thumb_src;
}

mediaJson = function( data ){
	window.console.log( "mediaJson" , data );
	place_picture( data.value.items[1].content , data.value.items[0].content , data.value.items[2].content );
}

url_expander = function( target_element , shorten_url_carrier )
{
	var unique_id = 'bitly' + guid().replace( /\-/g , '');
	var real_url_holder = document.createElement("A");
		real_url_holder.id = unique_id;
	target_element.appendChild( real_url_holder );
	var url_alias = target_element.href;
	
	if(mbtweet.debug)window.console.log( shorten_url_carrier )
	if( shorten_url_carrier == "am6_carrier" )
	{
		url_alias = url_alias.replace( /am6\.jp/ , "bit.ly");
	}

	var function_name = unique_id;

	BitlyClient.expand( url_alias , function_name );

	//make bit.ly receiver
	var bitly_receiver = document.createElement('script');
		bitly_receiver.id = "bitly_loader" + unique_id;
		bitly_receiver.innerHTML = "var " + function_name + " = function(data){ expandResponse(data , '" + unique_id + "'); document.getElementById('" + bitly_receiver.id + "').parentNode.removeChild(document.getElementById('" + bitly_receiver.id + "'));delete this}";
	document.getElementsByTagName("head")[0].appendChild( bitly_receiver );
}

expand_url = function( real_url, id ){
	//window.console.log( real_url, id );
	var target = document.querySelector("#" + id);
		target.parentNode.removeEventListener( "mouseover", arguments.callee , "false" );

	if( real_url.match( /^https*\:\/\/.+/ ) )
	{
		target.href = real_url;
		target.target = "_blank";
		var inner_string = real_url.replace( /([\/\-?\=\+\%])/g , '$1&shy;');
			inner_string = inner_string.replace( /([a-zA-Z0-9_]{6,6})/g , '$1&shy;' );
		target.innerHTML = inner_string;
		target.style.webkitTransformOrigin = ( target.parentNode.offsetLeft - 85 ) + "px 0px";
		
		removeClass( target.parentNode , 'loading' );
	}
	else
	{
		document.getElementById(id).innerText = 'can\'t read real url';
		removeClass( target , 'loading' );
	}
}
