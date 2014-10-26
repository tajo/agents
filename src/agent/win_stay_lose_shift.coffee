Agent = require './agent'

module.exports = class WinStayLoseShift extends Agent
	constructor: () ->
		super()
		@setName 'Win-stay, Lose-shift'
		@p = 0.5
		@avg_payoff = 0;
		@myLastMove = 'cooperate'

	play: ->
		return 'cooperate' if @getHistory().length is 0

		# get my last payoff
		if @getPreviousMove() is 'cooperate'
			lastPayOff = @getGame().cd
			if @myLastMove is 'cooperate'
				lastPayOff = @getGame().cc
		else
			lastPayOff = @getGame().dd
			if @myLastMove is 'cooperate'
				lastPayOff = @getGame().dc

		# if my last payoff was above the game avg
		return @myLastMove if lastPayOff >= @avgPayoff

		# ... otherwise, switch a move
		if @myLastMove is 'cooperate'
			@myLastMove = 'defect'
		else
			@myLastMove = 'cooperate'
		return @myLastMove

	setGame: (game) ->
		super game
		@avgPayoff = (game.cc + game.dc + game.cd + game.dd)/4

