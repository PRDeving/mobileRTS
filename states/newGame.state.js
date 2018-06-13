PlayJS.State.New('newGame', function() {
  var media;
  var map = false;

  this.init = function() {
    PlayJS.UI.Init();
    return new Promise(function(resolve, reject) {
      PlayJS.Media.Use([
        'arrowLeft',
        'arrowRight',
        'map0',
        'map1',
        'background',
        'button',
        'buttonHover',
        'buttonDisabled',
      ]).then(function(m) {
        media = m;
        mainUI();
        resolve();
      });
    });
  }

  function mainUI() {
    PlayJS.UI.Clear();

    PlayJS.UI.NewButton({
      x: 10,
      y: PlayJS.config.height / 2 - 10,
      w: 80,
      h: 80,
      image: media.arrowLeft,
      action: function() { map = !map; },
    });

    PlayJS.UI.NewButton({
      x: PlayJS.config.height - 100 + 70,
      y: PlayJS.config.height / 2 - 10,
      w: 80,
      h: 80,
      image: media.arrowRight,
      action: function() { map = !map; },
    });

    PlayJS.UI.NewButton({
      x: 20,
      y: 20,
      w: 180,
      h: 40,
      image: media.button,
      hoverImage: media.buttonHover,
      text: 'Atras',
      action: function() { PlayJS.State.Change('main'); },
    });

    PlayJS.UI.NewButton({
      x: PlayJS.config.width - 200,
      y: PlayJS.config.height - 120,
      w: 180,
      h: 40,
      image: media.button,
      hoverImage: media.buttonHover,
      text: 'Opciones',
      action: function() { console.log('opciones'); },
    });

    PlayJS.UI.NewButton({
      x: PlayJS.config.width - 200,
      y: PlayJS.config.height - 60,
      w: 180,
      h: 40,
      image: media.button,
      hoverImage: media.buttonHover,
      text: 'Jugar',
      action: function() { console.log('continue'); },
    })
  }

  this.draw = function() {
    var ctx = PlayJS.Renderer.ctx;
    PlayJS.Renderer.Clear();
    ctx.drawImage(media.background, 0, 0, PlayJS.config.width, PlayJS.config.height);
    ctx.drawImage(media['map' + (map >> 0)], 80, 80, PlayJS.config.height - 100, PlayJS.config.height - 100);

    PlayJS.UI.Draw(ctx);
  }

  return this;
});
