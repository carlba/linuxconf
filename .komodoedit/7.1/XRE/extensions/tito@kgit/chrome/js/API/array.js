	//removes duplicate values from an array
	this.arrayUnique = function (anArray)
	{
		var tmp = [];
		for(var id in anArray)
		{
			if(!this.inArray(tmp, anArray[id]))
			{
			  tmp[tmp.length] = anArray[id];
			}
		}
		return tmp;
	}
	//checks if a value exists in an array
	this.inArray = function (anArray, some)
	{
		for(var id in anArray)
		{
			if(anArray[id]==some)
				return true;
		}
		return false;
	}
	//checks if a value exists in an array
	this.inArraySourceCompare = function (anArray, some)
	{
	  some = some.toSource();
	  for(var id in anArray)
	  {
		if(anArray[id].toSource()==some)
			return true;
	  }
	  return false;
	}