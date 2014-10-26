b = require './browser'
games = require './games.coffee'

# Agents
TitForTat = require './agent/tit_for_tat'
TitFor2Tats = require './agent/tit_for_2_tats'
AlwaysDefect = require './agent/always_defect'
AlwaysCooperate = require './agent/always_cooperate'
Random = require './agent/random'
Maximin = require './agent/maximin'
WinStayLoseShift = require './agent/win_stay_lose_shift'

b.h1 'Agents'

agents = []
agents.push {engine: new TitForTat, score: 0}
agents.push {engine: new TitFor2Tats, score: 0}
agents.push {engine: new AlwaysCooperate, score: 0}
agents.push {engine: new AlwaysDefect, score: 0}
agents.push {engine: new Random, score: 0}
agents.push {engine: new Maximin, score: 0}
agents.push {engine: new WinStayLoseShift, score: 0}

b.h2 'Games'
for game in games
	for agent in agents
		for agent2 in agents

			b.print game.name + ': ' +
			        agent.engine.getName() + ' vs ' +
			        agent2.engine.getName()

			# let's play!
			agent.engine.setGame game
			agent2.engine.setGame game
			play = agent.engine.play()
			play2 = agent2.engine.play()

			# tell them what their buddy did play
			agent.engine.opponentPlayed play2
			agent2.engine.opponentPlayed play

			# give them score
			if play is 'cooperate' and play2 is 'cooperate'
				agent.score += game.cc
				agent2.score += game.cc
			else if play is 'cooperate' and play2 is 'defend'
				agent.score += game.cd
				agent2.score += game.dc
			else if play is 'defend' and play2 is 'cooperate'
				agent.score += game.dc
				agent2.score += game.cd
			else
				agent.score += game.dd
				agent2.score += game.dd

b.h2 'Scores'
table = []
table.push [agent.engine.getName(), agent.score] for agent in agents
b.table table
