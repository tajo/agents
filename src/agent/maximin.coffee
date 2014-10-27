Agent = require './agent'

module.exports = class Maximin extends Agent
	constructor: () ->
		super()
		@setName 'Maximin'
		@p = 0.5 #plays random till the game is set and maximin strategy counted

	play: ->
		return 'cooperate' if Math.random() < @p
		return 'defect'

	setGame: (game) ->
		super game
		@p = (game.dd - game.cd)/(game.cc - game.cd - game.dc + game.dd)

	reset: ->
		super()
		@p = 0.5

