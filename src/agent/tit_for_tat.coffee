Agent = require './agent'

module.exports = class TitForTat extends Agent
	constructor: () ->
		super()
		@setName 'Tit for tat'

	play: ->
		return 'cooperate' if @getPreviousMove() is 'cooperate'
		return 'defect'


