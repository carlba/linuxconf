
  //move an extension from the profile folder to the application directory
  //in some applications such komodo, components are loaded only if the extension is into the application directory
  //this will only work if the extension is not jared

  this.extensionsMoveToApplicationDirectory = function()
  {
	var file = Components.classes["@mozilla.org/file/directory_service;1"]
				  .getService(Components.interfaces.nsIProperties)
				  .get("ProfD", Components.interfaces.nsIFile);
	file.append('extensions');
	file.append(this.getExtensionID());

	if(file.exists())
	{
	  //after reinstalling.. if the directory exists we need to remove it first.
	  var destinationExistsCheck = Components
						  .classes["@mozilla.org/file/directory_service;1"]
						  .getService(Components.interfaces.nsIProperties)
						  .get("resource:app", Components.interfaces.nsIFile);
		  destinationExistsCheck.append('extensions');
		  destinationExistsCheck.append(this.getExtensionID());
		  if(destinationExistsCheck.exists())
			destinationExistsCheck.remove(true);
			
	  //move the extension from the profile directory to the application directory
	  var destination = Components
						  .classes["@mozilla.org/file/directory_service;1"]
						  .getService(Components.interfaces.nsIProperties)
						  .get("resource:app", Components.interfaces.nsIFile);
		  destination.append('extensions');
		  file.moveTo(destination, this.getExtensionID());
		  
	  //restart the application
	  this.include('application');
	  this.restart();
	 }
  }