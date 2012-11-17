
  //measures time
const measureTime = function()
{
  var aConnection = 'measureTime.connection';

  if(s.sharedObjectExists(aConnection))
  {
	var shared = s.sharedObjectGet(aConnection);
	  shared.resetAll();
	return shared;
  }
  else
  {
	var object = {};
	object.timers = [];
	object.start = function(anID)
	{
	  if(!this.timers[anID])
		this.timers[anID]=[]; 
	  this.timers[anID]['start'] = new Date();
	};
	object.resetAll = function(anID)
	{
	  this.timers = [];
	}
	object.reset = function(anID)
	{
	  if(!this.timers[anID])
		this.timers[anID]=[]; 
	  this.timers[anID]['total'] = 0;
	};
	object.stop = function(anID)
	{ 
	  var now = new Date(); 	
	  var diffMs = (now - this.timers[anID]['start']);
	  if(!this.timers[anID]['total'])
		this.timers[anID]['total'] = 0;
	  this.timers[anID]['total'] += diffMs;
	};
	object.progress = function(anID)
	{ 
	  var now = new Date(); 	
	  var diffMs = (now - this.timers[anID]['start']);
	  s.dump(anID+' takes '+(diffMs/1000)+' segs');
	};
	object.display = function()
	{ 
	  s.dump('----------------------------------------');
	  var total = 0;
	  for(var anID in this.timers)
	  {
		s.dump(anID+' total time '+this.timers[anID]['total']+' ms');
		total += this.timers[anID]['total'];
	  }
	  s.dump('Total time '+total);
	}
	
	return s.sharedObjectGet(aConnection, object);
  }
}