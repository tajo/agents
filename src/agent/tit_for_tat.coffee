module.exports = class TitForTat
	constructor: () ->
		@history = 'cooperate'
		@name = 'Tit-for-tat'

	play: ->
		return 'cooperate' if @history is 'cooperate'
		return 'defect'

	opponentPlayed: (@history) ->
	getName: -> @name

