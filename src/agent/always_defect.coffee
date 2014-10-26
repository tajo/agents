Agent = require './agent'

module.exports = class AlwaysDefect extends Agent
	constructor: () ->
		super()
		@setName 'Always Defect'

	play: -> return 'defect'

