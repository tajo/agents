module.exports = class Agent
	constructor: () ->
		@history = []
		@name = 'Agent'
		@game = {'name':'default'}
	play: -> return
	opponentPlayed: (move) -> @history.push move
	setName: (@name) ->
	getName: -> @name
	getPreviousMove: ->
		return @history[-1..][0] if @history.length > 0
		return 'cooperate'
	getHistory: -> @history
	setGame: (@game) ->
	getGame: -> @game
	reset: ->
		@setGame {'name':'default'}
		@history = []