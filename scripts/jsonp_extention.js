// inserting google translation result into tweet's string
gTransExp = function(){
	var translate_parent	= document.querySelector( "#" + arguments[0] ).querySelector( ".u-string" );
	var translate_element	= document.querySelector( "#" + arguments[0] ).querySelector( ".translated" );
	if(arguments[3] != null) // in error case
	{
		translate_element.innerText = arguments[3];
		removeClass(translated_object,'loading');
	}
	else
	{
		var context = arguments[1].translatedText;
		var original_lang = mbtweet.defined_language[ arguments[1].detectedSourceLanguage ];
		if( original_lang == mbtweet.user.language )
		{
			// translated lanugage is same with translated language
			//translate_parent.removeChild( translate_element );
			translate_element.innerHTML = "" + context + " -- translated from :" + original_lang;
			removeClass( translate_element ,'loading');
		}
		else
		{
			// correctry translated
			translate_element.innerHTML = "" + context + " -- translated from :" + original_lang;
			removeClass( translate_element ,'loading');
		}
	}
}
