(function() {
  var AABB = function(r1, r2) {
    if (r2.hasOwnProperty('x')) return check(r1, r2);
    for (var i in r2) if (check(r1, r2[i])) return true;
    return false;

    function check(a, b) {
      return (a.x < b.x + b.w && a.x + a.w > b.x
        && a.y < b.y + b.h && a.h + a.y > b.y);
    }
  }

  PlayJS.NewModule('Physics', {
    AABB,
  })
})();
