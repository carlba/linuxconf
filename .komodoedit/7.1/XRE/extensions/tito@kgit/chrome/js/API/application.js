

  
  this.isSeaMonkey = function()
  {
	return this.applicationID == '{92650c4d-4b8e-4d2a-b7eb-24ecf4f6b63a}';
  }
  this.isKomodo = function()
  {
	return 	this.applicationID == '{b1042fb5-9e9c-11db-b107-000d935d3368}' ||
			this.applicationID == '{36E66FA0-F259-11D9-850E-000D935D3368}';
  }
  this.isThundebird = function()
  {
	return this.applicationID == '{3550f703-e582-4d05-9a08-453d09bdfdc6}';
  }
  this.isFirefox = function()
  {
	return this.applicationID == '{ec8030f7-c20a-464f-9b0e-13a3a9e97384}';
  }
  this.isWindows = function()
  {
	return this.__DS == '\\';
  }
  //restarts the application
  this.restart = function()
  {
	Components.classes["@mozilla.org/toolkit/app-startup;1"]
	  .getService(Components.interfaces.nsIAppStartup)
	  .quit(
		Components.interfaces.nsIAppStartup.eRestart |
		Components.interfaces.nsIAppStartup.eAttemptQuit
	  );
  }