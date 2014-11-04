Tournament = require './tournament'
b = require './../browser'

module.exports = class RoundRobin extends Tournament
	constructor: (games, agents, @rounds=1000, @averaging=5) ->
		super games, agents
		@forEvResults = {}
		do @initFinalScore

	start: ->
		for game in @getGames()
			b.h2  game.name + ' game'
			b.print  @rounds * @averaging * @getAgents().length * @getAgents().length + ' games have been played.'
			counter = 1
			@forEvResults[game.name] = []
			for agent1 in @getAgents()
				for agent2 in @getAgents()
					for rep in [1..@averaging]
						for round in [1..@rounds]
							@fight game, agent1, agent2
						do @resetAgents
					@finalScore[agent1.id][agent2.id] /= @averaging
					@finalScore[agent1.id][agent2.id]  = Math.round(@finalScore[agent1.id][agent2.id])
			@printFinalScore game.name

			for row in @finalScore
				newrow = []
				for col in row
					newrow.push col/@rounds
				@forEvResults[game.name].push newrow

			do @initFinalScore

	getFinalScoreForEvoTournament: -> @forEvResults

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

	printFinalScore: (game) ->
		scores = []
		finalScoreCopy = []
		finalScoreCopy[i] = @finalScore[i].slice() for i in [0..@finalScore.length-1]
		for agent1 in @getAgents()
			sum = 0
			sum += finalScoreCopy[agent1.id][agent2.id] for agent2 in @getAgents()
			finalScoreCopy[agent1.id].push sum
			finalScoreCopy[agent1.id].push (sum/(@getAgents().length*@rounds)).toFixed(3)
			scores.push sum
		row.unshift @getAgents()[key].engine.name for row, key in finalScoreCopy
		names = ['']
		names.push agent.engine.name for agent in @getAgents()
		names.push 'Results'
		names.push 'Results average'
		finalScoreCopy.unshift names
		b.table finalScoreCopy
		labels = []
		labels.push agent.engine.name for agent in @getAgents()
		data = {
			labels: labels
			datasets: [
				label: "Final scores"
				fillColor: "rgba(130, 209, 138, 1)"
				strokeColor: "rgba(0,0,0,0.8)"
				data: scores
			]
		}
		b.barchart data

		if game is 'Prisoner\'s Dilemma'
			b.md "My algorithm is called Terminator. He uses first few games to detect if he
			plays against the always cooperate algorithm. If so, he will always defect.
			If not, he always cooperate (there is no other meanie algorithm). That's enough
			to get an advantage over Tit-for-tat that would win otherwise."

		if game is 'Chicken'
			b.md "My algorithm is called Terminator. He uses first few games to detect if he
			plays against the always cooperate OR always defect algorithm. If so, he
			exploits them.
			If not, he always cooperate. That's enough
			to get an advantage over Win-stay, lose-shift that would win otherwise."

		if game is 'Stag Hunt'
			b.md "The Terminator is not able to exploit and outperform the Win-stay,lose-shift
			algorithm without lowering his score against Tit-for-tat. It would have to switch
			between cooperate and defect all the time, but that's very ineffective againts Tit-for-tats."



