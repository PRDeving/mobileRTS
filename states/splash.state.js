PlayJS.State.New('splash', function() {
  var ctx = PlayJS.Renderer.ctx;
  ctx.fillRect(0, 0, PlayJS.config.width, PlayJS.config.height);

  this.init = function() {
    return new Promise(function(resolve, reject) {
      PlayJS.Media.Load({
        'splash': 'http://i.imgur.com/ehQwHCO.png',
      }).then(function(media) {
        ctx.drawImage(media.splash, 0, -20, PlayJS.config.width, 400);
      });

      PlayJS.Media.Load('media.preload.json').then(function(media) {
        setTimeout(function() { PlayJS.State.Change('main'); }, 3000);
      });
    });
  }

  return this;
});
