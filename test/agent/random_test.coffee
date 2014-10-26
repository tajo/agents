Random = require './../../src/agent/random'

describe 'random agent', ->

	describe 'name', ->
		it 'should be Random', ->
			random = new Random
			random.getName().should.equal 'Random'

	describe 'strategy', ->
		it 'should be random', ->
			random = new Random
			cooperate = 0
			defect = 0
			for i in [0..1000]
				result = random.play()
				cooperate++ if result is 'cooperate'
				defect++ if result is 'defect'
			Math.abs(cooperate-defect).should.be.below 100


