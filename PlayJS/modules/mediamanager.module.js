PlayJS.NewModule('Media', new function() {
  var images = {};

  function Use(arr) {
    var ret = {};
    return new Promise(function(resolve, reject) {
      for (var i in arr) {
        if (!images[arr[i]]) console.error('Theres no image loaded for ', arr[i]);
        ret[arr[i]] = images[arr[i]];
      }
      resolve(ret);
    });
  }

  function Load(obj) {
    return new Promise(function(resolve, reject) {
      var count = 0;
      var arr;

      if (typeof obj == 'string') {
        PlayJS.http.get(obj).then(function(ans) {
          arr = ans;
          evaluate();
        });
      } else {
        arr = obj;
        evaluate();
      }

      function evaluate() {
        for (var i in arr) {
          if (images[i]) {
            count++;
            continue;
          }

          var img = new Image();
          img.onload = loaded;
          img.src = arr[i];
          images[i] = img;
        }

        if (count >= Object.keys(arr).length) {
          ret();
        }
      }

      function loaded(e) {
        count++;
        if (count >= Object.keys(arr).length) {
          ret();
        }
      }

      function ret() {
        var r = {};
        for (var i in arr) r[i] = images[i];
        resolve(r);
      }
    });
  }

  return {
    Load,
    Use,
  }
});
