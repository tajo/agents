Tournament = require './tournament'
b = require './../browser'

module.exports = class RoundRobin extends Tournament
	constructor: (games, agents, @rounds=1000, @averaging=5) ->
		super games, agents
		do @initFinalScore

	start: ->
		for game in @getGames()
			b.h2  game.name + ' game'
			progress = new b.progress @rounds * @averaging * @getAgents().length * @getAgents().length, '#00f', ' games have been played.'
			counter = 1
			for agent1 in @getAgents()
				for agent2 in @getAgents()
					for rep in [1..@averaging]
						for round in [1..@rounds]
							@fight game, agent1, agent2
							progress.update counter
							counter++;
						do @resetAgents
					@finalScore[agent1.id][agent2.id] /= @averaging
			do @printFinalScore
			do @initFinalScore

	fight: (game, agent1, agent2) ->
		# let's play!
		agent1.engine.setGame game
		agent2.engine.setGame game
		play1 = agent1.engine.play()
		play2 = agent2.engine.play()

		# tell them what their buddy did play
		agent1.engine.opponentPlayed play2
		agent2.engine.opponentPlayed play1

		# give them score
		if play1 is 'cooperate' and play2 is 'cooperate'
			@finalScore[agent1.id][agent2.id] += game.cc
		else if play1 is 'cooperate' and play2 is 'defect'
			@finalScore[agent1.id][agent2.id] += game.cd
		else if play1 is 'defect' and play2 is 'cooperate'
			@finalScore[agent1.id][agent2.id] += game.dc
		else
			@finalScore[agent1.id][agent2.id] += game.dd

	initFinalScore: ->
		@finalScore = []
		for agent1 in @getAgents()
			@finalScore[agent1.id] = []
			for agent2 in @getAgents()
				@finalScore[agent1.id][agent2.id] = 0

	printFinalScore: ->
		finalScoreCopy = []
		finalScoreCopy[i] = @finalScore[i].slice() for i in [0..@finalScore.length-1]
		for agent1 in @getAgents()
			sum = 0
			sum += finalScoreCopy[agent1.id][agent2.id] for agent2 in @getAgents()
			finalScoreCopy[agent1.id].push sum
		row.unshift @getAgents()[key].engine.name for row, key in finalScoreCopy
		names = ['']
		names.push agent.engine.name for agent in @getAgents()
		names.push 'Results'
		finalScoreCopy.unshift names
		b.table finalScoreCopy



