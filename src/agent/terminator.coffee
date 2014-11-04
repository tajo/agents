Agent = require './agent'

module.exports = class Terminator extends Agent
	constructor: () ->
		super()
		@setName 'Terminator'
		@playingAgainstAC = false
		@playingAgainstAD = false

	play: ->
		if @getGame().name isnt 'Stag Hunt'
			return 'defect' if @getHistory().length < 3
			if @getHistory().length is 3 and @getPreviousMove() is 'cooperate'
				@playingAgainstAC = true
			return 'defect' if @playingAgainstAC

		if @getGame().name isnt 'Chicken'
			return 'cooperate' if @getHistory().length < 6
			if @getHistory().length is 6 and @getPreviousMove() is 'defect'
				@playingAgainstAD = true
			return 'defect' if @playingAgainstAD

		return 'cooperate'

	reset: ->
		super()
		@playingAgainstAC = false
		@playingAgainstAD = false



