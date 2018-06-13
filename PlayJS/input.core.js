/*
 * 81 - Q
 * 87 - W
 * 69 - E
 * 82 - R
 * 84 - T
 * 89 - Y
 * 85 - U
 * 73 - I
 * 79 - O
 * 80 - P
 * 65 - A
 * 83 - S
 * 68 - D
 * 70 - F
 * 71 - G
 * 72 - H
 * 74 - J
 * 75 - K
 * 76 - L
 * 90 - Z
 * 88 - X
 * 67 - C
 * 86 - V
 * 66 - B
 * 78 - N
 * 77 - M
 */

PlayJS.NewModule('Input', new function() {
  var buffer = new Array(255);
  var mouse = {x: 0, y: 0};
  var md, mu;

  var kcb = {};
  var cb = [[], []];
  var mousemove = [];

  var reset = function() {
    kcb = {};
    cb[0].length = 0;
    cb[1].length = 0;
    mousemove.length = 0;
    buffer = new Array(255);
  }

  document.addEventListener('keydown', function(ev) {
    console.log(ev.keyCode);
    buffer[ev.keyCode] = true;
    if (kcb[ev.keyCode]) kcb[ev.keyCode]();
  });

  document.addEventListener('keyup', function(ev) {
    buffer[ev.keyCode] = false;
  });

  document.addEventListener('mousemove', function(ev) {
    mouse.x = ev.pageX;
    mouse.y = ev.pageY;

    var c = 0;
    while (c < mousemove.length) mousemove[c](ev);
  });

  document.addEventListener('click', function(ev) {
    for (var i in cb[0]) cb[0][i](ev);
  });

  document.addEventListener('contextmenu', function(ev) {
    for (var i in cb[1]) cb[1][i](ev);
  });

  document.addEventListener('mousedown', function(ev) {
    if (md) md(ev);
  });

  document.addEventListener('mouseup', function(ev) {
    if (mu) mu(ev);
  });

  return {
    reset: reset,
    key: function(k) { return buffer[k]; },
    onKey: function(k, fn) { kcb[k] = fn; },
    map: buffer,
    cb: cb,
    Mouse: {
      getPosition: function() { return mouse; },
      onLClick: function(fn) { cb[0].push(fn); },
      onRClick: function(fn) { cb[1].push(fn); },
      onMouseMove: function(fn) { mousemove.push(fn); },
      onMouseDown: function(fn) { md = fn; },
      onMouseUp: function(fn) { mu = fn; },
    }
  }
});
