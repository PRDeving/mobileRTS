(function() {
  var ROOT_PATH;
  var MODULES_REL_PATH = '/modules';

  var global = {
    version: '0.0.1',
    config: false,
  };

  var coreModules = [
    'utils.core.js',
    'renderer.core.js',
    'input.core.js',
  ];

  // PARSE TAG
  var sources = {};
  var parseTag = function() {
    var tag = document.querySelector('script[src*=PlayJS]');
    ROOT_PATH = tag.src.match(/(.*)\/engine.js$/)[1];
    sources.app = tag.attributes.app ? tag.attributes.app.value : false;
    sources.config = tag.attributes.config ? tag.attributes.config.value : false;
  }




  // HTTP SYSTEM
  var http = new function() {

    var parseType = function(name) {
      return /\S\.json/.test(name) ? 'json' : 'text';
    }

    var getXHRConfig = function(conf) {
      var def = {
        url: false,
        method: 'GET',
        cache: true,
        responseType: 'text'
      }

      if (typeof conf == "string") {
        def.url = conf;
        def.responseType = parseType(conf);
      } else {
        for (k in conf) def[k] = conf[k];
      }

      return def;
    };

    var ajax = function(conf) {
      var config = getXHRConfig(conf);
      var list = typeof conf.url == 'string' ? [conf.url] : conf.url;
      var length = (list.length ? list : Object.keys(list)).length;
      var count = 0;
      var ret = {};

      return new Promise(function(resolve, reject) {
        for (var i in list) {
          if (!list[i]) {
            count++;
            continue;
          }

          console.info('Load', list[i], 'as', i);

          fetch(list[i], conf, i, function(ans) {
            count++;
            console.info('Loaded', list[ans.id], 'as', ans.id);
            if (length === 1) ret = ans.data;
            else ret[ans.id] = ans.data;

            if (count === length) resolve(ret);
          });
        }
      });
    }
    this.ajax = ajax;

    var get = function(url, data) {
      return ajax(getXHRConfig({url: url, method: 'GET', data: data}));
    }
    this.get = get;

    var post = function(url, data) {
      return ajax(getXHRConfig({url: url, method: 'POST', data: data}));
    }
    this.post = post;


    var fetch = function(url, conf, id, success, error) {
      var config = getXHRConfig(conf);
      config.url = url;

      var oReq = new XMLHttpRequest();
      oReq.onload = function (e) {
        if (e.target && e.target.status === 200) {
          if (success) success({
            url: url,
            id: id,
            data: e.target.response,
          }, e);
        } else {
          if (error) error(e.target, e);
        }
      };
      oReq.open(config.method, config.url + (!config.cache && !global.config.XHRCache ? ('?' + new Date().getTime()) : ''), true);
      oReq.responseType = parseType(config.url)
      oReq.send(config.data ? config.data : null);
    }
  };
  global.http = http;

  // MODULE SYSTEM
  var modules = [];
  function use(url) {
    return new Promise(function(resolve, reject) {
      http.ajax({
        url: url,
        cache: global.config.enableCache || false,
      }).then(function(ans) {
        if (typeof ans == 'string') ans = [ans];
        for (var i in ans) Function(ans[i])();
        resolve();
      });
    });
  }
  function NewModule(name, fn){
    if(HasModule(name)) {
      console.log('PlayJS already has an module called', name);
      return false;
    }
    modules.push(name);
    global[name] = fn;
  }

  function HasModule(module){
    return modules.indexOf(module) >= 0;
  }
  global.Use = use;
  global.NewModule = NewModule;
  global.HasModule = HasModule;



  // INIT
  var loadModules = function(ms) {
    return new Promise(function(resolve, reject) {
      for (var i in ms) {
        ms[i] = /^http/.test(ms[i]) ? ms[i]
          : ROOT_PATH + (/.core.js/.test(ms[i]) ? '/' + ms[i] : MODULES_REL_PATH + '/' +  ms[i] + '.module.js');
      }
      use(ms).then(function() { resolve(); });
    });
  }

  var Init = function() {
    parseTag();
    http.ajax({
      url: sources,
    }).then(function(ans) {
      console.log(ans);
      global.config = ans.config;
      if (!global.config.width) global.config.width = window.innerWidth;
      if (!global.config.height) global.config.height = window.innerHeight;

      loadModules(coreModules).then(function() {
        loadModules(ans.config.modules).then(function() {
          console.log('all ready');
          Function(ans.app)();
        });
      });
    });
  }

  window.PlayJS = global;
  Init();
})();
