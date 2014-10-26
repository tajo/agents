TitForTat = require './../../src/agent/tit_for_tat'

describe 'tit for tat agent', ->

	describe 'name', ->
		it 'should be Tit for tat', ->
			titForTat = new TitForTat
			titForTat.getName().should.equal 'Tit for tat'

	describe 'strategy', ->
		it 'should start with cooperate', ->
			titForTat = new TitForTat
			titForTat.play().should.equal 'cooperate'

		it 'should be cooperate if opponent cooperated', ->
			titForTat = new TitForTat
			titForTat.opponentPlayed 'cooperate'
			titForTat.play().should.equal 'cooperate'

		it 'should be defect if opponent defected', ->
			titForTat = new TitForTat
			titForTat.opponentPlayed 'defect'
			titForTat.play().should.equal 'defect'
