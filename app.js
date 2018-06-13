PlayJS.Renderer.Init('#myCanvas');
PlayJS.Use([
  'states/splash.state.js',
  'states/main.state.js',
  'states/newGame.state.js',
  ]).then(function() {
    PlayJS.State.Change('splash');

    PlayJS.GameLoop.Suscribe(PlayJS.State.Tick);
    PlayJS.GameLoop.Suscribe(PlayJS.State.Draw);
    PlayJS.GameLoop.Run(30);
  })
