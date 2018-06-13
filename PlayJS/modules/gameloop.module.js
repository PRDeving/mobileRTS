PlayJS.NewModule('GameLoop', new function(){
  var priorize = [];
  var toExecute = [];
  var loop = null;

  var last = Date.now();
  var now = last;
  var deltatime;

  var _Suscribe = function(fn, pr){
    (pr ? priorize : toExecute).push(fn);
  };

  var _Tick = function() {
    last = now;
    now = Date.now();
    deltatime = now - last;


    for (var x = 0; x < priorize.length; x++){
      priorize[x](deltatime);
    }
    for (var x = 0; x < toExecute.length; x++){
      toExecute[x](deltatime);
    }
  }

  var _Run = function(fps){
    if (loop) return false;
    loop = setInterval(_Tick, 1000 / fps);
  };

  var _Stop = function(){
    clearInterval(loop);
    loop = null;
  };

  var _Clear = function(){
    _Stop();
    priorize.length = 0;
    toExecute.length = 0;
  };

  this.Suscribe = _Suscribe;
  this.Run = _Run;
  this.Stop = _Stop;
  this.Clear = _Clear;
});
