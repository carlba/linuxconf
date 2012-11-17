
  this.placesLocalCurrentPath = function(window)
  {
	if(window.ko && window.ko.places && window.ko.places.manager && window.ko.places.manager.currentPlace)
	{
	  var path = this.filePathFromFileURI(window.ko.places.manager.currentPlace);
	  if(path.indexOf(':') != -1 && path.indexOf(':\\') == -1)
		path = path.replace(':', ':\\');
	  return path;
	}
	else
	  return '';
  }

  this.placesLocalGetSelectedPaths = function(window, focusedTab)
  {
	if(!focusedTab)
	{
	  var selected = window.gPlacesViewMgr.getSelectedURIs();

	  if(window.document.popupNode && window.document.popupNode.id && window.document.popupNode.id == 'placesRootButton')
	  {
		selected = [];
		selected[0] = this.placesLocalCurrentPath(window);
	  }
	  else if(selected && selected.length && selected.length > 0)
	  {
		for(var id in selected)
		  selected[id] = this.filePathFromFileURI(selected[id]);
	  }
	  else
	  {
		selected = [];
		selected[0] = this.placesLocalCurrentPath(window);
	  }
	}
	else
	{
	  var selected = [];
		  selected[0] = this.filePathFromFileURI(this.documentFocusedGetLocation(window));
	}
	return selected;
  }
  this.placesLocalGetSelectedPathFolder = function(window, focusedTab)
  {
	var selected = this.placesLocalGetSelectedPaths(window, focusedTab)[0];
	  if(this.s.pathIsFolder(selected)){}
	  else
		  selected = this.s.fileDirname(selected);
	return selected;
  }