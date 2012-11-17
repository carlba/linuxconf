var EXPORTED_SYMBOLS = ['s'];

const CI = Components.interfaces;
const CC = Components.classes;
const CU = Components.utils;

const loader = CC['@mozilla.org/moz/jssubscript-loader;1']
				.getService(CI.mozIJSSubScriptLoader);
const consoleService = CC['@mozilla.org/consoleservice;1']
						.getService(CI.nsIConsoleService);
const versionChecker = CC["@mozilla.org/xpcom/version-comparator;1"]
						  .getService(CI.nsIVersionComparator);
const _included = {};
const _includedShared = {};

var s = {  /* this is our singleton! */
  init:function()
  {
	var os = String(CC['@mozilla.org/xre/app-info;1'].getService(CI.nsIXULRuntime).OS).toLowerCase();
	if(os.indexOf('darwin') != -1)
	{
	  this.__NL = '\r';
	  this.__DS = '/';
	}			
	else if(os.indexOf('win') != -1)
	{
	  this.__NL = '\r\n';
	  this.__DS = '\\';
	}
	else
	{
	  this.__NL = '\n';
	  this.__DS = '/';
	}
	var XULAppInfo = Components.classes['@mozilla.org/xre/app-info;1']
					  .getService(Components.interfaces.nsIXULAppInfo);	  
					  
	this.applicationID = XULAppInfo.ID;
	this.applicationVersion = XULAppInfo.version;
	this.applicationName = XULAppInfo.name;
	this.applicationVersionShort = parseInt(XULAppInfo.version);
	this.applicationGeckoVersion = XULAppInfo.platformVersion;
	
    os = null;
	XULAppInfo = null;
  },
  isMinGecko:function(aVersion)
  {
	return (versionChecker.compare(this.applicationGeckoVersion, aVersion) >= 0);
  },
  include : function(name)
  {
	if (arguments.length > 1)
	  for (var j = 0, len = arguments.length; j < len; j++)
		this.include(arguments[j]);
	else if (!(name in _included)) {
	  _included[name] = true;
	  try{
		loader.loadSubScript('chrome://'+this.getExtensionChromeName()+'/content/js/API/'+ name+'.js' , this);
	  }
	  catch (e)
	  {
		this.error('include "chrome://'+this.getExtensionChromeName()+'/content/js/API/'+ name+'.js" failed: the file may no exists or there is a sintax error into the included file, or any of the files that is including.\n' + e + '\n' + (e.stack || ''), e);
	  }
	}
  },
  includeShared : function(name)
  {
	if (arguments.length > 1)
	  for (var j = 0, len = arguments.length; j < len; j++)
		this.includeShared(arguments[j]);
	else if (!(name in _includedShared)) {
	  _includedShared[name] = true;
	  try{
		loader.loadSubScript('chrome://'+this.getExtensionChromeName()+'/content/js/shared/'+ name+'.js' , this);
	  }catch (e) {this.error('include "chrome://'+this.getExtensionChromeName()+'/content/js/shared/'+ name+'.js" failed:\n' + e + '\n' + (e.stack || ''));}
	}
  },
  
  getGlobalForObject : function()
  {
	return '__parent__' in this ? this.__parent__ : CU.getGlobalForObject(this);
  },
  getExtensionID : function()
  {
	if(!this.extensionID)
	  throw new Error('Fatal error extensionID is not set');
	return this.extensionID;	
  },
  getExtensionChromeName : function()
  {
	if(!this.extensionChromeName)
	  throw new Error('Fatal error extensionChromeName is not set');
	return this.extensionChromeName;	
  },
  getExtensionName : function()
  {
	if(!this.extensionName)
	  throw new Error('Fatal error extensionName is not set');
	return this.extensionName;	
  },
  
  errorNoImplemented:function(aFunction)
  {
	this.error('No implemented "'+aFunction+'" for '+this.applicationName);
  },
  error:function(error, e)
  {
	try{e = e.QueryInterface(Components.interfaces.nsIScriptError);}catch(eee){}
	throw new Error(this.getExtensionName()+':'+error, (e ? (e.fileName || null) : ''), ( e ? (e.lineNumber || null) : ''));
  },
  dump : function(aName, aData)
  {
	if(typeof(aData) == 'undefined' || aData === null)
	{
	  aData = aName;
	  aName = '';
	}
	else
	  aName = aName+':';
	switch (typeof(aData))
	{
	  case 'string':
	  case 'boolean':
	  case 'number':
		break;
	  case 'object':
	  case 'function':
		aData = (aData.toSource() || JSON.stringify(aData));
		break;
	  case 'undefined':
		aData = 'undefined';
		break;
	  default:
		this.error('Unsupported type ' + typeof(aData) + ' for dump');
    }
    consoleService.logStringMessage(this.getExtensionName()+':'+(new Date().toLocaleTimeString()+' '+(new Date().getMilliseconds()))+' - '+aName+''+aData);
  },

  QueryInterface: xpcom_generateQI(
								   [
									CI.nsIObserver,
									CI.nsISupportsWeakReference
								   ]
								  ),
  generateQI: xpcom_generateQI,
}
function xpcom_generateQI(iids) {
  iids.push(CI.nsISupports);
  return function QueryInterface(iid) {
	for (let i = 0, len = iids.length; i < len; i++)
	  if (iids[i].equals(iid)) return this;
	throw Components.results.NS_ERROR_NO_INTERFACE;
  }
}

s.init();