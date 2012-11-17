
this.include('string');

const IPC = CI.nsIPrefBranch;
const prefs = CC['@mozilla.org/preferences-service;1']
					  .getService(CI.nsIPrefService)
					  .getBranch('extensions.'+this.getExtensionChromeName()+'.')
					  .QueryInterface(CI.nsIPrefBranch2);
					  
  this.pref = function(name, value)
  {
	if(typeof(value) == 'undefined')
	{
	  switch (prefs.getPrefType(name)) {
		case IPC.PREF_STRING:
		  return this.decodeUTF8(prefs.getCharPref(name));
		case IPC.PREF_INT:
		  return prefs.getIntPref(name);
		case IPC.PREF_BOOL:
		  return prefs.getBoolPref(name);
	  }
	}
	else
	{
	  try {
		switch (typeof(value)) {
		  case 'string':
			  prefs.setCharPref(name, this.encodeUTF8(value));
			  return true;
		  case 'boolean':
			prefs.setBoolPref(name,value);
			return true;
		  case 'number':
			prefs.setIntPref(name,value);
			return true;
		  default:
			this.error('Unsupported type ' + typeof(value) + ' for set preference ' + name);
		}
	  } catch(e) {
		switch (prefs.getPrefType(name)) {
		  case IPC.PREF_STRING:
			prefs.setCharPref(name, this.encodeUTF8(value));
			return true;
		  case IPC.PREF_INT:
			prefs.setIntPref(name, parseInt(value));
			return true;
		  case IPC.PREF_BOOL:
			prefs.setBoolPref(name, !!value && value != 'false');
			return true;
		  default:
			this.error('Unsupported type ' + typeof(value) + ' for preference ' + name);
		}
	  }
	}
	return null;
  }
  