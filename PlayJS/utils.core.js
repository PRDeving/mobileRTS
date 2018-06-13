PlayJS.NewModule('Utils', {
  version: '0.0.1',
  Random: function(m, mx) {
    return Math.floor(Math.random() * (mx - m)) + m;
  },
});
