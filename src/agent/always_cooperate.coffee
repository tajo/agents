Agent = require './agent'

module.exports = class AlwaysCooperate extends Agent
	constructor: () ->
		super()
		@setName 'Always Cooperate'

	play: -> return 'cooperate'

