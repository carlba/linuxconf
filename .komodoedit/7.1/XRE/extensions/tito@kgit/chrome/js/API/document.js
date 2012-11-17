	//returns the current focused location
	this.documentFocusedGetLocation = function(window)
	{
	  if(this.isFirefox() || this.isSeaMonkey())
	  {
		return String(window.top.getBrowser().browsers[window.top.getBrowser().mTabBox.selectedIndex].contentDocument.location);
	  }
	  else if(this.isKomodo())
	  {
		return this.documentGetLocation(this.documentGetFocused(window));
	  }
	  else
	  {
		return this.errorNoApplication('documentFocusedGetLocation');
	  }
	}
	//returns the body of a document
	this.documentGetBody = function(aDoc)
	{	
		if(aDoc.body && aDoc.body.innerHTML)
			return String(aDoc.body.innerHTML);
		else
			return '';
	}
  	//returns the current focused document
	this.documentGetFocused = function(window)
	{
	  if(this.isFirefox() || this.isSeaMonkey())
	  {
		return window.top.getBrowser().browsers[window.top.getBrowser().mTabBox.selectedIndex].contentDocument;
	  }
	  else if(this.isKomodo())
	  {
		var aDoc = this.documentGetFromTab(this.tabGetFocused(window));
		if(aDoc)
		  return aDoc;
		else
		  return null;
	  }
	  else
	  {
		return this.errorNoApplication('documentGetFocused');
	  }
	}
	//gets the title of the  aTab
	this.documentGetFromTab = function(aTab)
	{
	  if(this.isFirefox() || this.isSeaMonkey())
	  {
		return this.browserGetFromTab(aTab).contentDocument;
	  }
	  else if(this.isKomodo())
	  {
		if(aTab && aTab.document)
		  return aTab.document;
		else
		  return null;
	  }
	  else
	  {
		return this.errorNoApplication('documentGetFromTab');
	  }
	}
	//returns the head of a document
	this.documentGetHead = function(aDoc)
	{	
		var head = aDoc.getElementsByTagName('head')
		if(head[0])
			return String('<head>\n'+head[0].innerHTML+'\n</head>');
		else
			return '';
	}
	//returns a location for a document
	this.documentGetLocation = function(aDoc)
	{
	  if(this.isFirefox() || this.isSeaMonkey())
	  {
		return String(aDoc.location);
	  }
	  else if(this.isKomodo())
	  {
		if(aDoc && aDoc.displayPath)
		  return aDoc.displayPath;
		else
		  return 'about:blank';
	  }
	  else
	  {
		return this.errorNoApplication('documentGetLocation');
	  }
	}
	//returns the referrer of a a document
	this.documentGetLocationReferrer = function(aDoc)
	{
		return String(aDoc.referrer || '');
	}
	//returns the  content of the meta description of a document 
	this.documentGetMetaDescription = function(aDoc)
	{
		return this.trim(this.stripTags(this.htmlEntityDecode(this.stripTags(this.documentGetRAWMetaDescription(aDoc), ' ')), ' '));	
	}
	//returns the  content of the meta description of a document 
	this.documentGetRAWMetaDescription = function(aDoc)
	{
		var tobj = aDoc.evaluate("//*/meta[translate(@name, 'DESCRIPTION', 'description') = 'description']", aDoc, null, XPathResult.ANY_TYPE, null);

		var metaTag = tobj.iterateNext();
		if(metaTag)
		{
			return metaTag.getAttribute('content');
		}
		else
		{
			var tobj = aDoc.evaluate("//*/meta[translate(@http-equiv, 'DESCRIPTION', 'description') = 'description']", aDoc, null, XPathResult.ANY_TYPE, null);
	
			var metaTag = tobj.iterateNext();
			if(metaTag)
			{
				return metaTag.getAttribute('content');
			}
			else
			{
				return '';
			}
		}
	}
	//returns the content of the meta keywords of a document 
	this.documentGetRAWMetaKeywords = function(aDoc)
	{
		var tobj = aDoc.evaluate("//*/meta[translate(@name, 'KEYWORDS', 'keywords') = 'keywords']", aDoc, null, XPathResult.ANY_TYPE, null);
		//var tobj = aDoc.evaluate("//*/meta[@name='DESCRIPTION']|//*/meta[@name='description']", aDoc, null, XPathResult.ANY_TYPE, null);
		var metaTag = tobj.iterateNext();
		if(metaTag)
		{
			return metaTag.getAttribute('content');
		}
		else
		{
			var tobj = aDoc.evaluate("//*/meta[translate(@http-equiv, 'KEYWORDS', 'keywords') = 'keywords']", aDoc, null, XPathResult.ANY_TYPE, null);
			//var tobj = aDoc.evaluate("//*/meta[@name='DESCRIPTION']|//*/meta[@name='description']", aDoc, null, XPathResult.ANY_TYPE, null);
			var metaTag = tobj.iterateNext();
			if(metaTag)
			{
				return metaTag.getAttribute('content');
			}
			else
			{
				return '';
			}
		}
	}
	//gets the title of the  aTab-REVIEW
	this.documentGetRAWTitle = function(aDoc)
	{
		return String(aDoc.title);
	}
	//gets the title of the  aTab-REVIEW
	this.documentGetTitle = function(aDoc)
	{
		return this.trim(this.stripTags(this.htmlEntityDecode(String(aDoc.title))));
	}
	//returns the TOP document
	this.documentGetTop = function(aDoc)
	{
		if(!aDoc.defaultView)
			return aDoc;
		else
			return aDoc.defaultView.top.document;
	}
	//returns the TOP location for a document
	this.documentGetTopLocation = function(aDoc)
	{
		return String(this.documentGetTop(aDoc).location);
	}
	//returns true if the document has a frameset
	this.documentHasFrameSet = function()
	{
		var aDoc = this.documentGetFocused();
		if(aDoc.body && String(aDoc.body).indexOf('FrameSet') != -1)
			return true;
		else
			return false;
	}