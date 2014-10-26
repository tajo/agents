TitFot2Tats = require './../../src/agent/tit_for_2_tats'

describe 'tit for 2 tats agent', ->

	describe 'name', ->
		it 'should be Tit for 2 tats', ->
			titFot2Tats = new TitFot2Tats
			titFot2Tats.getName().should.equal 'Tit for 2 tats'

	describe 'strategy', ->
		it 'should start with cooperate', ->
			titFot2Tats = new TitFot2Tats
			titFot2Tats.play().should.equal 'cooperate'

		it 'should be cooperate if opponent cooperated', ->
			titFot2Tats = new TitFot2Tats
			titFot2Tats.opponentPlayed 'cooperate'
			titFot2Tats.play().should.equal 'cooperate'

		it 'should be cooperate if opponent cooperated after many defects', ->
			titFot2Tats = new TitFot2Tats
			titFot2Tats.opponentPlayed 'defect'
			titFot2Tats.opponentPlayed 'defect'
			titFot2Tats.opponentPlayed 'defect'
			titFot2Tats.opponentPlayed 'cooperate'
			titFot2Tats.play().should.equal 'cooperate'

		it 'should be cooperate if opponent defected once in row', ->
			titFot2Tats = new TitFot2Tats
			titFot2Tats.opponentPlayed 'defect'
			titFot2Tats.play().should.equal 'cooperate'

		it 'should be cooperate if opponent cooperated and than defected once in row', ->
			titFot2Tats = new TitFot2Tats
			titFot2Tats.opponentPlayed 'cooperate'
			titFot2Tats.opponentPlayed 'defect'
			titFot2Tats.play().should.equal 'cooperate'

		it 'should be defect if opponent defected twice in row', ->
			titFot2Tats = new TitFot2Tats
			titFot2Tats.opponentPlayed 'cooperate'
			titFot2Tats.opponentPlayed 'defect'
			titFot2Tats.opponentPlayed 'defect'
			titFot2Tats.play().should.equal 'defect'
