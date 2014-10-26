module.exports = class Tournament
	constructor: (@games, @agents) ->
	getGames: -> @games
	getAgents: -> @agents
	resetAgents: ->
		for agent in @agents
			agent.score = 0
			do agent.engine.reset




