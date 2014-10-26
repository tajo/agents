module.exports = class Agent
	constructor: () ->
		@history = []
		@name = 'Agent'
	play: -> return
	opponentPlayed: (move) -> @history.push move
	setName: (@name) ->
	getName: -> @name
	getPreviousMove: ->
		return @history[-1..] if @history.length > 0
		return 'cooperate'
	getHistory: -> @history
	setGame: (@game) ->
	getGame: -> @game
