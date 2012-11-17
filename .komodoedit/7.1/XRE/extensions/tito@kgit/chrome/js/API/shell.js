	//executes a shell script in a window ( allows user iteration )
	this.execute = function(aBashPath, aScriptPath, aOutputPath, aFunction)
	{
	  var file = Components.classes["@mozilla.org/file/local;1"]
				  .createInstance(Components.interfaces.nsILocalFile);
	  
	  if( !this.isWindows())
	  {
		file.initWithPath("/");
		file.append("bin");
		file.append("sh");
		
		var argv = [aScriptPath];
	  }
	  else
	  {
		//if windows
		file.initWithPath(aBashPath);
		file.append("bin");
		file.append("bash.exe");
		
		var argv = ['--login', aScriptPath];
	  }

	  var process = Components.classes["@mozilla.org/process/util;1"]
				   .createInstance(Components.interfaces.nsIProcess2);
		  process.init(file);
		   
		  process.runAsync(argv, argv.length,
						  {
							observe: function(aSubject, aTopic, aData)
							{
							 aFunction(aScriptPath, aOutputPath);
							}
						  }, false);
		
		file = null;
		aScriptPath = null;
	}
