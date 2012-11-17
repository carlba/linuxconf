
  const mIos = Components.classes["@mozilla.org/network/io-service;1"].  
					  getService(Components.interfaces.nsIIOService);

  const mKoSysUtils = Components.classes["@activestate.com/koSysUtils;1"].
                        getService(Components.interfaces.koISysUtils)
  
  //returns true if a file exists
  this.fileExists = function(aFilePath)
  {
	try
	{
	  var aFile = Components.classes["@mozilla.org/file/local;1"]
					  .createInstance(Components.interfaces.nsILocalFile);
		  aFile.initWithPath(aFilePath);

	  if(aFile.exists())
	  {
		aFile = null;
		return true;
	  }
	  else
	  {
		aFile = null;
		return false;
	  }
	}
	catch(e)
	{
	  aFile = null;
	  return false;
	}
  }
  
 //returns a file path from a file URI
  this.filePathFromFileURI = function(aURI)
  {
	if(aURI.indexOf('file:') !== 0)
	  return aURI;
	return String(this.uri(aURI).QueryInterface(Components.interfaces.nsIFileURL).file.path);
  }
  this.fileURIFromFilePath = function(aURI)
  {
	if(aURI.indexOf('file:') === 0)
	  return aURI;
	else
	  return this.uriFile(this.file(aURI)).asciiSpec;
  }
  
  //returns the content of a file
  this.fileRead = function(aFilePath)
  {
	var aFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);	
		aFile.initWithPath(aFilePath);

	var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
		converter.charset = "UTF-8"; /* The character encoding you want, using UTF-8 here */

	var is = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance( Components.interfaces.nsIFileInputStream );
		is.init(aFile, 0x01, parseInt("0444", 8), 0); 
	
	var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);
		sis.init(is);
		
	var aData = converter.ConvertToUnicode(sis.read(sis.available()));
	
	is.close();
	sis.close();
	
	aFile  = null;
	converter = null;
	is = null;
	sis = null;
	
	return aData;
  }
  //creates a temporal file and returns the url of that file-REVIEW
  this.fileCreateTemporal = function(aName, aData)
  {
	if(!aData)
		aData = '';
	//WTF!!!!!!!!!!!!!!!!!!!!?
	var file = Components.classes["@mozilla.org/file/directory_service;1"]
					 .getService(Components.interfaces.nsIProperties)
					 .get("TmpD", Components.interfaces.nsIFile);
	//security - works always in a folder with with the name of this extension
	file.append(this.getExtensionID()+'-'+this.applicationVersion);
	if( !file.exists() || !file.isDirectory() )   // if it doesn't exist, create
	{
		file.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, parseInt("0775", 8));
	}
	file.append(aName);
	file.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, parseInt("0775", 8));
	
	var WriteStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
						.createInstance(Components.interfaces.nsIFileOutputStream);
	// use 0x02 | 0x10 to open file for appending.
	WriteStream.init(file, 0x02 | 0x08 | 0x20, parseInt("0644", 8), 0); // write, create, truncate
		
	var why_not_a_simple_fopen_fwrite = Components.classes["@mozilla.org/intl/converter-output-stream;1"]
											.createInstance(Components.interfaces.nsIConverterOutputStream);
	
	why_not_a_simple_fopen_fwrite.init(WriteStream, "utf-8", 0, 0xFFFD); // U+FFFD = replacement character
	why_not_a_simple_fopen_fwrite.writeString(aData);
	why_not_a_simple_fopen_fwrite.close();
	WriteStream.close();
	
	var path =  file.path;
	
	file = null;
	WriteStream = null;
	why_not_a_simple_fopen_fwrite = null;
	
	return path;
  }
  //creates a temporal file and returns the url of that file-REVIEW
  this.folderCreateTemporal = function(aName)
  {
	var file = Components.classes["@mozilla.org/file/directory_service;1"]
					 .getService(Components.interfaces.nsIProperties)
					 .get("TmpD", Components.interfaces.nsIFile);
	//security - works always in a folder with with the name of this extension
	file.append(this.getExtensionID()+'-'+this.applicationVersion);
	if( !file.exists() || !file.isDirectory() )   // if it doesn't exist, create
	{
		file.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, parseInt("0775", 8));
	}
	file.append(aName);
	file.createUnique(Components.interfaces.nsIFile.DIRECTORY_TYPE, parseInt("0775", 8));

	var path =  file.path;
	
	file = null;
	
	return path;
  }
  //empty our temp folder when the application is closed.
  this.folderDeleteTemporal = function()
  {
	  var file = Components.classes["@mozilla.org/file/directory_service;1"]
					   .getService(Components.interfaces.nsIProperties)
					   .get("TmpD", Components.interfaces.nsIFile);
	  //security - works always in a folder with with the name of this extension
	  file.append(this.getExtensionID()+'-'+this.applicationVersion);
	  
	  if( !file.exists() || !file.isDirectory() ) // if it doesn't exist.
	  {
		
	  }
	  else
	  {
		file.remove(true);
		this.fileCreateTemporal('empty.txt', 'true');
	  }
	  file = null;
  }
  //writes content to a file
  this.fileWrite = function(aFilePath, aData)
  {
	  try
	  {
		aData = String(aData);
	  //write the content to the file
		  var aFile = Components.classes["@mozilla.org/file/local;1"]
						  .createInstance(Components.interfaces.nsILocalFile);
			  aFile.initWithPath(aFilePath);
			  if( !aFile.exists() )   // if it doesn't exist, create
			  {
				  aFile.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, parseInt("0775", 8));
			  }
		  var WriteStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
		  // use 0x02 | 0x10 to open file for appending.
		  //WriteStream.init(aFile, 0x02 | 0x08 | 0x20, 0644, 0); // write, create, truncatefile,  
		  WriteStream.init(aFile, 0x02 | 0x08 | 0x20, parseInt("0666", 8), 0); // write, create, truncatefile,  
							  
		  var why_not_a_simple_fopen_fwrite = Components.classes["@mozilla.org/intl/converter-output-stream;1"].createInstance(Components.interfaces.nsIConverterOutputStream);
		  
		  why_not_a_simple_fopen_fwrite.init(WriteStream, "utf-8", 0, 0xFFFD); // U+FFFD = replacement character
		  why_not_a_simple_fopen_fwrite.writeString(aData);
		  
		  why_not_a_simple_fopen_fwrite.close();
		  WriteStream.close();
		  var path = aFile.path;
		  
		  aFile = null;
		  WriteStream = null;
		  why_not_a_simple_fopen_fwrite = null;
		  
		  return path;
	  }
	  catch(e)
	  {
		aFile = null;
		WriteStream = null;
		why_not_a_simple_fopen_fwrite = null;
		
		this.dump('Can\'t write to the file "'+aFilePath+'"\nApplication says: '+e);
		return null;
	  }
  }
  
  //writes a binary file
  this.fileWriteBinaryContentIsByteArray = function(aFilePath, aContent)
  {
	var aFile = Components.classes["@mozilla.org/file/local;1"].
				createInstance(Components.interfaces.nsILocalFile);
	
	aFile.initWithPath(aFilePath);
	if(!aFile.exists())   // if it doesn't exist, create
	  aFile.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, parseInt("0755", 8));
				
	var fileStream = Components.classes['@mozilla.org/network/file-output-stream;1']
						 .createInstance(Components.interfaces.nsIFileOutputStream);
	fileStream.init(aFile, 2, 0x200, false);
	var binaryStream = Components.classes['@mozilla.org/binaryoutputstream;1']
					   .createInstance(Components.interfaces.nsIBinaryOutputStream);
	binaryStream.setOutputStream(fileStream);
	binaryStream.writeByteArray(aContent , aContent.length);
	binaryStream.close();
	fileStream.close();
  }
  //reads a binary file and returns a byte array
  this.fileReadBinaryReturnByteArray = function(aFilePath)
  {
	var aFile = Components.classes["@mozilla.org/file/local;1"].
				createInstance(Components.interfaces.nsILocalFile);
	
	aFile.initWithPath(aFilePath);			

	var istream = Components.classes["@mozilla.org/network/file-input-stream;1"].
				  createInstance(Components.interfaces.nsIFileInputStream);
	istream.init(aFile, -1, -1, false);
	
	var bstream = Components.classes["@mozilla.org/binaryinputstream;1"].
				  createInstance(Components.interfaces.nsIBinaryInputStream);
	bstream.setInputStream(istream);
	
	var result = {};
	var bytes = bstream.readByteArray(bstream.available(), result);
	
	return bytes;
  }
  
  //creates an empty file
  this.fileCreate = function(aFilePath)
  {
	var aFile = Components.classes["@mozilla.org/file/local;1"].
				createInstance(Components.interfaces.nsILocalFile);
	
	aFile.initWithPath(aFilePath);
	if(!aFile.exists())   // if it doesn't exist, create
	  aFile.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, parseInt("0755", 8));
  }
  
  //creates a folder
  this.folderCreate = function(aFilePath, aPermissions)
  {
	var aFile = Components.classes["@mozilla.org/file/local;1"].
				createInstance(Components.interfaces.nsILocalFile);
	
	if(!aPermissions)
	  aPermissions = parseInt("0755", 8);
	aFile.initWithPath(aFilePath);
	if(!aFile.exists() || !aFile.isDirectory())   // if it doesn't exist, create
	  aFile.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, aPermissions);
  }
  
  //read remote binary
  this.koFileRemoteRead = function(aURI)
  {
	var reader = Components
				  .classes["@activestate.com/koFileEx;1"]
				  .createInstance(Components.interfaces.koIFileEx);
	reader.URI = aURI;
	reader.open("rb");
	var aContent = reader.readfile();
	reader.close();
	return aContent;
  }
  //write remote binary
  this.koFileRemoteWrite = function(aURI, aContent)
  {
	var writer = Components
				  .classes["@activestate.com/koFileEx;1"]
				  .createInstance(Components.interfaces.koIFileEx);
	writer.URI = aURI;
	writer.open("wb+");
	writer.puts(aContent);
	writer.close();
  }
  //read local binary
  this.koFileLocalRead = function(aPath)
  {
	var reader = Components
				  .classes["@activestate.com/koFileEx;1"]
				  .createInstance(Components.interfaces.koIFileEx);
	reader.path = aPath;
	reader.open("rb");
	var aContent = reader.readfile();
	reader.close();
	return aContent;
  }
  //write local binary
  this.koFileLocalWrite = function(aPath, aContent)
  {
	var writer = Components
				  .classes["@activestate.com/koFileEx;1"]
				  .createInstance(Components.interfaces.koIFileEx);
	writer.path = aPath;
	writer.open("wb+");
	writer.puts(aContent);
	writer.close();
  }
  
  //open an path with an external handler
  this.launch = function(aFilePath)
  {
	if(this.pathIsFolder(aFilePath))
	{
	  this.reveal(aFilePath);
	}
	else
	{
	  var aFile = Components.classes["@mozilla.org/file/local;1"].  
					  createInstance(Components.interfaces.nsILocalFile); 
	  aFile.initWithPath(aFilePath);
	  try{
		aFile.launch();
	  }catch(e) {
		this.openURI(aFilePath);
	  }
	}
  }
  //reveals a file/folder
  this.reveal = function(aFilePath)
  {
	var aFile = Components.classes["@mozilla.org/file/local;1"]
				  .createInstance(Components.interfaces.nsILocalFile);	
		aFile.initWithPath(aFilePath);
	try {
	  aFile.reveal();
	}catch(e) {
	  this.openURI(aFilePath);
	}
  }
  //returns true if a path is a folder
  this.pathIsFolder = function(aFilePath)
  {
	try
	{
	  var aFile = Components.classes["@mozilla.org/file/local;1"]
					  .createInstance(Components.interfaces.nsILocalFile);
		  aFile.initWithPath(aFilePath);

		  if(aFile.exists() && aFile.isDirectory())
		  {
			aFile = null;
			return true;
		  }
		  else
		  {
			aFile = null;
			return false;
		  }
	}
	catch(e)
	{
	 aFile = null;
	  return false;
	}
  }
  this.pathToNixRX = /\\/g;
  this.pathToNix = function(aPath)
  {
	return aPath.replace(this.pathToNixRX, '/');
  }
  //return nsilocalfile object
  this.file = function(aFilePath)
  {
	var aFile = Components.classes["@mozilla.org/file/local;1"]
					.createInstance(Components.interfaces.nsILocalFile);
	aFile.initWithPath(aFilePath);
	return aFile;
  }
  this.fileRename = function(from, to)
  {
	var aFrom = this.file(from);
	to = this.file(to);
	try{ to.normalize();}catch(e){}//I already know that the file no exists yet.
	var toDirectory = this.file(this.fileDirname(to.path));
	var withName = to.leafName;
	aFrom.moveTo(toDirectory, withName);
  }
  this.fileCopy = function(from, to)
  {
	var aFrom = this.file(from);
	to = this.file(to);
	try{ to.normalize();}catch(e){}//I already know that the file no exists yet.
	var toDirectory = this.file(this.fileDirname(to.path));
	var withName = to.leafName;
	aFrom.copyTo(toDirectory, withName);
  }
  this.uri = function(aURL)
  {
	return mIos.newURI(aURL, null, null);
  }
  this.uriFile = function(aURL)
  {
	return mIos.newFileURI(aURL);
  }

  //open an external URI
  this.openURI = function(aURI)
  {
	var protocolSvc = Components.classes["@mozilla.org/uriloader/external-protocol-service;1"]
								.getService(Components.interfaces.nsIExternalProtocolService);

	protocolSvc.loadUrl(this.uri(aURI));
  }
  //asks for a location of a folder
  this.folderAskUser = function(aMsg)
  {
	this.include('window');
	var fp = Components.classes["@mozilla.org/filepicker;1"]
			  .createInstance(Components.interfaces.nsIFilePicker);
	if(!aMsg)
		fp.init(window, this.getExtensionName(), fp.modeGetFolder);
	else
		fp.init(window, this.getExtensionName()+" : "+aMsg, fp.modeGetFolder);
	
	if(fp.show() != fp.returnCancel)
	{
	  return fp.file.path;
	}
	else
	{
	  return false;
	}
  }
  //returns the dirname of a file
  this.fileDirname = function(aFilePath)
  {
	try
	{
	  var aDestination = Components.classes["@mozilla.org/file/local;1"]
					  .createInstance(Components.interfaces.nsILocalFile);
		  aDestination.initWithPath(aFilePath);

	  var dirname =  aDestination.parent.path;
	  
	  aDestination = null;
	  
	  return dirname;
	}
	catch(e)
	{
	  aDestination = null;
	  
	  if(this.pathIsFolder(aFilePath))
		return aFilePath;
	  else if(/\:$/.test(aFilePath))
		return aFilePath;
	  else
	  {
		this.error('fileDirname:'+aFilePath+' has no parent folder and "'+aFilePath+'" is not a folder');
		return null;
	  }
	}
  }
  //returns an array with the of all the files in a folder
  this.folderListContent = function(aFolderPath)
  {
	var aDirectory = Components.classes["@mozilla.org/file/local;1"].  
						createInstance(Components.interfaces.nsILocalFile); 
	
		aDirectory.initWithPath(aFolderPath);

	var folderContent = [], folderContentSort = [], folderContentSorted = [], nameSort = '', entry, dirList = [], aName, entries = aDirectory.directoryEntries;
	var a = 0;
	while(entries.hasMoreElements())
	{
		entry = entries.getNext();
				entry.QueryInterface(Components.interfaces.nsIFile);
		nameSort = entry.path.toLowerCase()+ ' '+a;
		folderContentSort[folderContentSort.length] = nameSort ;
		folderContent[nameSort] = entry.path;
		a++;
	}
	folderContentSort.sort(this.sortLocale);
	for(var id in folderContentSort)
	  folderContentSorted[folderContentSorted.length] = folderContent[folderContentSort[id]]
	  
	return folderContentSorted;
  }
  //returns an array of nsIFiles from the folder content
  this.folderListContentData = function(aFolderPath)
  {
	var aDirectory = Components.classes["@mozilla.org/file/local;1"].  
						createInstance(Components.interfaces.nsILocalFile); 
	
		aDirectory.initWithPath(aFolderPath);

	var folderContent = [], entry, entries = aDirectory.directoryEntries;
	
	while(entries.hasMoreElements())
	{
	  entry = entries.getNext();
	  entry.QueryInterface(Components.interfaces.nsIFile);
	  folderContent[folderContent.length] = entry;
	}
	return folderContent;
  }
  //removes a file from the file system
  this.fileRemove = function(aFileOrDirectory)
  {
	var aFile = Components.classes["@mozilla.org/file/local;1"]
					.createInstance(Components.interfaces.nsILocalFile);
			aFile.initWithPath(aFileOrDirectory);
		
	if(aFile.exists())
	{
	  try
	  {
		aFile.remove(true);
	  }
	  catch(e)
	  {
		if(this.isKomodo())
		  this.fileTrash(aFileOrDirectory);
		else
		  throw new Error(e);
	  }
	}
  }
  //removes a file from the file system
  this.fileTrash = function(aFileOrDirectory)
  {
	if(this.isKomodo())
	{
	  try{ mKoSysUtils.MoveToTrash(aFileOrDirectory);}catch(e){/*shh*/}
	}
	else
	{
	  this.errorNoApplication('fileTrash');
	}
  }
  //give option to set some options
  this.findFiles = function(aPath, aRegExpSearch, aList)
  {
	if(!aList.maxFolders)
	  aList.maxFolders = 1000000;
	if(!aList.folderCount)
	  aList.folderCount = 0;
	if(aList.folderCount > aList.maxFolders)
	  return;
	aList.folderCount++;
	var aDirectory = Components.classes["@mozilla.org/file/local;1"].  
						createInstance(Components.interfaces.nsILocalFile); 
		aDirectory.initWithPath(aPath);

	var entry, entries = aDirectory.directoryEntries;
	while(entries.hasMoreElements())
	{
	  entry = entries.getNext();
	  entry.QueryInterface(Components.interfaces.nsIFile);
	  if(
		 !entry.isSymlink() &&
		 !entry.isSpecial() &&
		 entry.isReadable()
	  )
	  {
		if(aRegExpSearch.test(entry.path))
		  aList.entries[aList.entries.length] = entry.path;
		if(entry.isDirectory())
		  this.findFiles(entry.path, aRegExpSearch, aList);
	  }
	}
  }
  this.filePathEscapeRX1 = /\\/g;
  this.filePathEscapeRX2 = /"/g;
  this.filePathEscape = function(aString)
  {
	return aString.replace(this.filePathEscapeRX1, '\\\\').replace(this.filePathEscapeRX2, '\\"');
  }
  
  /*
	watch folders and files for changes
  */
  
  this._watchedFolders = [];
  this._watchedFoldersPaths = [];
  this._watchFoldersRunning = false;
  this.__watchFolderThread = false;
  this.watchFolder = function(aPath, aFunction, aRecursive, notifyOnce)
  {
	this._watchedFoldersRunning = true;
	try{
	  var aFile = this.file(aPath);
	  var isDirectory = false;
	  if(aFile.isDirectory())
	  {
		isDirectory = true;
		aPath = aFile.path+this.__DS;
		//only scan the folder if no parent folder is already watched
		var shouldScan = true;
		var shouldBreak = false;
		for(var id in this._watchedFolders)
		{
		  if(aPath.indexOf(id) === 0)
		  {
			//look if they are looking the folder in the same way as us
			for(var i in this._watchedFolders[id])
			{
			  if(!this._watchedFolders[id][i])
				continue;
			  if(this._watchedFolders[id][i].aRecursive == aRecursive)
			  {
				shouldScan = false;
				shouldBreak = true;
				break;
			  }
			}
			if(shouldBreak)
			  break;
		  }
		}
	  }
	}catch(e){
	  this._watchedFoldersRunning = false;
	  this.dump('watchFolder:invalid path:'+aPath);
	  this.dump('e', e);
	  return;//invalid path
	}

	if(!this._watchedFolders[aPath])
	  this._watchedFolders[aPath] = [];
	var id = this._watchedFolders[aPath].length;
	this._watchedFolders[aPath][id] = {};
	this._watchedFolders[aPath][id].aFunction = aFunction;
	this._watchedFolders[aPath][id].aThread = this.currentThread();
	this._watchedFolders[aPath][id].notifyOnce = (typeof(notifyOnce) == 'undefined' ? true : notifyOnce);
	this._watchedFolders[aPath][id].aRecursive = aRecursive;
	this._watchedFolders[aPath][id].notified = false;
	this._watchedFolders[aPath][id].isDirectory = isDirectory;
	this._watchedFolders[aPath][id].toNotify = [];//hold the temporal paths to notify
	try{
	  this._watchedFoldersPaths[aPath] = aFile.lastModifiedTime;
	}catch(e) { //the file to watch currenlty no exists
	  this._watchedFoldersPaths[aPath] = 'deleted';
	}
	aFile = null;

	if(shouldScan)
	  this._watchFolderThreadRun(aPath, aRecursive);
  
	this._watchFoldersTimerStartThreadRun();
	//this.dump('watching folder '+aPath);
	
	this._watchFoldersRunning = false;
  }
  this._watchFolderThreadRun  = function(aPath, aRecursive)
  {
	try{
	  this.runThread(function(){s._watchFolder(aPath, aRecursive);}, this._watchFolderThread());
	}catch(e){
	  //this.error('_watchFolderThread:aPath:'+aPath+':aRecursive:'+aRecursive+':error', e);
	}
  }
  this._watchFolder = function(aPath, aRecursive, onlyNewFolders)
  {
	this._watchFoldersRunning = true;

	var aDirectory = Components.classes["@mozilla.org/file/local;1"].  
						createInstance(Components.interfaces.nsILocalFile); 
		aDirectory.initWithPath(aPath);
	var entry, entries = aDirectory.directoryEntries;
	
	while(entries.hasMoreElements())
	{
	  entry = entries.getNext();
	  entry.QueryInterface(Components.interfaces.nsIFile);
	  
	  if(!entry.isHidden() && !entry.isSpecial() && entry.isReadable() && entry.leafName.indexOf('.') !== 0)
	  {
		if(entry.isDirectory() && !entry.isSymlink())
		{
		  if(onlyNewFolders && this._watchedFoldersPaths[entry.path+this.__DS])
			continue;
		  try{
			this._watchedFoldersPaths[entry.path+this.__DS] = entry.lastModifiedTime;
		  } catch(e){
			this._watchedFoldersPaths[entry.path+this.__DS] = 'deleted';
		  }
		  if(aRecursive)
		  {
			try{
			  //this.dump('_watchFolder:recursive:', entry.path);
			  this._watchFolder(entry.path, aRecursive);
			}catch(e){
			  //this.error('_watchFolder:aPath:'+aPath+':error', e);
			}
		  }
		}
		else
		{
		  try{
			this._watchedFoldersPaths[entry.path] = entry.lastModifiedTime;
		  } catch(e){
			this._watchedFoldersPaths[entry.path] = 'deleted';
		  }
		}
	  }
	}
	this._watchFoldersRunning = false;
  }
  this.unwatchFolder = function(aPath, aFunction, aRecursive, notifyOnce)
  {
	this._watchedFoldersRunning = true;
	try{
	  aPath = this.file(aPath).path+this.__DS;
	}catch(e){
	  this._watchedFoldersRunning = false;
	  this.dump('unwatchFolder:invalid path:'+aPath);
	  this.dump('e', e);
	  return;//invalid path
	} 
	
	if(this._watchedFolders[aPath])
	{
	  //delete the function
	  var currentThread = this.currentThread();
	  for(var id in this._watchedFolders[aPath])
	  {
		if(!this._watchedFolders[aPath][id])
		  continue;
		if(
		   this._watchedFolders[aPath][id].aRecursive == aRecursive && 
		   this._watchedFolders[aPath][id].notifyOnce == notifyOnce && 
		   this._watchedFolders[aPath][id].aThread == currentThread && 
		   this._watchedFolders[aPath][id].aFunction.toSource() == aFunction.toSource()
		)
		{
		  this._watchedFolders[aPath][id] = null;
		  var empty = true;
		  for(var id in this._watchedFolders[aPath])
		  {
			empty = false;
			break;
		  }
		  if(empty)
			this._watchedFolders[aPath] = null;
		  break;
		}
	  }
	  //delete the paths
	  this.runThread(function(){ s._unwatchFolder(aPath); }, this._watchFolderThread());
	}
	this._watchedFoldersRunning = false;
  }
  this._unwatchFolder = function(aPath)
  {
	this._watchedFoldersRunning = true;
	//remove the paths if noone is watching
	var someoneElseWatching = false;
	var someoneElseWatchingSame = false;
	var someoneElseWatchingParent = false;
	var someoneElseWatchingDeeper = false;
	//if someone watching same directory
	if(this._watchedFolders[aPath])
	{
	  //this.dump('someone else watching same directory');
	  someoneElseWatchingSame = true;
	  someoneElseWatching = true;
	}
	if(!someoneElseWatching)
	{
	  //if someone watching parent directory
	  for(var id in this._watchedFolders)
	  {
		if(aPath.indexOf(id) === 0)
		{
		  //this.dump('someone else watching parent directory '+ id+' of '+aPath);
		  someoneElseWatchingParent = true;
		  someoneElseWatching = true;
		  break;
		}
	  }		
	}
	if(!someoneElseWatching)
	{
	  //if someone watching a Deeper directory
	  var deepLooking = [];
	  for(var id in this._watchedFolders)
	  {
		if(id.indexOf(aPath) === 0)
		{
		  //this.dump('someone else watching the deeper directory '+id+ ' of '+aPath);
		  someoneElseWatchingDeeper = true;
		  someoneElseWatching = true;
		  deepLooking[id] = true;
		}
	  }
	}
	//delete the paths from the folders array if appropiated
	if(someoneElseWatchingSame)
	{
	  //this.dump('skiping deleting '+aPath+' because someone else is watching same');		
	}
	else if(someoneElseWatchingParent)
	{
	  //this.dump('skiping deleting '+aPath+' because someone else is watching parent');		
	  //ok someone watching, no delete
	}
	else if(someoneElseWatchingDeeper)
	{
	  //this.dump('deleting all childs and skip these deep already watched');
	  var toDelete = [], found = false;
	  for(var id in this._watchedFoldersPaths)
	  {
		if(id.indexOf(aPath) === 0)
		{
		  found = false;
		  for(var i in deepLooking)
		  {
			if(id.indexOf(i) === 0)
			{
			  found = true;
			  break;
			}
		  }
		  if(!found)
		  {
			//this.dump('deleted a child non watched '+id);
			toDelete[id] = true;
		  }
		}
	  }
	  for(var id in toDelete)
		this._watchedFoldersPaths[id] = null;
	  toDelete = null;
	}
	else
	{
	  //this.dump('deleting all that match');
	  var toDelete = [];
	  for(var id in this._watchedFoldersPaths)
	  {
		if(!this._watchedFoldersPaths[id])
		  continue;
		if(id.indexOf(aPath) === 0)
		{
		  toDelete[id] = true;
		}
	  }
	  for(var id in toDelete)
		this._watchedFoldersPaths[id] = null;
	  toDelete = null;
	}
	//remove the timer if no more queue
	var empty = true;
	for(var id in this._watchedFoldersPaths)
	{
	  empty = false;
	  break;
	}
	if(empty)
	{
	  this._watchFoldersTimerStop();
	  this._watchFoldersTimerTimer = null;
	}
	
	//this.dump('unwatch  folder '+aPath);
	
	this._watchedFoldersRunning = false;
  }
  this.watchFolderCompare = function()
  {
	if(this._watchFoldersRunning){}
	else
	{
	  this._watchedFoldersRunning = true;
	  //this.dump('watchFolderCompare');
	  var changed = [];
	  var deleted = [];
	  var somethingChanged = false;
	  //check for changes and list these into two vars
	  var aFile;
	  for(var id in this._watchedFoldersPaths)
	  {
		if(!this._watchedFoldersPaths[id])
		  continue;
		try{
		  var aFile = this.file(id);
		  if(aFile.lastModifiedTime != this._watchedFoldersPaths[id])
		  {
			this._watchedFoldersPaths[id] = aFile.lastModifiedTime;
			//this.dump('file changed  '+ id);
			changed[id] = aFile.isDirectory();
			somethingChanged = true;
		  }
		} catch(e) {
		  //this.dump('file deleted '+ id);
		  if(this._watchedFoldersPaths[id] != 'deleted')
		  {
			this._watchedFoldersPaths[id] = 'deleted';
			deleted[id] = true;//pobably moved/renamed/deleted
			somethingChanged = true;
		  }
		}
	  }
	  aFile = null;

	  //if something happened
	  if(somethingChanged)
	  {
		//for each function to notify hold the calls
		for(var aPath in this._watchedFolders)
		{
		  if(!this._watchedFolders[aPath])
			continue;
		  //check notification about modification
		  for(var id in changed)
		  {
			var watch = false;
			if(id.indexOf(aPath) === 0)
			{
			  //notify to all the functions registered of this file modification
			  for(var i in this._watchedFolders[aPath])
			  {
				if(!this._watchedFolders[aPath][i])
				  continue;
				if(this._watchedFolders[aPath][i].notifyOnce && 
				   this._watchedFolders[aPath][i].notified
				){}
				else
				{
				  this._watchedFolders[aPath][i].toNotify[id] = true;
				  this._watchedFolders[aPath][i].notified = true;
				}
				if(this._watchedFolders[aPath][i].aRecursive && changed[id])
				  watch = true;
			  }
			  if(watch)
				this._watchFolder(id, this._watchedFolders[aPath][i].aRecursive, true);//only watch new folders
			}
		  }
		  //check notification about deletion
		  for(var id in deleted)
		  {
			if(id.indexOf(aPath) === 0)
			{
			  for(var i in this._watchedFolders[aPath])
			  {
				if(this._watchedFolders[aPath][i].notifyOnce && 
				   this._watchedFolders[aPath][i].notified
				){}
				else
				{
				  this._watchedFolders[aPath][i].toNotify[id] = true;
				  this._watchedFolders[aPath][i].notified = true;
				}
			  }
			}
		  }
		}
		
		//delete from watch the innacsesible folders only if these are subfolders
		//we may want to watch a folder that by some process is deleted and then re added again
		for(var id in deleted)
		{
		  if(!this._watchedFolders[id])
			this._watchedFoldersPaths[id] = null;
		}
		
		//send the notification and reset notified state
		for(var aPath in this._watchedFolders)
		{
		  for(var i in this._watchedFolders[aPath])
		  {
			if(!this._watchedFolders[aPath][i])
			  continue;
			for(var id in this._watchedFolders[aPath][i].toNotify)
			{
			  this._watchFoldersCallback(this._watchedFolders[aPath][i], id, aPath);
			}
			this._watchedFolders[aPath][i].toNotify = [];
			this._watchedFolders[aPath][i].notified = false;
		  }
		}
	  }
	  changed = null; deleted = null;
	  this._watchFoldersRunning = false;
	}
  }
  this._watchFoldersCallback = function(aCallback, id, aPath)
  {
	//this.dump('sending notification about '+id+' to '+aPath);
	this.runThread(function(){
	  aCallback.aFunction(id);
	}, aCallback.aThread);
  }
  this._watchFoldersTimerTimer = false;
  this._watchFoldersTimerStart = function()
  {
	if(!this._watchFoldersTimerTimer)
	{
	  this._watchFoldersTimerTimer = this.timerIntervalAdd(5000,
														   function(){
															s.runThread(function(){
															  s.watchFolderCompare();
															}, s._watchFolderThread());
														   }
														   );
	  this.watchFolderCompare();
	}
  }
  this._watchFoldersTimerStartThreadRun = function()
  {
  	this.runThread(function(){s._watchFoldersTimerStart()}, this._watchFolderThread());
  }
  this._watchFoldersTimerStop = function()
  {
	try{this._watchFoldersTimerTimer.cancel()}catch(e){}
  }
  this._watchFolderThread = function()
  {
	if(!this.__watchFolderThread)
	  this.__watchFolderThread = this.newThread();
	return this.__watchFolderThread;
  }
  
  this.fileDrivesList = function()
  {
	var drives = [];
	
	if(this.isWindows())
	{
	  var root = Components.classes["@mozilla.org/file/local;1"].  
					createInstance(Components.interfaces.nsILocalFile);  
	  root.initWithPath("\\\\.");
	
	  var drivesEnum = root.directoryEntries, drives = [];  
	  while (drivesEnum.hasMoreElements())
	  {  
		drives[drives.length] = drivesEnum.getNext()
								  .QueryInterface(Components.interfaces.nsILocalFile).path
	  }
	}
	else
	{
	  drives[drives.length] = '/';
	}
  
	drives.sort(this.sortLocale);
	
	return drives;
  }
  this.folderAvailableSpace = function(aFilePath)
  {
	var aFile = Components.classes["@mozilla.org/file/local;1"]
                .createInstance(Components.interfaces.nsILocalFile);
	 aFile.initWithPath(aFilePath);
	return aFile.diskSpaceAvailable;
  }
  this._filesThread = function()
  {
	if(!this.__filesThread)
	  this.__filesThread = this.newThread();
	return this.__filesThread;
  }