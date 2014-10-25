module.exports = class AlwaysDefect
	constructor: () ->
		@name = 'Always Defect'
	play: -> return 'defect'
	opponentPlayed: (@history) ->
	getName: -> @name
