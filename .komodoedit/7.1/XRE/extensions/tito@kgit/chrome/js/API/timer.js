this.timerAdd = function(aTime, aFunction)
{
  var timer = Components
				.classes["@mozilla.org/timer;1"]
				.createInstance(Components.interfaces.nsITimer);
	  timer.init({
		  observe: function(aSubject, aTopic, aData) {
			aFunction();
		  }
	  }, aTime, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
	return timer;
}

this.timerIntervalAdd = function(aTime, aFunction)
{
  var timer = Components
				.classes["@mozilla.org/timer;1"]
				.createInstance(Components.interfaces.nsITimer);
	  timer.init({
		  observe: function(aSubject, aTopic, aData) {
			aFunction();
		  }
	  }, aTime, Components.interfaces.nsITimer.TYPE_REPEATING_SLACK);
	return timer;
}

this.timerRemove = function(aTimer)
{
  aTimer.cancel();
}