b = require './browser'

TitForTat = require './agent/tit_for_tat'
AlwaysDefect = require './agent/always_defect'

b.h1 'Agents'

agents = []
agents.push {engine: new TitForTat, score: 0}
agents.push {engine: new AlwaysDefect, score: 0}

prisoner = {}
prisoner.cc = 3
prisoner.cd = 5
prisoner.dc = 0
prisoner.dd = 1

b.h2 'Games'

for agent in agents
	for agent2 in agents

		b.print agent.engine.getName() + ' vs ' + agent2.engine.getName()

		# let's play!
		play = agent.engine.play()
		play2 = agent2.engine.play()

		# tell them what their buddy did play
		agent.engine.opponentPlayed play2
		agent2.engine.opponentPlayed play

		# give them score
		if play is 'cooperate' and play2 is 'cooperate'
			agent.score += prisoner.cc
			agent2.score += prisoner.cc
		else if play is 'cooperate' and play2 is 'defend'
			agent.score += prisoner.dc
			agent2.score += prisoner.cd
		else if play is 'defend' and play2 is 'cooperate'
			agent.score += prisoner.cd
			agent2.score += prisoner.dc
		else
			agent.score += prisoner.dd
			agent2.score += prisoner.dd

b.h2 'Scores'
table = []
table.push [agent.engine.getName(), agent.score] for agent in agents
b.table table
