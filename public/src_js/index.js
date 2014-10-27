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

}).call(this);

},{}],10:[function(require,module,exports){
(function() {
  var AlwaysCooperate, AlwaysDefect, Maximin, Random, RoundRobin, TitFor2Tats, TitForTat, WinStayLoseShift, agent, agents, averaging, b, games, key, roundRobin, rounds, _i, _len;

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

  b.print('<a href="https://github.com/tajo/playground" target="_blank"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>', false);

  rounds = 1000;

  averaging = 5;

  b.h1('Round-robin tournament, ' + rounds + ' rounds, averaging ' + averaging);

  roundRobin = new RoundRobin(games, agents, rounds, averaging);

  roundRobin.start();

}).call(this);

},{"./agent/always_cooperate":2,"./agent/always_defect":3,"./agent/maximin":4,"./agent/random":5,"./agent/tit_for_2_tats":6,"./agent/tit_for_tat":7,"./agent/win_stay_lose_shift":8,"./browser":9,"./games.coffee":11,"./tournament/round_robin":12}],11:[function(require,module,exports){
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
      this.initFinalScore();
    }

    RoundRobin.prototype.start = function() {
      var agent1, agent2, counter, game, progress, rep, round, _i, _j, _k, _l, _len, _len1, _len2, _m, _ref, _ref1, _ref2, _ref3, _ref4, _results;
      _ref = this.getGames();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        game = _ref[_i];
        b.h2(game.name + ' game');
        progress = new b.progress(this.rounds * this.averaging * this.getAgents().length * this.getAgents().length, '#00f', ' games have been played.');
        counter = 1;
        _ref1 = this.getAgents();
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          agent1 = _ref1[_j];
          _ref2 = this.getAgents();
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            agent2 = _ref2[_k];
            for (rep = _l = 1, _ref3 = this.averaging; 1 <= _ref3 ? _l <= _ref3 : _l >= _ref3; rep = 1 <= _ref3 ? ++_l : --_l) {
              for (round = _m = 1, _ref4 = this.rounds; 1 <= _ref4 ? _m <= _ref4 : _m >= _ref4; round = 1 <= _ref4 ? ++_m : --_m) {
                this.fight(game, agent1, agent2);
                progress.update(counter);
                counter++;
              }
              this.resetAgents();
            }
            this.finalScore[agent1.id][agent2.id] /= this.averaging;
          }
        }
        this.printFinalScore();
        _results.push(this.initFinalScore());
      }
      return _results;
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
      var agent, agent1, agent2, finalScoreCopy, i, key, names, row, sum, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref, _ref1, _ref2, _ref3;
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
      finalScoreCopy.unshift(names);
      return b.table(finalScoreCopy);
    };

    return RoundRobin;

  })(Tournament);

}).call(this);

},{"./../browser":9,"./tournament":13}],13:[function(require,module,exports){
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