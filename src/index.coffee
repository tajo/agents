b = require './browser'

# Games
games = require './games.coffee'

# Agents
TitForTat = require './agent/tit_for_tat'
TitFor2Tats = require './agent/tit_for_2_tats'
AlwaysDefect = require './agent/always_defect'
AlwaysCooperate = require './agent/always_cooperate'
Random = require './agent/random'
Maximin = require './agent/maximin'
WinStayLoseShift = require './agent/win_stay_lose_shift'

# Tournaments
RoundRobin = require './tournament/round_robin'

# Agents initialization
agents = []
agents.push {engine: new TitForTat}
agents.push {engine: new TitFor2Tats}
agents.push {engine: new AlwaysCooperate}
agents.push {engine: new AlwaysDefect}
agents.push {engine: new Random}
agents.push {engine: new Maximin}
agents.push {engine: new WinStayLoseShift}
agent.id = key for agent, key in agents

b.print '<a href="https://github.com/tajo/playground" target="_blank"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>', false
rounds = 1000
averaging = 5
b.h1 'Round-robin tournament, ' +  rounds + ' rounds, averaging ' + averaging
roundRobin = new RoundRobin games, agents, rounds, averaging
do roundRobin.start
