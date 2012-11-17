	// close a tab and return true if the tab was closed. It will return false if the tab is protected by another extension
	this.tabClose = function(aTab)
	{
		if(!aTab.hasAttribute('isPermaTab') && !aTab.hasAttribute('protected'))
		{
			try
			{
				gBrowser.closeTab(aTab);
			}
			catch(e)
			{
				gBrowser.removeTab(aTab);
			}
			return true;
		}		
		return false;
	}
	//returns the tab context menu
	this.tabContextMenu = function()
	{
		if(document.getAnonymousElementByAttribute(this.getBrowserElement("content") , "anonid", "tabContextMenu"))
			return document.getAnonymousElementByAttribute(this.getBrowserElement("content") , "anonid", "tabContextMenu");
		else if(gBrowser.tabContainer && gBrowser.tabContainer.contextMenu)
			return gBrowser.tabContainer.contextMenu;
		else
			return this.getBrowserElement('tabContextMenu');
	}
	//returns the tab location of the tab that is in the context menu
	this.tabContextMenuLocation = function()
	{
		if(gBrowser.mContextTab)
			return this.tabGetLocation(gBrowser.mContextTab);
		else
			return '';
	}
	//returns a count of tabs 
	this.tabCount = function()
	{
		return gBrowser.tabContainer.childNodes.length;
	}
	//returns a count of tabs pinned
	this.tabCountPinned = function()
	{
		var numPinnedTabs = 0;
		var numTabs = this.tabCount();
		for(var a = 0; a < numTabs; a++)
		{
			if(gBrowser.tabContainer.childNodes[a].pinned)
			{
				numPinnedTabs++;
			}
		}
		return numPinnedTabs;
	}
	//gets the content of aTab with tags stripped
	//TODO mix frames into one content.
	this.tabGetBodyNoTags = function(aTab)
	{
	  return this.htmlEntityDecode(
			  this.decodeUTF8Recursive(
				this.stripTags(
				  this.stripTagsWithContent(
					  this.documentGetBody(this.documentGetFromTab(aTab))
				  )
				, ' ')
			  ));
	}
	//returns the focused tab
	this.tabGetFocused = function(window)
	{
	  if(this.isFirefox() || this.isSeaMonkey())
	  {
		return gBrowser.tabContainer.childNodes[gBrowser.tabContainer.selectedIndex];
	  }
	  else if(this.isKomodo())
	  {
		if(window.ko.views.manager.currentView)
		  return window.ko.views.manager.currentView;
		else
		  return null;
	  }
	  else
	  {
		return this.errorNoApplication('tabGetFocused');
	  }
	}
	//returns a tab from a document
	/*
		http://forums.mozillazine.org/viewtopic.php?p=3329527#p3329527
		document of page = event.originalTarget
		window of page = event.originalTarget.defaultView
		browser = gBrowser.getBrowserForDocument(event.originalTarget)
		tab = gBrowser.mTabs[gBrowser.getBrowserIndexForDocument(event.originalTarget)]
		panel = gBrowser.mTabs[gBrowser.getBrowserIndexForDocument(event.originalTarget)].linkedPanel
	*/
	this.tabGetFromDocument = function(aDoc)
	{
		return gBrowser.mTabs[gBrowser.getBrowserIndexForDocument(this.documentGetTop(aDoc))]
	}
	//gets the current URI from aTab-REVIEW
	this.tabGetLocation = function(aTab)
	{
		if(aTab.hasAttribute('permaTabUrl'))
			return String(aTab.getAttribute('permaTabUrl'));
		else
		{
			if(this.browserGetFromTab(aTab) && this.browserGetFromTab(aTab).currentURI && this.browserGetFromTab(aTab).currentURI.spec)
				return String(this.browserGetFromTab(aTab).currentURI.spec);
			else
				return '';
		}
	}
	//gets the title aTab
	this.tabGetTitle = function(aTab)
	{
		if(aTab.hasAttribute('ontap') && aTab.getAttribute('ontap') == 'true')
			return aTab.getAttribute('label');
		else
			return this.documentGetTitle(this.documentGetFromTab(aTab));
	}
	//returns true if a tab has frames
	this.tabHasFrames = function(aTab)
	{
		if(this.windowGetFromTab(aTab).frames.length > 0)
			return true;
		else
			return false;
	}
	//Hides a tab and return true if the tab was hidden. It will return false if the tab is protected
	this.tabHide = function(aTab)
	{
		if(!aTab.hasAttribute('isPermaTab') && !aTab.hasAttribute('protected'))
		{
			aTab.setAttribute('hidden', true);
			aTab.setAttribute('myExt-HiddenTab', true);
			return true;
		}
		return false;
	}
	//returns true if the tab is hidden
	this.tabIsHidden = function(aTab)
	{
		if(aTab.hasAttribute('hidden') && aTab.getAttribute('hidden') == 'true')
			return true;
		else
			return false;
	}
	//moves a tab
	this.tabMove = function(aTab, newPosition)
	{
		if('TMmoveTabTo' in gBrowser)//tab mix plus in tha house
		{
			// try to use browser move when tab mix plus fails, example on 3.0a7pre 
			try
			{
				gBrowser.TMmoveTabTo(aTab, newPosition);
			}
			catch(e)
			{
				gBrowser.moveTabTo(aTab, newPosition);
			}
		}
		else
			gBrowser.moveTabTo(aTab, newPosition);
	}
	//open a new tab with an URL that is already encoded example:http://www.dmoz.org/World/Espa%C3%B1ol/
	this.tabOpen = function(aURL, selected, aPostData)
	{
		this.treeStyleTabInTreeOpenStart();
		
		var aTab = gBrowser.addTab(aURL, null, null, this.postData(aPostData));
		if(!selected){}
		else
			this.tabSelect(aTab);

		this.treeStyleTabInTreeOpenStop();
		return aTab;
	}
	//selects a tab
	this.tabSelect = function(aTab)
	{
		gBrowser.selectedTab = aTab;
	}
	//Shows a tab hidden by this extension
	this.tabShow = function(aTab)
	{
		if(!aTab.hasAttribute('hidden') || aTab.getAttribute('hidden') == 'false')
		{
			return true;
		}
		if(aTab.hasAttribute('myExt-HiddenTab'))
		{
			aTab.removeAttribute('myExt-HiddenTab');
			aTab.setAttribute('hidden', false);
			return true;
		}
		return false;
	}
