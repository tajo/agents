Agent = require './agent'

module.exports = class Random extends Agent
	constructor: () ->
		super()
		@setName 'Random'

	play: ->
		return 'cooperate' if Math.random() < 0.5
		return 'defect'

