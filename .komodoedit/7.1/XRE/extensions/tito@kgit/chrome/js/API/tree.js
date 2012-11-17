	  
  const mAtomService = Components.classes["@mozilla.org/atom-service;1"]
						.getService(Components.interfaces.nsIAtomService);
  
  const mAtomIconBusy = mAtomService.getAtom("busy");
  const mAtomIconHidden = mAtomService.getAtom("hidden");
  const mAtomIconSymlink = mAtomService.getAtom("symlink");
  const mAtomIconUnWritable = mAtomService.getAtom("unwritable");
  const mAtomIconUnReadable = mAtomService.getAtom("unreadable");
  
  const mAtoms = [];

  this.getAtom = function(aName)
  {
   if (!mAtoms[aName])
      mAtoms[aName] = mAtomService.getAtom(aName)
    return mAtoms[aName];
  }
