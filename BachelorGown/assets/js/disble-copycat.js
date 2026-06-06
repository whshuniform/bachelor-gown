if (process.browser) {
  function iEsc(){ return false; }

  function iRec(){ return true; }

  function disableKeys(e) {
    // if(e.ctrlKey || e.shiftKey || e.altKey) {
    //   window.event.returnValue=false;
    //   iEsc();
    // }

    if (e.ctrlKey || e.keyCode === 67 || e.keyCode === 85 || e.keyCode === 86 || e.keyCode === 117 || e.keyCode === 123) {
      return false;
    } else {
      return true;
    }
  }

  document.ondragstart = iEsc;
  document.onkeydown = disableKeys;
  document.oncontextmenu = iEsc;

  if (typeof document.onselectstart !="undefined")
    document.onselectstart = iEsc;
  else{
    document.onmousedown = iEsc;
    document.onmouseup = iRec;
  }

  function disableRightClick(qsyzDOTnet){
    if (window.Event){
      if (qsyzDOTnet.which == 2 || qsyzDOTnet.which == 3) iEsc();
    } else if (event.button == 2 || event.button == 3){
      event.cancelBubble = true
      event.returnValue = false;
      iEsc();
    }
  }
}
