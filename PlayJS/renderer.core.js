PlayJS.NewModule('Renderer', new function() {
  var canvas, ctx;
  function init(c) {
    if (!c) {
      canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
    } else {
      canvas = (typeof c == "string" ? document.querySelector(c) : c);
    }
    console.log(canvas);
    canvas.width = PlayJS.config.width || window.innerWidth;
    canvas.height = PlayJS.config.height || window.innerHeight;
    ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.ctx = ctx;
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  this.Init = init;
  this.Clear = clear;

  return this;
});
