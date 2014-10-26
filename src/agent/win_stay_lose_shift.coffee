###*
 * Win-stay, lose-shift - This algorithm begins by playing cooperate,
 * and then repeats the action it played in the previous round if its
 * last payoff was greater than or equal to its average payoff in the
 * game (2.25 in the prisoner’s dilemma, 3.5 in chicken, and 1.0 in
 * the stag hunt).
###

Agent = require './agent'

module.exports = class WinStayLoseShift extends Agent
	constructor: () ->
		super()
		@setName 'Win-stay, Lose-shift'
		@avgPayoff = 0;
		@myLastMove = 'cooperate'

	play: ->
		return 'cooperate' if @getHistory().length is 0

		# get my last payoff
		if @getPreviousMove() is 'cooperate'
			lastPayOff = @getGame().dc
			if @myLastMove is 'cooperate'
				lastPayOff = @getGame().cc
		else
			lastPayOff = @getGame().dd
			if @myLastMove is 'cooperate'
				lastPayOff = @getGame().cd

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

	reset: ->
		super()
		@avgPayoff = 0
		@myLastMove = 'cooperate'

