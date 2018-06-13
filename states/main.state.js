PlayJS.State.New('main', function() {
  var media;
  var continueGame = false;
  var savedGames = false;

  this.init = function() {
    PlayJS.UI.Init();

    return new Promise(function(resolve, reject) {
      PlayJS.Media.Use([
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
      x: 10, y: 10,
      w: 130, h: 60,
      image: media.button,
      hoverImage: media.buttonHover,
      disabledImage: media.buttonDisabled,
      disabled: !continueGame,
      text: 'Continuar',
      action: function() { console.log('continue'); },
    });

    PlayJS.UI.NewButton({
      x: 10, y: 80,
      w: 130, h: 60,
      image: media.button,
      hoverImage: media.buttonHover,
      text: 'Nuevo juego',
      action: function() {
        PlayJS.State.Change('newGame');
      },
    });

    PlayJS.UI.NewButton({
      x: 10, y: 150,
      w: 130, h: 60,
      image: media.button,
      hoverImage: media.buttonHover,
      disabledImage: media.buttonDisabled,
      disabled: !savedGames,
      text: 'Cargar juego',
      action: function() { console.log('load'); },
    });

    PlayJS.UI.NewButton({
      x: 10, y: 220,
      w: 130, h: 60,
      image: media.button,
      hoverImage: media.buttonHover,
      text: 'Configuracion',
      action: function() { console.log('Config'); },
    });
  }

  this.draw = function() {
    var ctx = PlayJS.Renderer.ctx;
    PlayJS.Renderer.Clear();

    ctx.drawImage(media.background, 0, 0, PlayJS.config.width, PlayJS.config.height);
    PlayJS.UI.Draw(ctx);
  }

  return this;
});
