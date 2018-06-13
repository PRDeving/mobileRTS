PlayJS.NewModule('State', new function() {
  var states = {};
  var stack = [];

  function New(name, fn) {
    states[name] = new fn();
  }

  function Change(state, args) {
    if (!states[state]) {
      console.error('state ', state, 'doesnt exists');
      return false;
    }
    stack.length = 0;
    Push(state, args);
  }

  function Push(state, args) {
    if (!states[state]) {
      console.error('state ', state, 'doesnt exists');
      return false;
    }
    PlayJS.Input.reset();
    states[state].init(args).then(function() {
      stack.push(states[state]);
    });
  }

  function Pop() {
    stack.pop();
  }

  function Tick(data) {
    for (var s in stack)
      if ((s == stack.length - 1 || stack[s].keepUpdating) && stack[s].tick)
        stack[s].tick(data);
  }

  function Draw(ctx) {
    for (var s in stack)
      if ((s == stack.length - 1 || stack[s].keepDrawing) && stack[s].draw)
        stack[s].draw(ctx ? ctx : PlayJS.Renderer.ctx);
  }

  return {
    New,
    Change,
    Push,
    Pop,
    Tick,
    Draw,
  }
});
