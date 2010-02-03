init_shorten_url = function()
{
	var status_editor = document.querySelector("#status");
	status_editor.addEventListener(	"keyup" ,
									function(e)
									{
										status_counter();
										var reply_to = document.querySelector("#in_reply_to").value;
										if( !e.target.value.match( new RegExp(reply_to) ) )
										{
											remove_in_reply_to();
										}
										if( e.keyCode == 32 )
										{
											shorten_url(e.target , "withspace");
										}
										mbtweet.bitly_token = guid();
										var bitly_token_temp = mbtweet.bitly_token;
										setTimeout(function(e)
										{
											shorten_url( document.querySelector("#status") , "all" , (bitly_token_temp + ""));
										} , 1500);
										if(mbtweet.debug)window.console.log(bitly_token_temp);
									} ,
									true );

	status_editor.addEventListener(	"focus" ,
									function(e)
										{
											shorten_url(e.target , "all");
										} ,
										true );

	status_editor.addEventListener(	"blur" ,
									function(e)
									{
										shorten_url(e.target , "all");
									} ,
									true );	
}

shorten_url	= function( target )
{
	if(mbtweet.debug)window.console.log( arguments[2] , mbtweet.bitly_token );
	if( arguments[1] == "whitespace" || arguments[2] == mbtweet.bitly_token)
	{
		var original_string = target.value;
		var url_detection_regexp_num = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/^”\)]))?/g;
		if(arguments[1] == 'all')
		{
			var url_detection_regexp = /((http|https):\/\/(\w+:{0,1}\w*@)?([^\s\)\"\'”]+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/;
		}
		else
		{
			var url_detection_regexp = /((http|https):\/\/(\w+:{0,1}\w*@)?([^\s\)\"\'”]+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)\s/;
			//var url_detection_regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\s/g;
		}
		var shorten_url_detector = /bit\.ly|j.mp|tinyurl\.com|is\.gd|turl\/nl|ff\/.im\/|twitpic\.com|twitvid\.com|pic\.gd|movapic\.com|yfrog\.com|www\.bcphotoshare\.com|bkite\.com|tiny12\.com|tumblr\.com|flic\.kr|www\.flickr\.com|bctiny\.com|f\.hatena\.ne\.jp|www.youtube.com\/watch\?v\=[a-zA-Z0-9\_]{8,15}/;
		var match_url = original_string.match( url_detection_regexp_num );
		//var match_url = original_string.match(url_detection_regexp);
		if( match_url )
		{
			for(var i = 0 ; i < match_url.length ; i ++)
			{
				if( !match_url[i].match(shorten_url_detector) && match_url[i].length >= 30 )
				{
					window.console.log( i , match_url );
					//window.console.log( match_url[i] , match_url[i].match( url_detection_regexp )[1] );
					BitlyClient.shorten( match_url[i].match( url_detection_regexp )[1] , 'bitly_shorten_URL');
					//BitlyClient.shorten( match_url[i] , 'bitly_shorten_URL');
				}
			}
		}
	}
	status_counter();
}

bitly_shorten_URL = function(data)
{	//bit.ly shorten support script
	var result;
	var url_list;
	var short_url		= '';
	var original_url	= '';
	var i = 0;
	for( key in data.results )
	{	
		if( !key.match(/https?:\/\//) )
		{
			 original_url	= key;
			 short_url		= key;
		} else {
			original_url = key.replace(/(\#|\!|\?|\+|\=|\&|\%|\@|\!|\-|\/)/g,'\\$1');
			short_url = data.results[key]['shortUrl'];
			var original_text = document.querySelector("#status").value;
			var replace_text = original_text.replace( new RegExp(original_url) , short_url)
			document.querySelector("#status").value = replace_text;
		}
	}
	return;
}

expandResponse = function(data , target_id)
{	//bit.ly expander support script
	var result;
	var url_list;
	var real_url = '';
	var i = 0;
	for( key in data.results )
	{	
		if( key.match(/\-/) )
		{
			target_id = key + '';
		} else {
			real_url = data.results[key]['longUrl'];
		}
	}
	expand_url( real_url , target_id );
	return;
}


//
if (typeof(BitlyApi) == 'undefined')
    var BitlyApi = {}; // BitlyApi namespace. You sholdn't need to access methods here. Instead, use an instance of BitlyApiClient().
 
if (typeof(BitlyCB) == 'undefined')
    var BitlyCB = {}; // global namespace for your callback methods. Allows you to define callabacks from within other method calls.
 
BitlyApi.loadScript = function(_src) { 
	jsonp_fetch( _src );
//   var e = document.createElement('script'); 
//   e.setAttribute('language','javascript'); 
//   e.setAttribute('type', 'text/javascript');
//   e.setAttribute('src',_src); document.body.appendChild(e); 
};
 
BitlyApi.loadCss = function(u) { 
  var e = document.createElement('link'); 
  e.setAttribute('type', 'text/css'); 
  e.setAttribute('href', u); 
  e.setAttribute('rel', 'stylesheet'); 
  e.setAttribute('media', 'screen');
  try {
    document.getElementsByTagName('head')[0].appendChild(e);
  } catch(z) {
    document.body.appendChild(e);
  }
};
 
BitlyApi.call = function(method, params, callback_method_name) {
    var s = "http://api.bit.ly/" + method;
    var url_args = [];
    if (callback_method_name) url_args.push("callback=" + callback_method_name);
    
    for (var name in params) {
        url_args.push(name + "=" + encodeURIComponent(params[name]));
    };
    
    s += "?" + url_args.join("&");
    BitlyApi.loadScript(s);
};
 
var BitlyApiClient = function(login, apiKey, version){
    this.login = login || "ttrace";
    this.apiKey = apiKey || "R_2b774725405f8f66f2f6565838bb04f5";
    this.version = version || "2.0.1";
};
 
BitlyApiClient.prototype.googleVisRequired = "This method requires the google visualization api. Please include javascript from: http://www.google.com/jsapi. More info: http://code.google.com/apis/visualization/documentation/index.html";
BitlyApiClient.prototype.availableModules = ['stats'];
BitlyApiClient.prototype.loadingModules = {};
 
BitlyApiClient.prototype.moduleLoaded = function(module_name, callback_method_name) {
    BitlyApiClient.prototype.loadingModules[module_name] = true;
    for (var mod in BitlyApiClient.prototype.loadingModules) {
        if (!BitlyApiClient.prototype.loadingModules[mod]) {
            return false;
        }
    };
    eval(callback_method_name + "();");
};
 
BitlyApiClient.prototype.loadModules = function(module_names, callback_method_name) {
    for (var i=0; i < module_names.length; i++) {
        BitlyApiClient.prototype.loadingModules[module_names[i]] = false;
    };
    for (var i=0; i < module_names.length; i++) {
        var name = module_names[i];
        var callback_name = "module_" + name + "_loaded";
        BitlyCB[callback_name] = function() {
          BitlyApiClient.prototype.moduleLoaded(name, callback_method_name);
        };
        var s = "http://bit.ly/app/modules/" + name + ".js?callback=BitlyCB." + callback_name;
        try {
            BitlyApi.loadScript(s);
        } catch(e) {
            BitlyClient.addPageLoadEvent(function(){
                BitlyApi.loadScript(s);
            });
        }
    };
    try {
        BitlyApi.loadCss("http://bit.ly/static/css/javascript-modules.css");
    } catch(e) {
        BitlyClient.addPageLoadEvent(function(){ 
            BitlyApi.loadCss("http://bit.ly/static/css/javascript-modules.css"); 
        });
    }
};


// following code is for bit.ly supporting.
/*
# utils
 
*/
BitlyApiClient.prototype.addPageLoadEvent = function(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() { oldonload(); func(); };
	}
};
 
BitlyApiClient.prototype.extractBitlyHash = function(bitly_url_or_hash) {
    if (bitly_url_or_hash == null) {
        return null;
    } else {
        var m = bitly_url_or_hash.match(/\/([^\/]+)$/);
        if (m) {
            return m[1];
        }
        else {
            return bitly_url_or_hash;
        }
    }
};
 
BitlyApiClient.prototype.createElement = function(element_type, attrs) {
  var el = document.createElement(element_type);
  for (var k in attrs) {
    if (k == "text") {
      el.appendChild(document.createTextNode(attrs[k]));
    } else {
      this.setAttribute(el, k, attrs[k]);
    }
  };
  return el;
};
 
BitlyApiClient.prototype.setAttribute = function(element, attribute_name, attribute_value) {
  if (attribute_name == "class") {
    element.setAttribute("className", attribute_value); // set both "class" and "className"
  }
  return element.setAttribute(attribute_name, attribute_value);
};
 
BitlyApiClient.prototype.listen = function (elem, evnt, func) {
  if (elem.addEventListener) // W3C DOM
    elem.addEventListener(evnt,func,false);
  else if (elem.attachEvent) { // IE DOM
    var r = elem.attachEvent("on"+evnt, func);
    return r;
  }
};
 
BitlyApiClient.prototype.targ = function (e) {
	var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
	return targ;
};
 
BitlyApiClient.prototype.toggle = function(el) {
  var e;
  if (typeof(el) == 'string') {
    e = document.getElementById(el);
    if (typeof(e) == undefined) {
      throw "toggle: No DOM element with id: " + el;
      return;
    }
  } else {
    e = el;
  }
  if (e.style.display == 'none') {
    e.style.display = '';
  } else {
    e.style.display = 'none';
  }
};
 
/*
# API
    
Generic API caller for more advanced API usage. Allows you to specify extra params for method calls with options. Eg, you can call the /info API and ask for a subset of data using the 'keys' param.
*/
BitlyApiClient.prototype.call = function(method, params, callback_method_name) {
    params['version'] = this.version;
    params['login'] = this.login;
    params['apiKey'] = this.apiKey;
    return BitlyApi.call(method, params, callback_method_name);
};
 
// shorten a long url
BitlyApiClient.prototype.shorten = function(longUrl, callback_method_name) {
    return this.call('shorten', {'longUrl': longUrl}, callback_method_name);
};
 
// expand a bitly url
BitlyApiClient.prototype.expand = function(shortUrl, callback_method_name) {
    return this.call('expand', {'shortUrl': shortUrl}, callback_method_name);
};

 
// get info about one or more bitly urls or hashes
BitlyApiClient.prototype.info = function(bitly_hash, callback_method_name) {
    var arr = bitly_hash.split(',');
    var hashes = [];
    for (var i=0; i < arr.length && i < 1; i++) {// limit to 1 bitly_hash
        hashes.push(this.extractBitlyHash(arr[i]));
    };
    return this.call('info', {'hash': hashes.join(',')}, callback_method_name);
};
 
// get referrer data about a bilty url or hash
BitlyApiClient.prototype.stats = function(bitly_hash_or_url, callback_method_name) {
    bitly_hash_or_url = this.extractBitlyHash(bitly_hash_or_url);
    return this.call('stats', {'hash': bitly_hash_or_url}, callback_method_name);
};
 
/*
# TESTS
    
*/
BitlyApiClient.prototype.shortenTest = function() {
    this.shorten(document.location, 'shortenTestCB');
};
function shortenTestCB(data) {
    // this is how to get a result of shortening a single url
    var result;
    for (var r in data.results) {
        result = data.results[r];
        result['longUrl'] = r;
        break;
    };
    alert(result['longUrl'] + " shortened to " + result['shortUrl']);
};
 
BitlyApiClient.prototype.expandTest = function() {
    this.expand("http://bit.ly/3j4ir4", 'expandTestCB');
};
function expandTestCB(data) {
    // this is how to get a result of expanding a single url
    var result;
    for (var r in data.results) {
        result = data.results[r];
        result['hash'] = r;
        break;
    };
    alert(result['hash'] + " expanded to " + result['longUrl']);
};
 
BitlyApiClient.prototype.infoTest = function() {
    this.info("http://bit.ly/3j4ir4", 'infoTestCB');
};
function infoTestCB(data) {
    // this is how to get a doc of info call for a single url
    var doc;
    for (var r in data.results) {
        doc = data.results[r];
        break;
    };
    alert("got info for " + doc['hash'] + ". eg., longUrl is " + doc['longUrl'] + ", title is " + doc['htmlTitle']);
};
 
BitlyApiClient.prototype.statsTest = function() {
    this.stats("http://bit.ly/3j4ir4", 'statsTestCB');
};
function statsTestCB(data) {
    var stats = data.results;
    alert("stats for " + stats['hash'] + ". " + stats['clicks'] + " clicks");
};

/*
# INSTANTIATE CLIENT
    
*/
var BitlyClient = new BitlyApiClient();
