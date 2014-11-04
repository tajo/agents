(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var Agent;

  module.exports = Agent = (function() {
    function Agent() {
      this.history = [];
      this.name = 'Agent';
      this.game = {
        'name': 'default'
      };
    }

    Agent.prototype.play = function() {};

    Agent.prototype.opponentPlayed = function(move) {
      return this.history.push(move);
    };

    Agent.prototype.setName = function(name) {
      this.name = name;
    };

    Agent.prototype.getName = function() {
      return this.name;
    };

    Agent.prototype.getPreviousMove = function() {
      if (this.history.length > 0) {
        return this.history.slice(-1)[0];
      }
      return 'cooperate';
    };

    Agent.prototype.getHistory = function() {
      return this.history;
    };

    Agent.prototype.setGame = function(game) {
      this.game = game;
    };

    Agent.prototype.getGame = function() {
      return this.game;
    };

    Agent.prototype.reset = function() {
      this.setGame({
        'name': 'default'
      });
      return this.history = [];
    };

    return Agent;

  })();

}).call(this);

},{}],2:[function(require,module,exports){
(function() {
  var Agent, AlwaysCooperate,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Agent = require('./agent');

  module.exports = AlwaysCooperate = (function(_super) {
    __extends(AlwaysCooperate, _super);

    function AlwaysCooperate() {
      AlwaysCooperate.__super__.constructor.call(this);
      this.setName('Always Cooperate');
    }

    AlwaysCooperate.prototype.play = function() {
      return 'cooperate';
    };

    return AlwaysCooperate;

  })(Agent);

}).call(this);

},{"./agent":1}],3:[function(require,module,exports){
(function() {
  var Agent, AlwaysDefect,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Agent = require('./agent');

  module.exports = AlwaysDefect = (function(_super) {
    __extends(AlwaysDefect, _super);

    function AlwaysDefect() {
      AlwaysDefect.__super__.constructor.call(this);
      this.setName('Always Defect');
    }

    AlwaysDefect.prototype.play = function() {
      return 'defect';
    };

    return AlwaysDefect;

  })(Agent);

}).call(this);

},{"./agent":1}],4:[function(require,module,exports){
(function() {
  var Agent, Maximin,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Agent = require('./agent');

  module.exports = Maximin = (function(_super) {
    __extends(Maximin, _super);

    function Maximin() {
      Maximin.__super__.constructor.call(this);
      this.setName('Maximin');
      this.p = 0.5;
    }

    Maximin.prototype.play = function() {
      if (Math.random() < this.p) {
        return 'cooperate';
      }
      return 'defect';
    };

    Maximin.prototype.setGame = function(game) {
      Maximin.__super__.setGame.call(this, game);
      return this.p = (game.dd - game.cd) / (game.cc - game.cd - game.dc + game.dd);
    };

    Maximin.prototype.reset = function() {
      Maximin.__super__.reset.call(this);
      return this.p = 0.5;
    };

    return Maximin;

  })(Agent);

}).call(this);

},{"./agent":1}],5:[function(require,module,exports){
(function() {
  var Agent, Random,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Agent = require('./agent');

  module.exports = Random = (function(_super) {
    __extends(Random, _super);

    function Random() {
      Random.__super__.constructor.call(this);
      this.setName('Random');
    }

    Random.prototype.play = function() {
      if (Math.random() < 0.5) {
        return 'cooperate';
      }
      return 'defect';
    };

    return Random;

  })(Agent);

}).call(this);

},{"./agent":1}],6:[function(require,module,exports){
(function() {
  var Agent, TitFor2Tats,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Agent = require('./agent');

  module.exports = TitFor2Tats = (function(_super) {
    __extends(TitFor2Tats, _super);

    function TitFor2Tats() {
      TitFor2Tats.__super__.constructor.call(this);
      this.setName('Tit for 2 tats');
    }

    TitFor2Tats.prototype.play = function() {
      var h;
      h = this.getHistory();
      if (h.length > 1 && h.slice(-1)[0] === 'defect' && h.slice(-2)[0] === 'defect') {
        return 'defect';
      }
      return 'cooperate';
    };

    return TitFor2Tats;

  })(Agent);

}).call(this);

},{"./agent":1}],7:[function(require,module,exports){
(function() {
  var Agent, TitForTat,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Agent = require('./agent');

  module.exports = TitForTat = (function(_super) {
    __extends(TitForTat, _super);

    function TitForTat() {
      TitForTat.__super__.constructor.call(this);
      this.setName('Tit for tat');
    }

    TitForTat.prototype.play = function() {
      if (this.getPreviousMove() === 'cooperate') {
        return 'cooperate';
      }
      return 'defect';
    };

    return TitForTat;

  })(Agent);

}).call(this);

},{"./agent":1}],8:[function(require,module,exports){

/**
 * Win-stay, lose-shift - This algorithm begins by playing cooperate,
 * and then repeats the action it played in the previous round if its
 * last payoff was greater than or equal to its average payoff in the
 * game (2.25 in the prisoner’s dilemma, 3.5 in chicken, and 1.0 in
 * the stag hunt).
 */

(function() {
  var Agent, WinStayLoseShift,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Agent = require('./agent');

  module.exports = WinStayLoseShift = (function(_super) {
    __extends(WinStayLoseShift, _super);

    function WinStayLoseShift() {
      WinStayLoseShift.__super__.constructor.call(this);
      this.setName('Win-stay, Lose-shift');
      this.avgPayoff = 0;
      this.myLastMove = 'cooperate';
    }

    WinStayLoseShift.prototype.play = function() {
      var lastPayOff;
      if (this.getHistory().length === 0) {
        return 'cooperate';
      }
      if (this.getPreviousMove() === 'cooperate') {
        lastPayOff = this.getGame().dc;
        if (this.myLastMove === 'cooperate') {
          lastPayOff = this.getGame().cc;
        }
      } else {
        lastPayOff = this.getGame().dd;
        if (this.myLastMove === 'cooperate') {
          lastPayOff = this.getGame().cd;
        }
      }
      if (lastPayOff >= this.avgPayoff) {
        return this.myLastMove;
      }
      if (this.myLastMove === 'cooperate') {
        this.myLastMove = 'defect';
      } else {
        this.myLastMove = 'cooperate';
      }
      return this.myLastMove;
    };

    WinStayLoseShift.prototype.setGame = function(game) {
      WinStayLoseShift.__super__.setGame.call(this, game);
      return this.avgPayoff = (game.cc + game.dc + game.cd + game.dd) / 4;
    };

    WinStayLoseShift.prototype.reset = function() {
      WinStayLoseShift.__super__.reset.call(this);
      this.avgPayoff = 0;
      return this.myLastMove = 'cooperate';
    };

    return WinStayLoseShift;

  })(Agent);

}).call(this);

},{"./agent":1}],9:[function(require,module,exports){
(function() {
  var Progress;

  module.exports.escapeHtml = function(html) {
    var map;
    map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return html.replace(/[&<>"']/g, function(m) {
      return map[m];
    });
  };

  module.exports.print = function(value, escaped) {
    var div;
    if (escaped == null) {
      escaped = true;
    }
    div = document.createElement('div');
    if (escaped) {
      value = module.exports.escapeHtml(value);
    }
    div.innerHTML = value;
    return document.body.appendChild(div);
  };

  module.exports.code = function(value, escaped) {
    var div;
    if (escaped == null) {
      escaped = true;
    }
    div = document.createElement('pre');
    if (escaped) {
      value = module.exports.escapeHtml(value);
    }
    div.innerHTML = value;
    return document.body.appendChild(div);
  };

  module.exports.reset = function() {
    return document.body.innerHTML = '';
  };

  module.exports.h1 = function(value) {
    var h1;
    h1 = document.createElement('h1');
    h1.innerHTML = value;
    return document.body.appendChild(h1);
  };

  module.exports.h2 = function(value) {
    var h2;
    h2 = document.createElement('h2');
    h2.innerHTML = value;
    return document.body.appendChild(h2);
  };

  module.exports.h3 = function(value) {
    var h3;
    h3 = document.createElement('h3');
    h3.innerHTML = value;
    return document.body.appendChild(h3);
  };

  module.exports.image = function(src) {
    var img;
    img = document.createElement('img');
    img.setAttribute('src', src);
    return document.body.appendChild(img);
  };

  module.exports.list = function(list) {
    var i, li, ul, _i, _ref;
    ul = document.createElement('ul');
    for (i = _i = 0, _ref = list.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      li = document.createElement('li');
      li.appendChild(document.createTextNode(list[i]));
      ul.appendChild(li);
    }
    return document.body.appendChild(ul);
  };

  module.exports.hr = function() {
    return document.body.appendChild(document.createElement('hr'));
  };

  module.exports.table = function(matrix) {
    var i, j, row, tbdy, tbl, td, tr, _i, _j, _ref, _ref1;
    tbl = document.createElement('table');
    tbdy = document.createElement('tbody');
    for (i = _i = 0, _ref = matrix.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      tr = document.createElement('tr');
      row = matrix[i];
      for (j = _j = 0, _ref1 = row.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
        td = document.createElement('td');
        td.appendChild(document.createTextNode(row[j]));
        tr.appendChild(td);
      }
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    return document.body.appendChild(tbl);
  };

  module.exports.progress = Progress = (function() {
    function Progress(max, color, description) {
      this.max = max;
      this.color = color != null ? color : '#00f';
      this.description = description != null ? description : 'is finished.';
      this.element = document.createElement('div');
      this.bar = document.createElement('div');
      this.bar.className = 'progress-bar';
      this.caption = document.createElement('div');
      document.body.appendChild(this.element);
      this.element.appendChild(this.bar);
      this.element.appendChild(this.caption);
      this.update(0);
    }

    Progress.prototype.update = function(value) {
      this.value = value;
      this.caption.innerHTML = this.value + ' / ' + this.max + ' ' + this.description;
      this.bar.style.width = "" + ((this.value / this.max) * 100) + "%";
      return this.bar.style['background-color'] = this.color;
    };

    Progress.prototype.getValue = function() {
      return this.value;
    };

    return Progress;

  })();

  module.exports.barchart = function(data, options) {
    var canvas;
    if (options == null) {
      options = null;
    }
    canvas = document.createElement('canvas');
    canvas.id = module.exports.guid();
    canvas.width = 600;
    canvas.height = 400;
    document.body.appendChild(canvas);
    if (!options) {
      options = {
        scaleFontSize: 14,
        scaleFontFamily: 'Arial',
        animationSteps: 200,
        scaleLineColor: "rgba(0,0,0,.4)"
      };
    }
    return new Chart(canvas.getContext("2d")).Bar(data, options);
  };

  module.exports.linechart = function(data, options) {
    var canvas;
    if (options == null) {
      options = null;
    }
    canvas = document.createElement('canvas');
    canvas.id = module.exports.guid();
    canvas.width = 800;
    canvas.height = 400;
    document.body.appendChild(canvas);
    if (!options) {
      options = {
        scaleFontSize: 14,
        scaleFontFamily: 'Arial',
        bezierCurve: false
      };
    }
    return new Chart(canvas.getContext("2d")).Line(data, options);
  };

  module.exports.chartlabel = function(label, color) {
    return module.exports.print('<div style="padding:3px;margin:2px;width: 200px;color:white;background-color:rgb(' + color + ')">' + label + '</div>', false);
  };

  module.exports.guid = function() {
    return 'guid' + Date.now();
  };

}).call(this);

},{}],10:[function(require,module,exports){
(function() {
  var AlwaysCooperate, AlwaysDefect, Evolutionary, Maximin, Random, RoundRobin, TitFor2Tats, TitForTat, WinStayLoseShift, agent, agents, averaging, b, evolutionary, games, key, roundRobin, rounds, _i, _len;

  b = require('./browser');

  games = require('./games.coffee');

  TitForTat = require('./agent/tit_for_tat');

  TitFor2Tats = require('./agent/tit_for_2_tats');

  AlwaysDefect = require('./agent/always_defect');

  AlwaysCooperate = require('./agent/always_cooperate');

  Random = require('./agent/random');

  Maximin = require('./agent/maximin');

  WinStayLoseShift = require('./agent/win_stay_lose_shift');

  RoundRobin = require('./tournament/round_robin');

  Evolutionary = require('./tournament/evolutionary');

  agents = [];

  agents.push({
    engine: new TitForTat
  });

  agents.push({
    engine: new TitFor2Tats
  });

  agents.push({
    engine: new AlwaysCooperate
  });

  agents.push({
    engine: new AlwaysDefect
  });

  agents.push({
    engine: new Random
  });

  agents.push({
    engine: new Maximin
  });

  agents.push({
    engine: new WinStayLoseShift
  });

  for (key = _i = 0, _len = agents.length; _i < _len; key = ++_i) {
    agent = agents[key];
    agent.id = key;
  }

  b.print('<a href="https://github.com/tajo/agents" target="_blank"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>', false);

  rounds = 1000;

  averaging = 5;

  b.h1('Round-robin tournament, ' + rounds + ' rounds, averaging ' + averaging);

  roundRobin = new RoundRobin(games, agents, rounds, averaging);

  roundRobin.start();

  b.h1('Evolutionary tournament, 1000 generations max');

  evolutionary = new Evolutionary(games, agents, roundRobin.getFinalScoreForEvoTournament());

  evolutionary.start();

}).call(this);

},{"./agent/always_cooperate":2,"./agent/always_defect":3,"./agent/maximin":4,"./agent/random":5,"./agent/tit_for_2_tats":6,"./agent/tit_for_tat":7,"./agent/win_stay_lose_shift":8,"./browser":9,"./games.coffee":11,"./tournament/evolutionary":12,"./tournament/round_robin":13}],11:[function(require,module,exports){
(function() {
  var chicken, games, prisoner, stag;

  module.exports = games = [];

  prisoner = {};

  prisoner.name = 'Prisoner\'s Dilemma';

  prisoner.cc = 3;

  prisoner.cd = 0;

  prisoner.dc = 5;

  prisoner.dd = 1;

  games.push(prisoner);

  chicken = {};

  chicken.name = 'Chicken';

  chicken.cc = 3;

  chicken.cd = 4;

  chicken.dc = 6;

  chicken.dd = 1;

  games.push(chicken);

  stag = {};

  stag.name = 'Stag Hunt';

  stag.cc = 4;

  stag.cd = -5;

  stag.dc = 3;

  stag.dd = 2;

  games.push(stag);

}).call(this);

},{}],12:[function(require,module,exports){
(function() {
  var Evolutionary, Tournament, b,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tournament = require('./tournament');

  b = require('./../browser');

  module.exports = Evolutionary = (function(_super) {
    __extends(Evolutionary, _super);

    function Evolutionary(games, agents, results) {
      this.results = results;
      Evolutionary.__super__.constructor.call(this, games, agents);
    }

    Evolutionary.prototype.start = function() {
      var allsame, div, finalResults, game, generation, i, key, key1, key2, numOfAgents, percentage, percentage_new, score, val, _i, _j, _k, _l, _len, _len1, _len2, _m, _n, _o, _p, _q, _r, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _results, _s, _t;
      numOfAgents = this.getAgents().length;
      _ref = this.getGames();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        game = _ref[_i];
        finalResults = [];
        b.h2(game.name + ' game');
        percentage = [];
        for (key1 = _j = 0, _ref1 = numOfAgents - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; key1 = 0 <= _ref1 ? ++_j : --_j) {
          percentage.push(1 / numOfAgents);
          finalResults.push([]);
        }
        for (generation = _k = 0; _k <= 1000; generation = ++_k) {
          for (key = _l = 0, _len1 = percentage.length; _l < _len1; key = ++_l) {
            val = percentage[key];
            finalResults[key][generation] = val;
          }
          percentage_new = [];
          for (key1 = _m = 0, _ref2 = numOfAgents - 1; 0 <= _ref2 ? _m <= _ref2 : _m >= _ref2; key1 = 0 <= _ref2 ? ++_m : --_m) {
            percentage_new.push(0);
          }
          score = [];
          for (key1 = _n = 0, _ref3 = numOfAgents - 1; 0 <= _ref3 ? _n <= _ref3 : _n >= _ref3; key1 = 0 <= _ref3 ? ++_n : --_n) {
            score.push(0);
          }
          for (key1 = _o = 0, _ref4 = numOfAgents - 1; 0 <= _ref4 ? _o <= _ref4 : _o >= _ref4; key1 = 0 <= _ref4 ? ++_o : --_o) {
            for (key2 = _p = 0, _ref5 = numOfAgents - 1; 0 <= _ref5 ? _p <= _ref5 : _p >= _ref5; key2 = 0 <= _ref5 ? ++_p : --_p) {
              score[key1] += percentage[key2] * this.results[game.name][key1][key2];
            }
          }
          for (key1 = _q = 0, _ref6 = numOfAgents - 1; 0 <= _ref6 ? _q <= _ref6 : _q >= _ref6; key1 = 0 <= _ref6 ? ++_q : --_q) {
            div = 0;
            for (key2 = _r = 0, _ref7 = numOfAgents - 1; 0 <= _ref7 ? _r <= _ref7 : _r >= _ref7; key2 = 0 <= _ref7 ? ++_r : --_r) {
              div += percentage[key2] * score[key2];
            }
            percentage_new[key1] = (percentage[key1] * score[key1]) / div;
          }
          allsame = true;
          for (i = _s = 0, _ref8 = percentage_new.length - 1; 0 <= _ref8 ? _s <= _ref8 : _s >= _ref8; i = 0 <= _ref8 ? ++_s : --_s) {
            if (Math.abs(percentage[i] - percentage_new[i]) > 0.001) {
              allsame = false;
              break;
            }
          }
          if (allsame) {
            break;
          }
          percentage = [];
          for (_t = 0, _len2 = percentage_new.length; _t < _len2; _t++) {
            val = percentage_new[_t];
            percentage.push(val);
          }
        }
        _results.push(this.printFinalScore(finalResults));
      }
      return _results;
    };

    Evolutionary.prototype.printFinalScore = function(finalResults) {
      var color, colors, data, key, line, mod, result, val, _i, _j, _k, _l, _len, _len1, _len2, _len3, _results;
      data = {};
      data.datasets = [];
      for (key = _i = 0, _len = finalResults.length; _i < _len; key = ++_i) {
        result = finalResults[key];
        data.labels = [];
        line = {};
        line.pointStrokeColor = "#111";
        line.pointHighlightFill = "#fff";
        line.label = this.getAgents()[key].engine.getName();
        line.data = [];
        mod = 1;
        if (result.length > 25) {
          mod = Math.round(result.length / 25);
        }
        for (key = _j = 0, _len1 = result.length; _j < _len1; key = ++_j) {
          val = result[key];
          if (key % mod !== 0) {
            continue;
          }
          line.data.push(Math.round(val * 100));
          data.labels.push('Generation ' + key);
        }
        data.datasets.push(line);
      }
      colors = ['77,77,77', '93,165,218', '250,164,58', '96,189,104', '241,88,84', '222,207,63', '241,124,176'];
      for (key = _k = 0, _len2 = colors.length; _k < _len2; key = ++_k) {
        color = colors[key];
        data.datasets[key].fillColor = "rgba(" + color + ",0.2)";
        data.datasets[key].strokeColor = "rgba(" + color + ",1)";
        data.datasets[key].pointColor = "rgba(" + color + ",1)";
        data.datasets[key].pointHighlightStroke = "rgba(" + color + ",1)";
      }
      b.linechart(data);
      _results = [];
      for (key = _l = 0, _len3 = colors.length; _l < _len3; key = ++_l) {
        color = colors[key];
        _results.push(b.chartlabel(this.getAgents()[key].engine.getName(), color));
      }
      return _results;
    };

    return Evolutionary;

  })(Tournament);

}).call(this);

},{"./../browser":9,"./tournament":14}],13:[function(require,module,exports){
(function() {
  var RoundRobin, Tournament, b,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tournament = require('./tournament');

  b = require('./../browser');

  module.exports = RoundRobin = (function(_super) {
    __extends(RoundRobin, _super);

    function RoundRobin(games, agents, rounds, averaging) {
      this.rounds = rounds != null ? rounds : 1000;
      this.averaging = averaging != null ? averaging : 5;
      RoundRobin.__super__.constructor.call(this, games, agents);
      this.forEvResults = {};
      this.initFinalScore();
    }

    RoundRobin.prototype.start = function() {
      var agent1, agent2, col, counter, game, newrow, rep, round, row, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _n, _o, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _results;
      _ref = this.getGames();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        game = _ref[_i];
        b.h2(game.name + ' game');
        b.print(this.rounds * this.averaging * this.getAgents().length * this.getAgents().length + ' games have been played.');
        counter = 1;
        this.forEvResults[game.name] = [];
        _ref1 = this.getAgents();
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          agent1 = _ref1[_j];
          _ref2 = this.getAgents();
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            agent2 = _ref2[_k];
            for (rep = _l = 1, _ref3 = this.averaging; 1 <= _ref3 ? _l <= _ref3 : _l >= _ref3; rep = 1 <= _ref3 ? ++_l : --_l) {
              for (round = _m = 1, _ref4 = this.rounds; 1 <= _ref4 ? _m <= _ref4 : _m >= _ref4; round = 1 <= _ref4 ? ++_m : --_m) {
                this.fight(game, agent1, agent2);
              }
              this.resetAgents();
            }
            this.finalScore[agent1.id][agent2.id] /= this.averaging;
            this.finalScore[agent1.id][agent2.id] = Math.round(this.finalScore[agent1.id][agent2.id]);
          }
        }
        this.printFinalScore();
        _ref5 = this.finalScore;
        for (_n = 0, _len3 = _ref5.length; _n < _len3; _n++) {
          row = _ref5[_n];
          newrow = [];
          for (_o = 0, _len4 = row.length; _o < _len4; _o++) {
            col = row[_o];
            newrow.push(col / this.rounds);
          }
          this.forEvResults[game.name].push(newrow);
        }
        _results.push(this.initFinalScore());
      }
      return _results;
    };

    RoundRobin.prototype.getFinalScoreForEvoTournament = function() {
      return this.forEvResults;
    };

    RoundRobin.prototype.fight = function(game, agent1, agent2) {
      var play1, play2;
      agent1.engine.setGame(game);
      agent2.engine.setGame(game);
      play1 = agent1.engine.play();
      play2 = agent2.engine.play();
      agent1.engine.opponentPlayed(play2);
      agent2.engine.opponentPlayed(play1);
      if (play1 === 'cooperate' && play2 === 'cooperate') {
        return this.finalScore[agent1.id][agent2.id] += game.cc;
      } else if (play1 === 'cooperate' && play2 === 'defect') {
        return this.finalScore[agent1.id][agent2.id] += game.cd;
      } else if (play1 === 'defect' && play2 === 'cooperate') {
        return this.finalScore[agent1.id][agent2.id] += game.dc;
      } else {
        return this.finalScore[agent1.id][agent2.id] += game.dd;
      }
    };

    RoundRobin.prototype.initFinalScore = function() {
      var agent1, agent2, _i, _len, _ref, _results;
      this.finalScore = [];
      _ref = this.getAgents();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        agent1 = _ref[_i];
        this.finalScore[agent1.id] = [];
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = this.getAgents();
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            agent2 = _ref1[_j];
            _results1.push(this.finalScore[agent1.id][agent2.id] = 0);
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    RoundRobin.prototype.printFinalScore = function() {
      var agent, agent1, agent2, data, finalScoreCopy, i, key, labels, names, row, scores, sum, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4;
      scores = [];
      finalScoreCopy = [];
      for (i = _i = 0, _ref = this.finalScore.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        finalScoreCopy[i] = this.finalScore[i].slice();
      }
      _ref1 = this.getAgents();
      for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
        agent1 = _ref1[_j];
        sum = 0;
        _ref2 = this.getAgents();
        for (_k = 0, _len1 = _ref2.length; _k < _len1; _k++) {
          agent2 = _ref2[_k];
          sum += finalScoreCopy[agent1.id][agent2.id];
        }
        finalScoreCopy[agent1.id].push(sum);
        finalScoreCopy[agent1.id].push((sum / (this.getAgents().length * this.rounds)).toFixed(3));
        scores.push(sum);
      }
      for (key = _l = 0, _len2 = finalScoreCopy.length; _l < _len2; key = ++_l) {
        row = finalScoreCopy[key];
        row.unshift(this.getAgents()[key].engine.name);
      }
      names = [''];
      _ref3 = this.getAgents();
      for (_m = 0, _len3 = _ref3.length; _m < _len3; _m++) {
        agent = _ref3[_m];
        names.push(agent.engine.name);
      }
      names.push('Results');
      names.push('Results average');
      finalScoreCopy.unshift(names);
      b.table(finalScoreCopy);
      labels = [];
      _ref4 = this.getAgents();
      for (_n = 0, _len4 = _ref4.length; _n < _len4; _n++) {
        agent = _ref4[_n];
        labels.push(agent.engine.name);
      }
      data = {
        labels: labels,
        datasets: [
          {
            label: "Final scores",
            fillColor: "rgba(130, 209, 138, 1)",
            strokeColor: "rgba(0,0,0,0.8)",
            data: scores
          }
        ]
      };
      return b.barchart(data);
    };

    return RoundRobin;

  })(Tournament);

}).call(this);

},{"./../browser":9,"./tournament":14}],14:[function(require,module,exports){
(function() {
  var Tournament;

  module.exports = Tournament = (function() {
    function Tournament(games, agents) {
      this.games = games;
      this.agents = agents;
    }

    Tournament.prototype.getGames = function() {
      return this.games;
    };

    Tournament.prototype.getAgents = function() {
      return this.agents;
    };

    Tournament.prototype.resetAgents = function() {
      var agent, _i, _len, _ref, _results;
      _ref = this.agents;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        agent = _ref[_i];
        agent.score = 0;
        _results.push(agent.engine.reset());
      }
      return _results;
    };

    return Tournament;

  })();

}).call(this);

},{}]},{},[10])