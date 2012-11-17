	//outputs text to the command output window
	//http://community.activestate.com/faq/how-do-you-write-command-output-window
	this.commandOutput = function(window, aString)
	{
		// First make sure the command output window is visible
        window.ko.run.output.show(window, false);
        // Second, make sure we're showing the output pane, not the error list pane.
        var deckWidget = window.document.getElementById("runoutput-deck");
        if (deckWidget.getAttribute("selectedIndex") != 0) {
            window.ko.run.output.toggleView();
        }
        // Now find out which newline sequence the window uses, and write the
        // text to it.
        var scimoz = window.document.getElementById("runoutput-scintilla").scimoz;
        var prevLength = scimoz.length;
        var currNL = ["\r\n", "\n", "\r"][scimoz.eOLMode];
        var full_str = aString + currNL;
        var full_str_byte_length = window.ko.stringutils.bytelength(full_str);
        var ro = scimoz.readOnly;
        try {
            scimoz.readOnly = false;
            scimoz.appendText(full_str_byte_length, full_str);
        } finally {
            scimoz.readOnly = ro;
        }
        // Bring the new text into view.
        scimoz.gotoPos(prevLength + 1);
	}

  this.notifyTab = function(document, aString)
  {
	if(this.isKomodo())
	{
	  if(!aString || aString=='')
		return;
	  //the container
	  var hbox = document.createElement('hbox');
		  hbox.setAttribute('class', 'notification-inner outset');
		  hbox.setAttribute('style', 'max-height:250px% !important;max-width:100% !important;width:100% !important;cursor:pointer;background-color: -moz-dialog;');
		  hbox.setAttribute('id', this.getExtensionChromeName()+'-notification');
		  hbox.setAttribute('onclick', 'this.parentNode.removeChild(this)');
	  //the icon and the name of the extension
	  var toolbarbutton = document.createElement('toolbarbutton');
		  toolbarbutton.setAttribute('image', 'chrome://'+this.getExtensionChromeName()+'/content/icons/icon16.png');
		  toolbarbutton.setAttribute('style', 'border:1px solid transparent !important;margin:2px !important;padding:0px !important;-moz-appearance: none;margin-left:6px !important;');
		  hbox.appendChild(toolbarbutton);
				
	  //the message
	  var description = document.createElement('description');
		  description.appendChild(document.createTextNode(this.getExtensionName()+' : '+aString));
		  description.setAttribute("wrap", 'true');
		  description.setAttribute("style", 'white-space: pre-wrap;cursor:pointer');
		  
	  var msgContainer = document.createElement('vbox');
		  msgContainer.setAttribute("flex", '1');
		  msgContainer.setAttribute("style", 'padding-top:3px;cursor:pointer');
		  msgContainer.appendChild(description)
	  
		  hbox.appendChild(msgContainer);
			  
	  //the close button
	  var toolbarbutton = document.createElement('toolbarbutton');
		  
		  toolbarbutton.setAttribute('style', 'list-style-image: url(chrome://global/skin/icons/close.png);-moz-image-region: rect(0px, 14px, 14px, 0px);border:1px solid transparent !important;margin:4px !important;padding:0px !important;-moz-appearance: none;margin-left:6px !important;');
		  toolbarbutton.setAttribute('default', 'true');
		  toolbarbutton.setAttribute('tooltiptext', 'Close');
		  toolbarbutton.setAttribute('oncommand', 'this.parentNode.parentNode.removeChild(this.parentNode)');
		  
		  hbox.appendChild(toolbarbutton);
		
		var element = document.getElementById('topview').nextSibling;
			element.parentNode.insertBefore(hbox,  element);
	}
  }
  //shows a notification in the status bar if the status bar is there
  this.notifyStatusBar = function(window, aString)
  {
	if(this.isFirefox() || this.isSeaMonkey())
	{
	  window.setTimeout(
				 function()
						  {
							  if(myExt.getBrowserElement('statusbar-display'))
								  myExt.getBrowserElement('statusbar-display').label =  '__EXT_NOMBRE__ : '+aString;
						  },5);
	}
	else if(this.isKomodo())
	{
	  window.setTimeout(function(){
		window.ko.statusBar.AddMessage(s.getExtensionName()+' : '+aString, s.getExtensionChromeName(), 5 * 1000, true);
	  }, 5);
	}
  }
	
