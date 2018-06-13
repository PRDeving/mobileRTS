# StateManager module

**Version 0.0.1**
import: **statemanager**

This module manages different scenes in a stack based system, being the last added scene the one rendered and updated

## The states

states are singletones that are constructed from a function using the `New` method (`PlayJS.State.New('name', fn(){...});`)

```
PlayJS.State.New('test', function() {

  this.init = function() {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }

  this.tick = function() {
    console.log('ticks');
  }

  this.Draw = function(ctx) {
    ctx.fillRect(0, 0, 10, 10);
  }

  return this;
});
```

states needs at least an `init` method, this method has to return a `Promise`, the Init method will be called as state setup, here states will fetch for media resources, initialize things and that kind of stuff.

states has some optional methods and keys:

### tick(Object data)

will be fired every time the state is active and the StateManager runs its `tick` function

### Draw(CanvasRenderingContext2D ctx)

will be fired every time the state is active and the StateManager runs its `draw` function

### keepUpdating <Boolean>

this key can be true or false, if true, the tick function of this state will be fired even if it's not the top one in the states stack

### keepDrawing <Boolean>

this key can be true or false, if true, the draw function of this state will be fired even if it's not the top one in the states stack



## StateManager Methods

### New(String name, Function fn)

This method defines a new state with name `name` and `fn` as constructor, states are generated as singletones

### Change(String name, Object args)

This method clears the stack and loads a defined state named `name` passing `args` as argument for the `init` method in the scene

### Push(String name, Object args)

This method pushes a new state into the stack, this state will be the active one until other state is pushed in the stack or the state is changed

### Pop()

This method pops the state on the top of the stack so the state that was active before this one got pushed will be active again

### Tick(Object data)

This method fires the `tick` method inside states, only the top state in the stack and states with the `keepUpdating` key enabled will be ticked. data is passed to the states `tick` method as argument

### Draw(CanvasRenderingContext2D ctx)

This method fires the `draw` method inside states, only the top state in the stack and states with the `keepDrawing` key enabled will be ticked. drawing context is passed to the states `draw` method as argument.
If argument is not provided, ctx falls back to PlayJS.Renderer.ctx


