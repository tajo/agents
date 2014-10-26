Agent = require './agent'

module.exports = class TitFor2Tats extends Agent
	constructor: () ->
		super()
		@setName 'Tit for 2 tats'

	play: ->
		h = @getHistory()
		if h.length > 1 and h[-1..] is 'defect' and h[-2..] is 'defect'
			return 'defect'
		return 'cooperate'


