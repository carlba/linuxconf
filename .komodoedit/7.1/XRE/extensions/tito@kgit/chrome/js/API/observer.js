const OS = CC['@mozilla.org/observer-service;1'].getService(CI.nsIObserverService);
		  
this.observedTopics = [];
this.observedSpecialTopics = [];

this.observersFunctions = [];
this.observersSpecialTopics = [];

this.addObservers = function(aTopic)
{
  this.observedTopics[aTopic] = true;
  this.removeObservers(aTopic);
  OS.addObserver(this, aTopic, false);
}
this.removeObservers = function(aTopic)
{
  try {
	OS.removeObserver(this, aTopic);
  } catch (e) {}
}
this.addObserver = function(aTopic, aFunction, aData)
{

  if(!this.observersFunctions[aTopic])
	this.observersFunctions[aTopic] = [];
  var id = this.observersFunctions[aTopic].length;
  this.observersFunctions[aTopic][id] = {};
  this.observersFunctions[aTopic][id].aFunction = aFunction;
  this.observersFunctions[aTopic][id].aData = aData;

  if(!(aTopic in this.observersSpecialTopics))
  {
	if(!(aTopic in this.observedTopics))
	  this.addObservers(aTopic); 
  }
  else
  {
	if(!(aTopic+''+aData.toSource() in this.observedSpecialTopics))
	  this.addObserverSpecialTopic(aTopic, aData);
  }
}
this.observe = function(aSubject, aTopic, aData) {
  
  switch (aTopic)
  {
	case 'quit-application-requested':
	{
	  aSubject.QueryInterface(Components.interfaces.nsISupportsPRBool);
	  break;
	}
  }
  if(typeof(skip) == 'undefined' || skip === false)
  {
	if(this.observersFunctions[aTopic])
	{
	  for(var id in this.observersFunctions[aTopic])
	  {
		this.observersFunctions[aTopic][id].aFunction(aSubject, aData);
	  }
	}
  }
}

this.addObserverSpecialTopic = function(aTopic, aData)
{
  this.observedSpecialTopics[aTopic+''+aData.toSource()] = true;
  /*
  switch (aTopic)
  {
	case 'xx-':
	{
	 
	}
  }*/
}