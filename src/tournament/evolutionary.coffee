Tournament = require './tournament'
b = require './../browser'

module.exports = class Evolutionary extends Tournament
	constructor: (games, agents, @results) ->
		super games, agents

	start: ->
		numOfAgents = @getAgents().length
		for game in @getGames()
			finalResults = []
			b.h2  game.name + ' game'

			percentage = []
			for key1 in [0..numOfAgents-1]
				percentage.push 1/numOfAgents
				finalResults.push []

			for generation in [0..1000]
				finalResults[key][generation] = val for val,key in percentage

				percentage_new = []
				percentage_new.push 0 for key1 in [0..numOfAgents-1]
				score = []
				score.push 0 for key1 in [0..numOfAgents-1]

				for key1 in [0..numOfAgents-1]
					for key2 in [0..numOfAgents-1]
						score[key1] += percentage[key2] * @results[game.name][key1][key2]

				for key1 in [0..numOfAgents-1]
					div = 0
					for key2 in [0..numOfAgents-1]
						div += percentage[key2] * score[key2]
					percentage_new[key1] = (percentage[key1]*score[key1])/div

				percentage = []
				percentage.push val for val in percentage_new
			@printFinalScore finalResults


	printFinalScore: (finalResults) ->
		console.log finalResults
		data = {}
		data.datasets = []
		for result,key in finalResults
			data.labels = []
			line = {}
			line.pointStrokeColor = "#111"
			line.pointHighlightFill = "#fff"
			line.label = @getAgents()[key].engine.getName()
			line.data = []
			for val, key in result
				continue unless key % 100 is 0
				line.data.push Math.round(val*100)
				data.labels.push 'Generation '+ key
			data.datasets.push line
		console.log data
		colors = ['77,77,77','93,165,218','250,164,58','96,189,104','241,88,84','222,207,63','241,124,176']
		for color, key in colors
			data.datasets[key].fillColor = "rgba("+color+",0.2)"
			data.datasets[key].strokeColor = "rgba("+color+",1)"
			data.datasets[key].pointColor = "rgba("+color+",1)"
			data.datasets[key].pointHighlightStroke = "rgba("+color+",1)"
		b.linechart data


