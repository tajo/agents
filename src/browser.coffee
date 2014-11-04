markdown = require( "markdown" ).markdown

module.exports.escapeHtml = (html) ->
	map =
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  html.replace /[&<>"']/g, (m) ->
  		map[m]

module.exports.print = (value, escaped = true) ->
	div = document.createElement 'div'
	value = module.exports.escapeHtml value if escaped
	div.innerHTML = value
	document.body.appendChild div
	return div

module.exports.code = (value, escaped = true) ->
	div = document.createElement 'pre'
	value = module.exports.escapeHtml value if escaped
	div.innerHTML = value
	document.body.appendChild div

module.exports.reset = ->
	document.body.innerHTML = ''

module.exports.h1 = (value) ->
	h1 = document.createElement 'h1'
	h1.innerHTML = value
	document.body.appendChild h1

module.exports.h2 = (value) ->
	h2 = document.createElement 'h2'
	h2.innerHTML = value
	document.body.appendChild h2

module.exports.h3 = (value) ->
	h3 = document.createElement 'h3'
	h3.innerHTML = value
	document.body.appendChild h3

module.exports.image = (src) ->
	img = document.createElement 'img'
	img.setAttribute 'src', src
	document.body.appendChild img

module.exports.list = (list) ->
	ul = document.createElement 'ul'
	for i in [0..list.length-1]
		li = document.createElement 'li'
		li.appendChild document.createTextNode list[i]
		ul.appendChild li
	document.body.appendChild ul

module.exports.hr = ->
	document.body.appendChild document.createElement 'hr'

module.exports.table = (matrix) ->
	tbl = document.createElement 'table'
	tbdy = document.createElement 'tbody'
	for i in [0..matrix.length-1]
		tr = document.createElement 'tr'
		row = matrix[i];
		for j in [0..row.length-1]
			td = document.createElement 'td'
			td.appendChild document.createTextNode row[j]
			tr.appendChild td
		tbdy.appendChild tr
	tbl.appendChild tbdy
	document.body.appendChild tbl

module.exports.progress = class Progress
	constructor: (@max, @color = '#00f', @description = 'is finished.') ->
		@element = document.createElement 'div'
		@bar = document.createElement 'div'
		@bar.className = 'progress-bar'
		@caption = document.createElement 'div'

		document.body.appendChild @element
		@element.appendChild @bar
		@element.appendChild @caption
		@update 0

	update: (@value) ->
		@caption.innerHTML = @value + ' / ' + @max + ' ' + @description
		@bar.style.width = "#{(@value / @max) * 100}%"
		@bar.style['background-color'] = @color

	getValue: -> @value

module.exports.barchart = (data, options = null) ->
	canvas = document.createElement 'canvas'
	canvas.id = module.exports.guid()
	canvas.width  = 600
	canvas.height = 400
	document.body.appendChild canvas
	if !options
		options = {
			scaleFontSize: 14
			scaleFontFamily: 'Arial'
			animationSteps: 200
			scaleLineColor: "rgba(0,0,0,.4)"
		}
	new Chart(canvas.getContext("2d")).Bar(data, options)

module.exports.linechart = (data, options = null) ->
	canvas = document.createElement 'canvas'
	canvas.id = module.exports.guid()
	canvas.width  = 800
	canvas.height = 400
	document.body.appendChild canvas
	if !options
		options = {
			scaleFontSize: 14
			scaleFontFamily: 'Arial'
			bezierCurve : false
		}
	new Chart(canvas.getContext("2d")).Line(data, options)

module.exports.chartlabel = (names, colors) ->

	div = document.createElement 'div'
	div.style.width = '200px'
	div.style.float = 'left'
	div.style.marginTop = '25px'
	for name, key in names
		innerDiv = document.createElement 'div'
		innerDiv.style.padding = '3px'
		innerDiv.style.margin = '2px'
		innerDiv.style.color = 'white'
		innerDiv.style.backgroundColor = 'rgb(' + colors[key] + ')'
		innerDiv.innerHTML = name
		div.appendChild innerDiv
	document.body.appendChild div
	return div

module.exports.guid = -> 'guid' + Date.now()

module.exports.md = (value) ->
	div = document.createElement 'div'
	div.innerHTML = markdown.toHTML value
	div.className = 'markdown'
	document.body.appendChild div
	return div


