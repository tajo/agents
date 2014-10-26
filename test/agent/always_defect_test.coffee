AlwaysDefect = require './../../src/agent/always_defect'

describe 'always defect agent', ->

	describe 'name', ->
		it 'should be Always Defect', ->
			alwaysDefect = new AlwaysDefect
			alwaysDefect.getName().should.equal 'Always Defect'

	describe 'strategy', ->
		it 'should always defect', ->
			alwaysDefect = new AlwaysDefect
			alwaysDefect.play().should.equal 'defect' for i in [0..10]

