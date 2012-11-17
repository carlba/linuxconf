

  this.include('file');
  
  this.serializedSessionGet = function(aID, aDefault, aParser)
  {
	try
	{
	  var aFile = Components.classes["@mozilla.org/file/directory_service;1"]
					  .getService(Components.interfaces.nsIProperties)
					  .get("ProfD", Components.interfaces.nsIFile);
		  aFile.append(this.getExtensionChromeName());
		  aFile.append(aID+'.json');
	  
		if(this.fileExists(aFile.path))
		{
		  try
		  {
			if(!aParser)
			  return JSON.parse(this.fileRead(aFile.path));
			else
			  return aParser(JSON.parse(this.fileRead(aFile.path)));
		  }
		  catch(e)
		  {
			if(this.fileExists(aFile.path+'.bak'))
			{
			  try
			  {
				if(!aParser)
				  return JSON.parse(this.fileRead(aFile.path+'.bak'));
				else
				  return aParser(JSON.parse(this.fileRead(aFile.path+'.bak')));
			  }
			  catch(e)
			  {
				return aDefault;
			  }
			}
		  }
		}
		else
		  return aDefault;
		
	}catch(e){  }
	return aDefault;
  }
  this.serializedSessionExists = function(aID)
  {
	var aFile = Components.classes["@mozilla.org/file/directory_service;1"]
					.getService(Components.interfaces.nsIProperties)
					.get("ProfD", Components.interfaces.nsIFile);
		aFile.append(this.getExtensionChromeName());
		aFile.append(aID+'.json');
	  
	return this.fileExists(aFile.path);
  }
  this.serializedSessionSet = function(aID, aData)
  {
	this.runThreadAndWait(function(){
	  var aFile = Components.classes["@mozilla.org/file/directory_service;1"]
					  .getService(Components.interfaces.nsIProperties)
					  .get("ProfD", Components.interfaces.nsIFile);
		  aFile.append(s.getExtensionChromeName());
		  aFile.append(aID+'.json');
		var aString =  JSON.stringify(aData);
	  	s.fileWrite(aFile.path, aString);
	  	s.fileWrite(aFile.path+'.bak', aString);
	}, this._filesThread());
  }
  this.serializedSessionRemove = function(aID)
  {
	try{
	  
	  var aFile = Components.classes["@mozilla.org/file/directory_service;1"]
					  .getService(Components.interfaces.nsIProperties)
					  .get("ProfD", Components.interfaces.nsIFile);
		  aFile.append(this.getExtensionChromeName());
		  aFile.append(aID+'.json');
		  aFile.remove(true);

	  var aFile = Components.classes["@mozilla.org/file/directory_service;1"]
					  .getService(Components.interfaces.nsIProperties)
					  .get("ProfD", Components.interfaces.nsIFile);
		  aFile.append(this.getExtensionChromeName());
		  aFile.append(aID+'.json.bak');
		  aFile.remove(true);
		  
	}catch(e){ /*may no exists*/}
  }