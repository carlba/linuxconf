
this.include('application');
this.include('window');

	//opens a an URL that is already encoded example:http://www.dmoz.org/World/Espa%C3%B1ol/ 
	//if allowed and selected: in a sub browser of split browser extension, at the desired position
	//else in a normal tab, selected or not
	this.openURL = function(window, aURL, inNewTab, inNewWindow, giveFocus, onSubBrowser, subBrowserPosition, aPostData, byPassSecure)
	{
	  if(this.isSeaMonkey() || this.isFirefox())
	  {
		//security
		if(this.isSecureURI(aURL) || byPassSecure)
		{
			if(inNewWindow && !inNewTab)//err! this is not fun!
			{
				if(!aPostData)
					window.open(aURL);
				else
				{
					if(this.isSeaMonkey())
						window.openDialog('chrome://navigator/content', '_blank', 'all,dialog=no', aURL, null, null, this.postData(aPostData));
					else
						window.openDialog('chrome://browser/content', '_blank', 'all,dialog=no', aURL, null, null, this.postData(aPostData));
				}
			}
			else
			{
				//if the user allowed the usage of other add-ons and if is there
				if(onSubBrowser && this.isThereSplitBrowser() && this.usePowerExtensionsWhenAvailable)
				{
						try{
							//find the position of the split browser
								var aPosition;
								if(subBrowserPosition == 'L')
									aPosition = SplitBrowser.POSITION_LEFT
								else if(subBrowserPosition == 'R')
									aPosition = SplitBrowser.POSITION_RIGHT
								else if(subBrowserPosition == 'T')
									aPosition = SplitBrowser.POSITION_TOP
								else if(subBrowserPosition == 'B')
									aPosition = SplitBrowser.POSITION_BOTTOM
									
							//check if there subbrowser is already opened
							if(!this.aSubBrowser || !this.aSubBrowser[subBrowserPosition] || !this.aSubBrowser[subBrowserPosition].browser)
							{
								if(!this.aSubBrowser)
									this.aSubBrowser = [];
	
								this.aSubBrowser[subBrowserPosition] = SplitBrowser.addSubBrowser('', SplitBrowser.activeBrowser, aPosition);
								this.aSubBrowser[subBrowserPosition].browser.loadURIWithFlags(aURL, null, null, null, this.postData(aPostData) )
							}
							else
							{
								if(inNewTab)
								{
									var aTab = this.aSubBrowser[subBrowserPosition].browser.addTab(aURL, null, null, this.postData(aPostData));
									
									if(giveFocus)
									{
										this.aSubBrowser[subBrowserPosition].browser.focus();
										this.aSubBrowser[subBrowserPosition].browser.selectedTab = aTab;
									}
								}
								else
								{
									this.aSubBrowser[subBrowserPosition].browser.loadURIWithFlags(aURL, null, null, null, this.postData(aPostData) )
								}
							}
							return;
							
						}catch(e){}
				}
				//if split browser is not there, or if is usage of the power extensions is disabled ,or if fails
				// open a normal tab
				if(inNewTab && this.documentFocusedGetLocation() != 'about:blank')
					this.tabOpen(aURL, giveFocus, aPostData);
				else
					gBrowser.loadURIWithFlags(aURL, null, null, null, this.postData(aPostData))
			}
		}
	  }
	  else if(this.isKomodo())
	  {
		if(inNewTab)
		  window.ko.open.multipleURIs([aURL]);
		else
		{
		  this.error('openURL !inNewTab not implemented');
		}
	  }
	}