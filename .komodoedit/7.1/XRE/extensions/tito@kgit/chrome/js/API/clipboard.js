  
  const mClipboardHelper = Components.classes['@mozilla.org/widget/clipboardhelper;1']
						.getService(Components.interfaces.nsIClipboardHelper);
  const mClipboard = Components.classes['@mozilla.org/widget/clipboard;1']
						.getService(Components.interfaces.nsIClipboard);
  const mFileFlavours = [
					'text/x-moz-url',
					'text/unicode',
					'text/uri-list',
					'text/plain',
					'text/html',
					/*'application/x-moz-file-promise-filename',
					'application/x-moz-file-promise-dir',
					'application/x-moz-file-promise-url',
					'application/x-moz-file-promise',*/
					'application/x-moz-file'
				  ];
  
  //copy to the clipboard aString
  this.copyToClipboard = function(aString)
  {
	mClipboardHelper.copyString(aString);
  }
  
  //BUG:can only get one file from the clipboard of the operative system
  
  this.clipboardGetFilesPathsIsCuting = function()
  {
	var trans = Components
				  .classes['@mozilla.org/widget/transferable;1']
				  .createInstance(Components.interfaces.nsITransferable);

	trans.addDataFlavor('x-application/komodo-places');
	trans.addDataFlavor('x-application/tito-file-cuting');

	mClipboard.getData(trans, Components.interfaces.nsIClipboard.kGlobalClipboard);
	
	var data = {}, length = {};
	try
	{
	  try{
		trans.getTransferData('x-application/komodo-places', data, length);
		var str = data.value.QueryInterface(Components.interfaces.nsISupportsString);
		if(str == '0')
		{
		  this.clipboardEmpty();
		  return true;
		}
	  } catch(e){ /*this.dump('nsISupportsString', new Error(e));*/}
	  
	  try{
		trans.getTransferData('x-application/tito-file-cuting', data, length);
		var str = data.value.QueryInterface(Components.interfaces.nsISupportsString);
		if(str == '1')
		{
		  this.clipboardEmpty();
		  return true;
		}
	  } catch(e){ /*this.dump('nsISupportsString', new Error(e));*/}

	}
	catch(e){ /*this.dump('gettransferdata:'+mFileFlavours[id], new Error(e));*/ }
	
	return false;
  }
  this.clipboardGetFilesPaths = function()
  {
	
	var aPaths = []
	for(var id in mFileFlavours)
	{
	  var trans = Components
					.classes['@mozilla.org/widget/transferable;1']
					.createInstance(Components.interfaces.nsITransferable);


	  trans.addDataFlavor(mFileFlavours[id]);

	  mClipboard.getData(trans, Components.interfaces.nsIClipboard.kGlobalClipboard);
		
	  var flavor = {}, data = {}, length = {};
	  try
	  {
		trans.getTransferData(mFileFlavours[id], data, length);
  
		try{
		  var str = data.value.QueryInterface(Components.interfaces.nsISupportsString);
		  str = (str+'\n').split('\n');
		  for(var i in str)
		  {
			aPaths[aPaths.length] = this.trim(str[i]);
		  }
		} catch(e){ /*this.dump('nsISupportsString', new Error(e));*/}
		
		try{
		  var str = data.value.QueryInterface(Components.interfaces.nsIFile);
		  aPaths[aPaths.length] = str.path;
		} catch(e){ /*this.dump('nsIFile',new Error(e));*/}
  
		try{
		  var str = data.value.QueryInterface(Components.interfaces.nsISupportsArray);
		  for(var id in str)
		  {
			aPaths[aPaths.length] = str.path;
		  }
		} catch(e){ /*this.dump('nsISupportsArray', new Error(e));*/}
	  }
	  catch(e){ /*this.dump('gettransferdata:'+mFileFlavours[id], new Error(e));*/ }
	  
	 // alert(str.toSource());
	}
	  
	trans = null;
	str = null;
	
	aPaths = this.arrayUnique(aPaths);
	for(var i in aPaths)
	{
	  if(aPaths[i].indexOf('file:') === 0)
		aPaths[i] = this.filePathFromFileURI(aPaths[i]);
	  else if(
			  (
				aPaths[i].indexOf(':') != -1 ||
				aPaths[i].indexOf('/') != -1 ||
				aPaths[i].indexOf('\\') != -1
			  ) && this.fileExists(aPaths[i])
	  ){}
	  else
		aPaths[i] = '';
	}
	aPaths = this.arrayUnique(aPaths);
	var realPaths = []
	for(var i in aPaths)
	{
	  if(aPaths[i] != '')
		realPaths[realPaths.length] = aPaths[i];
	}
	
	//this.dump('clipboardGetFilesPaths:realPaths', realPaths);
	
	return realPaths;
  }

  //BUG:can only send one file to the clipboard of the operative system
  this.clipboardSetFilesPaths = function(aPaths, isCuting)
  {
	this.clipboardEmpty();
	//this.dump('clipboardSetFilesPaths:aPaths', aPaths);
	
	var trans = Components
				  .classes['@mozilla.org/widget/transferable;1']
				  .createInstance(Components.interfaces.nsITransferable);
				  
	//paths
	  var aStringPaths = this.stringSupports(aPaths.join('\n'));
		  
	//path
	  var aStringPath = this.stringSupports(aPaths[0]);
		  
	//uris
	  var aURIList = [];
	  for(var id in aPaths)
		aURIList[aURIList.length] = this.fileURIFromFilePath(aPaths[id]);
	  var aStringURIs = this.stringSupports(aURIList.join('\n'));
	  
	//uri
	  var aStringURI = this.stringSupports(aURIList[0]);
	  
	//file object
	  var aFile = this.file(aPaths[0]);
	
	//A Paths
	  trans.addDataFlavor('text/plain');
	  trans.setTransferData("text/plain", aStringPaths, aPaths.join('\n').length * 2);
		
	  trans.addDataFlavor('text/unicode');
	  trans.setTransferData("text/unicode", aStringPaths, aPaths.join('\n').length * 2);
		
	  trans.addDataFlavor('text/html');
	  trans.setTransferData("text/html", aStringPaths, aPaths.join('\n').length * 2);
	
	//A URIs
	  trans.addDataFlavor('text/x-moz-url');
	  trans.setTransferData("text/x-moz-url", aStringURI, aURIList[0].length * 2);
	  
	  trans.addDataFlavor('text/x-moz-uri');
	  trans.setTransferData("text/x-moz-uri", aStringURI, aURIList[0].length * 2);
	  
	  trans.addDataFlavor('text/uri-list');
	  trans.setTransferData("text/uri-list", aStringURIs, aURIList.join('\n').length * 2);
	  	
	//A file object
	  trans.addDataFlavor('application/x-moz-file');
	  trans.setTransferData("application/x-moz-file", aFile, aFile.fileSize);
	  
	//A URI
	  trans.addDataFlavor('application/x-moz-file-promise');
	  trans.setTransferData("application/x-moz-file-promise", aStringURI, aURIList[0].length * 2);
	  
	  trans.addDataFlavor('application/x-moz-file-promise-url');
	  trans.setTransferData("application/x-moz-file-promise-url", aStringURI, aURIList[0].length * 2);
	  
	  trans.addDataFlavor('application/x-moz-file-promise-dir');
	  trans.setTransferData("application/x-moz-file-promise-dir",
							this.stringSupports(this.fileURIFromFilePath(this.fileDirname(aFile.path))),
							(this.fileURIFromFilePath(this.fileDirname(aFile.path))).length * 2);
	  
	  trans.addDataFlavor('application/x-moz-file-promise-filename');
	  trans.setTransferData("application/x-moz-file-promise-filename",  this.stringSupports(aFile.leafName), aFile.leafName.length * 2);
	  
	//cuting or copying behaviour
 	  if(!isCuting){}
	  else
	  {
		//lets make this compatible with places.
		trans.addDataFlavor('x-application/komodo-places');
		trans.setTransferData("x-application/komodo-places",  this.stringSupports('0'), '0'.length * 2);
		
		trans.addDataFlavor('x-application/tito-file-cuting');
		trans.setTransferData("x-application/tito-file-cuting",  this.stringSupports('1'), '1'.length * 2);
	  }
	  
	mClipboard.setData(trans, null, Components.interfaces.nsIClipboard.kGlobalClipboard);
  }
  this.clipboardEmpty = function()
  {
	var trans = Components
				  .classes['@mozilla.org/widget/transferable;1']
				  .createInstance(Components.interfaces.nsITransferable);
	trans.addDataFlavor('x-nothing');
	trans.setTransferData("x-nothing",  this.stringSupports(''), ''.length * 2);
		
	mClipboard.setData(trans, null, Components.interfaces.nsIClipboard.kGlobalClipboard);

  }