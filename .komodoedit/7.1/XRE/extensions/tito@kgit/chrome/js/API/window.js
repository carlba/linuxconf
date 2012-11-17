
  this.windowID = 1;
  this.getWindowID = function()
  {
	return this.windowID++;
  }
  
  __defineGetter__("window", function() {
	
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]  
					.getService(Components.interfaces.nsIWindowMediator);
	if(this.isFirefox() || this.isSeaMonkey())
	{
	  return wm.getMostRecentWindow('navigator:browser');
	}
	else if(this.isKomodo())
	{
	  return wm.getMostRecentWindow('Komodo');
	}
	else if(this.isThunderbird())
	{
	  this.errorNoApplicaton('__defineGetter__("window")');
	  return null;
	}
	else
	{
	  this.errorNoApplicaton('__defineGetter__("window")');
	  return null;
	}
  });
  
  this.__noSuchMethod__ = function(id, a) {
	this.dump('warning calling method "'+id+'" with arguments "'+JSON.stringify(a)+'" on global object');
	return this.window[id](a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],a[16],a[17],a[18],a[19],a[20]);
  };
  
