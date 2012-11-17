
this.listeners = [];

//adding listeners
this.addListener = function(aWindowObject, aListener, aFunction)
{
  if(!this.listeners[aWindowObject.id])
	  this.listeners[aWindowObject.id] = {};
  if(!this.listeners[aWindowObject.id].window)
	  this.listeners[aWindowObject.id].window = aWindowObject.window;
  if(!this.listeners[aWindowObject.id].listeners)
	  this.listeners[aWindowObject.id].listeners = [];
  if(!this.listeners[aWindowObject.id].listeners[aListener])
  {
	this.listeners[aWindowObject.id].listeners[aListener] = {};
	this.listeners[aWindowObject.id].listeners[aListener].data = {};
	this.listeners[aWindowObject.id].listeners[aListener].aFunctions = [];
	this._addListener(aWindowObject, aListener);
  }
  this.listeners[aWindowObject.id].listeners[aListener]['aFunctions'][this.listeners[aWindowObject.id].listeners[aListener]['aFunctions'].length] = aFunction;
}
//real add listener
this._addListener = function(aWindowObject, aListener)
{
  switch(aListener)
  {
	case 'onLocationChange':
	  {
		if(this.isKomodo())
		{
		  this.listeners[aWindowObject.id].listeners[aListener].data.location = 'about:blank';
		  aWindowObject.window.document.addEventListener('current_view_changed', function(aEvent){s._dispatchListener(aWindowObject.id, aListener, aEvent);}, false);
		}
		else
		{
		  this.errorNoImplemented('_addlistener:aListener:'+aListener);
		}
		break;
	  }
  }
}
//dispatch the event to the extensions
this._dispatchListener = function(aWindowID, aListener, aEvent)
{
  switch(aListener)
  {
	case 'onLocationChange':
	  {
		var aLocation = s.documentGetLocation(s.documentGetFromTab(aEvent.originalTarget));
		if(this.listeners[aWindowID].listeners[aListener].data.location != aLocation)
		{
		  this.listeners[aWindowID].listeners[aListener].data.location = aLocation;
		  var aFunctions = this.listeners[aWindowID].listeners[aListener].aFunctions;
		  for(var id in aFunctions)
			aFunctions[id](aEvent.originalTarget);
		}
		break;
	  }
  }
}
//removes a listener from the array of listeners
this.removeListener = function(aListener, aFunction)
{
  for(var id in this.listeners[aListener])
  {
	if(this.listeners[aListener][id].toSource() == aFunction.toSource())
	{
	  this.listeners[aListener][id] = null;
	  break;
	}
  }
};
