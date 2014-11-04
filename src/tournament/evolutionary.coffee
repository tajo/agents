Tournament = require './tournament'
b = require './../browser'

module.exports = class Evolutionary extends Tournament
	constructor: (games, agents, @results) ->
		super games, agents

	start: ->
		numOfAgents = @getAgents().length
		for game in @getGames()
			finalResults = []

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

				allsame = true
				for i in [0..percentage_new.length-1]
					if Math.abs(percentage[i]-percentage_new[i]) > 0.001
						allsame = false
						break

				if allsame
					break

				percentage = []
				percentage.push val for val in percentage_new
			@printFinalScore finalResults, game.name


	printFinalScore: (finalResults, game) ->
		b.h2 game + ' game (' + finalResults[0].length + ' generations)'
		data = {}
		data.datasets = []
		for result,key in finalResults
			data.labels = []
			line = {}
			line.pointStrokeColor = "#111"
			line.pointHighlightFill = "#fff"
			line.label = @getAgents()[key].engine.getName()
			line.data = []
			mod = 1
			if result.length > 25
				mod = Math.round(result.length / 25)

			for val, key in result
				continue unless key % mod is 0
				line.data.push Math.round(val*100)
				data.labels.push 'Generation '+ (key+1)
			data.datasets.push line
		colors = ['77,77,77','93,165,218','250,164,58','96,189,104','241,88,84','222,207,63','241,124,176','165,42,42']
		for color, key in colors
			data.datasets[key].fillColor = "rgba("+color+",0.2)"
			data.datasets[key].strokeColor = "rgba("+color+",1)"
			data.datasets[key].pointColor = "rgba("+color+",1)"
			data.datasets[key].pointHighlightStroke = "rgba("+color+",1)"
		b.linechart data
		names = []
		for agent, key in @getAgents()
			names.push agent.engine.getName() + ' <div style="float: right">' +  Math.round(finalResults[key][finalResults[key].length-1]*100) + '%</div>'
		b.chartlabel names, colors



