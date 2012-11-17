	if(!this.sharedMemory)
	  this.sharedMemory = [];
	if(!this.sharedMemory[this.getExtensionChromeName()])
	  this.sharedMemory[this.getExtensionChromeName()] = [];
	//returns a shared object stored in a XPCOM (shared by all the windows of the same application (profile))
	this.sharedObjectGet = function(objectName, aDefault)
	{		
	  if(this.sharedObjectExists(objectName))
	  {
		//this.dump('sharedObjectGet:The shared var "'+objectName+'" is a property of the XPCOM');
	  }
	  else
	  {
		//this.dump('sharedObjectGet:The shared var "'+objectName+'" is NOT a property of the XPCOM');
		if(!aDefault && aDefault !== 0)
		{
		  //this.dump('sharedObjectGet:The shared var "'+objectName+'" doenst have a default value');
		  aDefault = {};
		}
		else
		{
		  //this.dump('sharedObjectGet:The shared var "'+objectName+'" has a default value');
		}
		
		//this.dump('sharedObjectGet:The shared var "'+objectName+'" was stored as a property of the XPCOM');
		this.sharedMemory[this.getExtensionChromeName()][objectName] = aDefault;
	  }
	  //this.dump('sharedObjectGet:The property "'+objectName+'" was retrieved from the XPCOM');
	  return this.sharedMemory[this.getExtensionChromeName()][objectName];
	}
	//returns true if a shared object created by a XPCOM exists (shared by all the windows of the same browser instance (profile))
	this.sharedObjectExists = function(objectName)
	{
	  return !(typeof(this.sharedMemory[this.getExtensionChromeName()][objectName]) == 'undefined');
	}
	
	//sets to null a shared object stored in a XPCOM (shared by all the windows of the same browser instance (profile))
	/* 
		THIS WILL DESTROY THE OBJECT INSIDE THE XPCOM COMPONENT 
		BUT THE REFERENCE (if any) TO THAT OBJECT ON YOUR EXTENSION WILL REMAIN INTACT
	*/
	this.sharedObjectDestroy = function(objectName)
	{
	  var extensionName = this.getExtensionChromeName();
	  this.sharedMemory[extensionName][objectName] = null;
	}
	this.sharedObjectDestroyWithPrefix = function(objectPrefix)
	{
	  var extensionName = this.getExtensionChromeName();
	  for(var id in this.sharedMemory[extensionName])
	  {
		if(id.indexOf(objectPrefix) === 0)
		{
		  this.sharedMemory[extensionName][objectName] = null;
		}
	  }
	}
	this.sharedObjectSet = function(objectName, aValue)
	{
	  this.sharedMemory[this.getExtensionChromeName()][objectName] = aValue;
	}