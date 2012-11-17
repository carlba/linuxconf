
  const mThreads = Components
					.classes["@mozilla.org/thread-manager;1"]
					.getService();
					
  const mMainThread = mThreads.mainThread;
  
  //returns a new thread
  this.newThread = function()
  {
	return mThreads.newThread(0);
  }
  //returns the current thread
  this.currentThread = function()
  {
	return mThreads.currentThread;
  }
  //run a aCallback into the main thread
  this.runMain = function(aCallback)
  {
	this.runThread(aCallback, mMainThread);
  }
  
  //run a aCallback into the main thread and wait for return
  this.runMainAndWait = function(aCallback)
  {
	this.runThreadAndWait(aCallback, mMainThread);
  }
  
  //executes aCallback into the selected thread
  this.runThread = function(aCallback, aThread)
  {
	if(this.isMinGecko('2'))
	{
	  //this.dump('runThread:thank you https://bugzilla.mozilla.org/show_bug.cgi?id=608142', aCallback);
	  aCallback();
	}
	else
	{
	  aThread.dispatch(
						{
						  run:function(){ aCallback(); },
						  QueryInterface:function(iid)
						  {
							if (iid.equals(Components.interfaces.nsIRunnable) ||
							  iid.equals(Components.interfaces.nsISupports)) {
								  return this;
							}
							throw Components.results.NS_ERROR_NO_INTERFACE;
						  }
						},
						Components.interfaces.nsIThread.DISPATCH_NORMAL
					  );
	}
  }
  
  //executes aCallback into the selected thread and wait for return
  this.runThreadAndWait = function(aCallback, aThread)
  {
	if(this.isMinGecko('2'))
	{
	  //this.dump('runThreadAndWait:thank you https://bugzilla.mozilla.org/show_bug.cgi?id=608142', aCallback);
	  aCallback();
	}
	else
	{
	  aThread.dispatch(
					  {
						run:function(){ aCallback(); },
						QueryInterface:function(iid)
						{
						  if (iid.equals(Components.interfaces.nsIRunnable) ||
							iid.equals(Components.interfaces.nsISupports)) {
								return this;
						  }
						  throw Components.results.NS_ERROR_NO_INTERFACE;
						}
					  },
					  Components.interfaces.nsIThread.DISPATCH_SYNC
					);
	}
  }
  
  //shutdowns the thread
  this.threadShutdown = function(aThread)
  {
	aThread.shutdown();
  }
