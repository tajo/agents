Agent = require './../../src/agent/agent'

describe 'basic agent', ->

	describe 'name', ->
		it 'should be Agent', ->
			agent = new Agent
			agent.getName().should.equal 'Agent'
		it 'should set a name', ->
			agent = new Agent
			agent.setName 'Test'
			agent.getName().should.equal 'Test'

	describe 'history', ->
		it 'should be empty', ->
			agent = new Agent
			agent.getHistory().length.should.equal 0

		it 'should return cooperate if empty', ->
			agent = new Agent
			agent.getPreviousMove().should.equal 'cooperate'

		it 'should save a move', ->
			agent = new Agent
			agent.opponentPlayed 'defect'
			agent.getPreviousMove().should.equal 'defect'

		it 'should save multiple moves', ->
			agent = new Agent
			agent.opponentPlayed 'defect'
			agent.opponentPlayed 'defect'
			agent.opponentPlayed 'cooperate'
			agent.getHistory().length.should.equal 3

	describe 'game', ->
		it 'should save a game', ->
			agent = new Agent
			test = {}
			test.name = 'Test'
			test.cc = 3
			test.cd = 0
			test.dc = 5
			test.dd = 1
			agent.setGame test
			agent.getGame().name.should.equal 'Test'
			agent.getGame().cc.should.equal 3
			agent.getGame().cd.should.equal 0
			agent.getGame().dc.should.equal 5
			agent.getGame().dd.should.equal 1

	describe 'reset', ->
		it 'should delete history', ->
			agent = new Agent
			agent.opponentPlayed 'defect'
			do agent.reset
			agent.getHistory().length.should.equal 0

		it 'should change the name to Agent', ->
			agent = new Agent
			agent.setName 'Test'
			do agent.reset
			agent.getName().should.equal 'Agent'

		it 'should unset the game', ->
			agent = new Agent
			agent.setGame {name:'foo'}
			do agent.reset
			agent.getGame().name.should.equal 'default'




