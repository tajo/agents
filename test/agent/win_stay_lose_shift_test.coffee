WinStayLoseShift = require './../../src/agent/win_stay_lose_shift'

describe 'win stay lose shift agent', ->

	describe 'name', ->
		it 'should be Win-stay, Lose-shift', ->
			winStayLoseShift = new WinStayLoseShift
			winStayLoseShift.getName().should.equal 'Win-stay, Lose-shift'

	describe 'strategy', ->
		it 'should start with cooperate', ->
			winStayLoseShift = new WinStayLoseShift
			winStayLoseShift.play().should.equal 'cooperate'

		it 'should be cooperate if opponent cooperated (prisoners dilemma)', ->
			winStayLoseShift = new WinStayLoseShift
			test = {}
			#avg score is 2.25
			test.name = 'Test'
			test.cc = 3
			test.cd = 0
			test.dc = 5
			test.dd = 1
			winStayLoseShift.setGame test
			winStayLoseShift.opponentPlayed 'cooperate'
			winStayLoseShift.play().should.equal 'cooperate'

		it 'should be defect if opponent defected (prisoners dilemma)', ->
			winStayLoseShift = new WinStayLoseShift
			test = {}
			#avg score is 2.25
			test.name = 'Test'
			test.cc = 3
			test.cd = 0
			test.dc = 5
			test.dd = 1
			winStayLoseShift.setGame test
			winStayLoseShift.opponentPlayed 'defect'
			winStayLoseShift.play().should.equal 'defect'

		it 'should be defect after opp played defect, coop and me coop, defect (prisoners dilemma)', ->
			winStayLoseShift = new WinStayLoseShift
			test = {}
			#avg score is 2.25
			test.name = 'Test'
			test.cc = 3
			test.cd = 0
			test.dc = 5
			test.dd = 1
			winStayLoseShift.setGame test
			winStayLoseShift.opponentPlayed 'defect'
			winStayLoseShift.play()
			winStayLoseShift.opponentPlayed 'cooperate'
			winStayLoseShift.play().should.equal 'defect'

		it 'should be cooperate after opp played defect, coop, defect and me coop, defect and defect (prisoners dilemma)', ->
			winStayLoseShift = new WinStayLoseShift
			test = {}
			#avg score is 2.25
			test.name = 'Test'
			test.cc = 3
			test.cd = 0
			test.dc = 5
			test.dd = 1
			winStayLoseShift.setGame test
			winStayLoseShift.opponentPlayed 'defect'
			winStayLoseShift.play()
			winStayLoseShift.opponentPlayed 'cooperate'
			winStayLoseShift.play()
			winStayLoseShift.opponentPlayed 'defect'
			winStayLoseShift.play().should.equal 'cooperate'

	describe 'reset', ->
		it 'should delete the history', ->
			winStayLoseShift = new WinStayLoseShift
			winStayLoseShift.opponentPlayed 'cooperate'
			do winStayLoseShift.reset
			winStayLoseShift.getHistory().length.should.equal 0

		it 'should set the average payoff to 0', ->
			winStayLoseShift = new WinStayLoseShift
			test = {}
			test.name = 'Test'
			test.cc = 3
			test.cd = 0
			test.dc = 5
			test.dd = 1
			winStayLoseShift.setGame test
			winStayLoseShift.opponentPlayed 'cooperate'
			winStayLoseShift.play()

			do winStayLoseShift.reset
			winStayLoseShift.avgPayoff.should.equal 0

		it 'should set the agents last move to cooperate', ->
			winStayLoseShift = new WinStayLoseShift
			test = {}
			test.name = 'Test'
			test.cc = 3
			test.cd = 0
			test.dc = 5
			test.dd = 1
			winStayLoseShift.setGame test
			winStayLoseShift.opponentPlayed 'defect'
			winStayLoseShift.play()
			winStayLoseShift.opponentPlayed 'cooperate'
			winStayLoseShift.play()

			do winStayLoseShift.reset
			winStayLoseShift.myLastMove.should.equal 'cooperate'
