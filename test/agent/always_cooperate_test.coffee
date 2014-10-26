AlwaysCooperate = require './../../src/agent/always_cooperate'

describe 'always cooperate agent', ->

	describe 'name', ->
		it 'should be Always Cooperate', ->
			alwaysCooperate = new AlwaysCooperate
			alwaysCooperate.getName().should.equal 'Always Cooperate'

	describe 'strategy', ->
		it 'should always cooperate', ->
			alwaysCooperate = new AlwaysCooperate
			alwaysCooperate.play().should.equal 'cooperate' for i in [0..10]

