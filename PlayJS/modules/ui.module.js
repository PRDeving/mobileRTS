PlayJS.NewModule('UI', new function() {
  var scope = [];
  window.sc = scope;

  function clear() {
    scope.length = 0;
  }

  function init() {
    clear();

    PlayJS.Input.Mouse.onLClick(function(ev) {
      var item;
      for (var c in scope) {
        item = scope[c];
        if (ev.pageX > item.x && ev.pageX < item.x + item.w &&
          ev.pageY > item.y && ev.pageY < item.y + item.h) {
          item.action();
        }
      }
    });

    return scope;
  }

  function draw(ctx) {
    var item;
    var mouse = PlayJS.Input.Mouse.getPosition();
    var image;
    for (var c in scope) {
      item = scope[c];

      if (mouse.x > item.x && mouse.x < item.x + item.w &&
        mouse.y > item.y && mouse.y < item.y + item.h) {
        item.hovering = true;
      } else {
        item.hovering = false;
      }

      var image = item.disabled ? item.disabledImage : (item.hovering ? item.hover : item.background);
      ctx.drawImage(image, item.x, item.y, item.w, item.h);

      if (item.text) {
        ctx.save();
        ctx.lineWidth = 4;
        ctx.font="16px Georgia";
        ctx.textAlign="center"; 
        ctx.textBaseline = "middle";
        if (item.textColor) ctx.fillStyle = item.textColor;
        ctx.fillText(item.text, item.x + (item.w / 2), item.y + (item.h / 2));
        ctx.restore();
      }
    }
  }

  function newButton(config) {
    scope.push({
      type: 'button',
      x: config.x,
      y: config.y,
      w: config.w,
      h: config.h,

      background: config.image,
      hover: config.hoverImage || config.image,
      disabledImage: config.disabledImage || config.image,

      text: config.text,
      textColor: config.textColor,

      drawn: false,
      hovering: false,
      disabled: config.disabled || false,
      action: config.action,
    });
  }

  return {
    Clear: clear,
    Init: init,
    Draw: draw,
    NewButton: newButton,
  }
});
