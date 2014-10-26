Maximin = require './../../src/agent/maximin'

describe 'maximin agent', ->

	describe 'name', ->
		it 'should be Maximin', ->
			maximin = new Maximin
			maximin.getName().should.equal 'Maximin'

	describe 'strategy', ->
		it 'should be random without a set game', ->
			maximin = new Maximin
			cooperate = 0
			defect = 0
			for i in [0..1000]
				result = maximin.play()
				cooperate++ if result is 'cooperate'
				defect++ if result is 'defect'
			Math.abs(cooperate-defect).should.be.below 100

		it 'should be 1/3 times cooperate and 2/3 times defect', ->
			maximin = new Maximin
			test = {}
			test.name = 'Test'
			test.cc = 2
			test.cd = 0
			test.dc = 0
			test.dd = 1
			maximin.setGame test

			cooperate = 0
			defect = 0
			for i in [0..1000]
				result = maximin.play()
				cooperate++ if result is 'cooperate'
				defect++ if result is 'defect'
			Math.abs(cooperate).should.be.below 400
			Math.abs(cooperate).should.be.above 200

		it 'should be always defect', ->
			maximin = new Maximin
			test = {}
			test.name = 'Test'
			test.cc = 4
			test.cd = 0
			test.dc = 3
			test.dd = 2
			maximin.setGame test

			cooperate = 0
			defect = 0
			for i in [0..10]
				result = maximin.play()
				cooperate++ if result is 'cooperate'
				defect++ if result is 'defect'
			Math.abs(cooperate).should.be.equal 0

	describe 'reset', ->
		it 'should delete history', ->
			maximin = new Maximin
			maximin.opponentPlayed 'defect'
			do maximin.reset
			maximin.getHistory().length.should.equal 0

		it 'should set strategy to 1/2', ->
			maximin = new Maximin
			test = {}
			test.name = 'Test'
			test.cc = 4
			test.cd = 0
			test.dc = 3
			test.dd = 2
			maximin.setGame test

			do maximin.reset

			cooperate = 0
			defect = 0
			for i in [0..1000]
				result = maximin.play()
				cooperate++ if result is 'cooperate'
				defect++ if result is 'defect'
			Math.abs(cooperate-defect).should.be.below 100


