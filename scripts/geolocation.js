if( location.href.match(/127\.0\.0\.1/) )
{
	// development
	var googlemap_key = "ABQIAAAACAMtc-y1LwywgGCww_SsjBT2yXp_ZAY8_ufC3CFXhHIE1NvwkxSdzi40hfZvKKmOfXfYep2QGPPvaQ";
}
else
{
	// taiyolab.com key.
	var googlemap_key = "ABQIAAAACAMtc-y1LwywgGCww_SsjBRLdMfD-6EmPvs7xjM2FgsMtTz4ixQtxIiuzbaAEeCJip-OpYJXTLq7Uw";
}


get_geolocation_info = function( target_id , ll )
{
	var func_name	= "insertgeo" + target_id.replace(/\-/g , '');
	var gl			= mbtweet.user.language;
	eval( func_name + "=function( data ){insertGeoInfo(data,'" + target_id + "');delete this;}" );
	var access_URL = "http://maps.google.com/maps/geo?q=" + ll[0] + "," + ll[1] + "&gl=" + gl + "&output=json&sensor=false&key=" + googlemap_key + "&callback=" + func_name;
	jsonp_fetch( access_URL );
}


insertGeoInfo = function( data , target_id )
{
	var target_object = document.getElementById( target_id );
	if( target_object )
	{
		var address_text_string = "";
		var max_accuracy = { id : null , accuracy : 0 };
		var zoom = 6;
		for( var i = 0 ; i < data.Placemark.length ; i++ )
		{
			if( data.Placemark[i].AddressDetails.Accuracy >= max_accuracy.accuracy && data.Placemark[i].AddressDetails.Accuracy < 9 )
			{
				max_accuracy.id = i;
				max_accuracy.accuracy = data.Placemark[i].AddressDetails.Accuracy;	
			}
		}
		zoom += max_accuracy.accuracy;
		
		var address_text = document.createElement("DIV");
			address_text.className = "map-title";
			address_text.innerText = data.Placemark[ max_accuracy.id ].address;

		var address_map_url = "http://maps.google.com/maps/api/staticmap?";
			address_map_url += "&key=" + googlemap_key;
			address_map_url += "&center=" + data.name;
			address_map_url += "&zoom=" + zoom;
			address_map_url += "&format=PNG";
			address_map_url += "&sensor=false";
			address_map_url += "&markers=color:red|" + data.name;
			address_map_url += "&size=200x200";

		var address_map = document.createElement("IMG");
			address_map.className	= "map";
			address_map.src = address_map_url;
			
			address_text.appendChild( address_map );
		
		target_object.insertBefore( address_text , target_object.firstChild );
		target_object.querySelector("a").href += zoom;
	}
	//if(mbtweet.debug)window.console.log( data , target_id);
}

insertMap = function( )
{
}