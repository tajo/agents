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
agents.push {engine: new TitForTat, score: 0}
agents.push {engine: new TitFor2Tats, score: 0}
agents.push {engine: new AlwaysCooperate, score: 0}
agents.push {engine: new AlwaysDefect, score: 0}
agents.push {engine: new Random, score: 0}
agents.push {engine: new Maximin, score: 0}
agents.push {engine: new WinStayLoseShift, score: 0}
agent.id = key for agent, key in agents

rounds = 1000
averaging = 5
b.h1 'Round-robin tournament, ' +  rounds + ' rounds, averaging ' + averaging
roundRobin = new RoundRobin games, agents, rounds, averaging
do roundRobin.start
