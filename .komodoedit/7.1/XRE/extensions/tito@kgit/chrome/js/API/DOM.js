
  
  //removes all non locked childs from a node
  this.removeChilds = function (aElement)
  {
	if(aElement.hasChildNodes())
	{
	  var deletion = []
	  var length = aElement.childNodes.length;
	  for(var a=0;a<length;a++)
	  {
		if(!aElement.childNodes[a].hasAttribute('locked'))
		  deletion[deletion.length] = aElement.childNodes[a];
	  }
	  for(var id in deletion)
		aElement.removeChild(deletion[id]);
	}
  }
  //stopPropagation and preventDefault
  this.stopEvent = function (event)
  {
	event.stopPropagation();
	event.preventDefault();
  }
  //returns the tag name of a node in upper case
  this.tagName = function (aNode)
  {
	if(aNode && aNode.tagName)
	{
	  var copy = aNode.tagName;
	  return String(copy).toLowerCase();
	}
	else
	  return '';
  }
  
  this.create = function(document, aElement)
  {
	return document.createElement(aElement);
  }

  //closes all the children popups opened
  this.hideChildrensPopupsOpened = function (aNode)
  {
	for(var i=0;i<aNode.childNodes.length;i++)
	{
	  if(this.tagName(aNode.childNodes[i]) == 'menu' && aNode.childNodes[i].firstChild.state == 'open')
	  {
		aNode.childNodes[i].firstChild.hidePopup();
	  }
	}
  }
  //closes all the children popups opened
  this.hideSiblingsPopupsOpened = function (aNode)
  {
	//this.tagName(aNode.parentNode)
	for(var i=0;i<aNode.parentNode.childNodes.length;i++)
	{
	  if(
		 aNode.parentNode.childNodes[i] != aNode &&
		 (
		  this.tagName(aNode.parentNode.childNodes[i]) == 'menu' ||
		  this.tagName(aNode.parentNode.childNodes[i]) == 'xul:menu'
		 )
	  )
	  {
		aNode.parentNode.childNodes[i].firstChild.hidePopup();
	  }
	}
	
	
  }
