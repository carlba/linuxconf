  
  const RXencodePath = /%2F/gi;
  
  this.encodePath = function(aString)
  {
	return this.encodeUTF8(aString).replace(RXencodePath, '/');
  }
  this.encodeUTF8 = function(aString)
  {
	try {
	  return encodeURIComponent(aString);
	} catch(e) {
	  try {
		return encodeURI(aString);
	  } catch(e) {
		try {
		  return escape(aString);
		} catch(e) {
		  return aString;
		}
	  }
	}
  }
  //encodes a URI - Example: converts this http://www.dmoz.org/World/Español/ to  http://www.dmoz.org/World/Espa%C3%B1ol/
  this.encodeURI = function(aURI)
  {
	try
	{
	  return encodeURI(aURI);
	}
	catch(e)
	{
	  return aURI;
	}
  };

  //sort with the user local
  //NOTE:case sensitive sort
  this.sortLocale = function(a, b)
  {
	return a.localeCompare(b);
  }
  //trims a string
  this.trim = function(aString)
  {
	return this.string(aString).trim();
  };

  //cast an object toString avoids null errors
  this.string = function(aString)
  {
	if(!aString)
	  return '';
	else
	  return aString.toString();
  };
  
  this.stringSupports = function(aString)
  {
	var stringSupports = Components
						  .classes["@mozilla.org/supports-string;1"]
						  .createInstance(Components.interfaces.nsISupportsString);
		  stringSupports.data = aString;
	return stringSupports;
  }
  //Encodes HTML special chars
  this.htmlSpecialCharsEncode = function(aString)
  {
	if(!aString)
	  return '';
	
	return aString.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;').split("'").join('&apos;');
  }
  //Decodes HTML special chars
  this.htmlSpecialCharsDecode = function(aString)
  {
	return aString.split('&lt;').join('<').split('&gt;').join('>').split('&quot;').join('"').split('&apos;').join("'").split('&amp;').join('&');
  }
  //decodes a string
  this.decodeUTF8 = function(aString)
  {
	if(aString.indexOf('%') == -1)
		return aString;
	try
	{
	  return decodeURIComponent(aString);
	}
	catch(e)
	{
	  try
	  {
		return decodeURI(aString);
	  }
	  catch(e)
	  {
		return aString;
	  }
	}
  }
  //decodes all chars encoded in a string
  this.decodeUTF8Recursive = function(aString)//recursion was optimized
  {
	while(aString.indexOf('%') != -1)
	{
	  aString = aString.replace(/% +/g, '%');

	  var last = aString;
	  
	  try
	  {
		aString = decodeURIComponent(aString);
	  }
	  catch(e)
	  {
		e = null;
		try
		{
		  aString = decodeURI(aString);
		}
		catch(e)
		{
		  e = null;
		  last = null;
		  return aString;
		}
	  }
	  if(aString==last)
		  break;
		
	}
	last = null;
	return aString;
  }
  //escapes a regular expression
  this.escapeRegularExpressionRX1 = /\|/g;
  this.escapeRegularExpressionRX2 = /\+/g;
  this.escapeRegularExpressionRX3 = /\?/g;
  this.escapeRegularExpressionRX4 = /\{/g;
  this.escapeRegularExpressionRX5 = /\}/g;
  this.escapeRegularExpressionRX6 = /\(/g;
  this.escapeRegularExpressionRX7 = /\)/g;
  this.escapeRegularExpressionRX8 = /\[/g;
  this.escapeRegularExpressionRX9 = /\]/g;
  this.escapeRegularExpressionRX10 = /\$/g;
  this.escapeRegularExpressionRX11 = /\^/g;
  this.escapeRegularExpressionRX12 = /\*/g;
  this.escapeRegularExpressionRX13 = /\:/g;
  this.escapeRegularExpressionRX14 = /\./g;
  
  this.escapeRegularExpression = function(aRegularExpressionString)
  {
	return aRegularExpressionString
			.replace(this.escapeRegularExpressionRX1, '\\|')
			.replace(this.escapeRegularExpressionRX2, '\\+')
			.replace(this.escapeRegularExpressionRX3, '\\?')
			
			.replace(this.escapeRegularExpressionRX4, '\\{')
			.replace(this.escapeRegularExpressionRX5, '\\}')
			
			.replace(this.escapeRegularExpressionRX6, '\\(')
			.replace(this.escapeRegularExpressionRX7, '\\)')
			
			.replace(this.escapeRegularExpressionRX8, '\\[')
			.replace(this.escapeRegularExpressionRX9, '\\]')
			
			.replace(this.escapeRegularExpressionRX10, '\\$')
			.replace(this.escapeRegularExpressionRX11, '\\^')
			
			.replace(this.escapeRegularExpressionRX12, '\\*')
			.replace(this.escapeRegularExpressionRX13, '\\:')
			.replace(this.escapeRegularExpressionRX14, '\\.');
  }
  //matchs a regular expresion
  this.match = function(aString, aREGEXP)
  {
	if(aREGEXP=='')
	{
	  aString = null;
	  aREGEXP = null;
	  return false;
	}
	try
	{
	  aREGEXP = new RegExp(aREGEXP, 'i');
	  if(aREGEXP.test(aString))
	  //if(aString.match(aREGEXP, 'i'))//this leaks mem
	  {
		aString = null;
		aREGEXP = null;
		return true;
	  }
	  else
	  {
		aString = null;
		aREGEXP = null;
		return false;
	  }
	}
	catch(e)
	{
	  aString = null;
	  aREGEXP = null;
	  e = null;
	  return false;
	}
  }

  
  //returns the string with the first char in uppercase
  this.ucFirst = function(aString)
  {
	  if(!aString)
		  return '';
	  return aString.substring(0, 1).toUpperCase()+aString.substring(1, aString.length);
  }

  //Count the number of substring occurrences
  this.subStrCount = function(aString, aStringToCount)
  {
	var a = 0;
	var pos = aString.indexOf(aStringToCount);
	while(pos != -1) 
	{
	  a++;
	  pos = aString.indexOf(aStringToCount, pos+1);
	}
	return a;
  }
