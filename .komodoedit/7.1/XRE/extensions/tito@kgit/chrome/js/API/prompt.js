
  this.include('string');
  
  const mPrompt = Components
					.classes["@mozilla.org/embedcomp/prompt-service;1"]
					.getService(Components.interfaces.nsIPromptService);
					
  const mWatcher = Components
					  .classes["@mozilla.org/embedcomp/window-watcher;1"]
					  .getService(Components.interfaces.nsIWindowWatcher);
					  
  //shows a custom confirm 
  this.confirm = function(aString)
  {
	return mPrompt.confirm(null, this.getExtensionName(), aString);
  }
  this.confirmWithCheckbox = function(aString, aCheckboxPrompt)
  {
	var check = {value: false};                      // default the checkbox to false
	
	var value = mPrompt.confirmCheck(null, this.getExtensionName(), aString, aCheckboxPrompt, check);
	
	return {'check':check.value,'value':value};
  }
  //shows a custom alert
  this.alert = function(aString)
  {
	mPrompt.alert(null, this.getExtensionName(), aString);
  }
 //shows a custom prompt
  this.prompt = function(aString, aDefault, multiline, aFunction, aParams, aCheckboxPrompt)
  {
	if(!aDefault)
	  aDefault = '';
	
	if(!multiline)
	{
	  var check = {value: false};                  // default the checkbox to false

	  var input = {value: aDefault};                  // default the edit field to Bob

	  var result = mPrompt.prompt(null, this.getExtensionName(), aString, input, aCheckboxPrompt, check);
	
	   if(result && !aCheckboxPrompt)
		 return this.string(input.value);
	   else if(result && aCheckboxPrompt)
		 return {'check':check.value, 'value':this.string(input.value)};
	   else if(!result && aCheckboxPrompt)
		 return {'check':check.value, 'value':''};
	   else
		 return '';
	}
	else
	{
	  var r = {};
		  r.title = this.getExtensionName();
		  r.label = aString;
		  r.aParams = aParams;
		  r.aFunction = aFunction;
		  
		 mWatcher.openWindow(null,
							 'chrome://'+this.getExtensionChromeName()+'/content/js/API/prompt/simpleMultiline.xul',
							   null,
							   'chrome,centerscreen,resizable=yes,dialog=no,alwaysRaised=yes',
							   {'wrappedJSObject': r});
		return null;
	}
  }