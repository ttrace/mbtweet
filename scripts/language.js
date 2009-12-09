/*
	codes for language menu of pbtweet.
*/

mbtweet.defined_language = 
{
	af	: "Afrikaans",
	sq	: "Albanian",
	ar	: "Arabic",
	be	: "Belarusian",
	bg	: "Bulgarian",
	ca	: "Catalan",
	"zh-CN"	: "Chinese (Simplified)",
	"zh-TW"	: "Chinese (Traditional)",
	hr	: "Croatian",
	cs	: "Czech",
	da	: "Danish",
	nl	: "Dutch",
	en	: "English",
	et	: "Estonian",
	tl	: "Filipino",
	fi	: "Finnish",
	fr	: "French",
	gl	: "Galician",
	de	: "German",
	el	: "Greek",
	iw	: "Hebrew",
	hi	: "Hindi",
	hu	: "Hungarian",
	is	: "Icelandic",
	id	: "Indonesian",
	ga	: "Irish",
	it	: "Italian",
	ja	: "Japanese",
	ko	: "Korean",
	lv	: "Latvian",
	lt	: "Lithuanian",
	mk	: "Macedonian",
	ms	: "Malay",
	mt	: "Maltese",
	no	: "Norwegian",
	fa	: "Persian",
	pl	: "Polish",
	pt	: "Portuguese",
	ro	: "Romanian",
	ru	: "Russian",
	sr	: "Serbian",
	sk	: "Slovak",
	sl	: "Slovenian",
	es	: "Spanish",
	sw	: "Swahili",
	sv	: "Swedish",
	th	: "Thai",
	tr	: "Turkish",
	uk	: "Ukrainian",
	vi	: "Vietnamese",
	cy	: "Welsh",
	yi	: "Yiddish"
}

mbtweet.set_language = function( lang_code )
{
	var language_name = this.defined_language[ lang_code ];
	if( language_name)
	{
		this.language = 
		{
			lang	: lang_code,
			language: this.defined_language[ lang_code ]
		}
	}
}
