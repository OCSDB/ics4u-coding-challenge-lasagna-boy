var data;

var txt = '$$EXCLAMATIONS$$! they said as they jumped into their $$NOUN$$ and flew off with their $$ADJECTIVE$$ $$PLURALNOUNS$$.';

function setup() {
  noCanvas();
	
	Tabletop.init({
		key:
		callback: gotData,
		simpleSheet: true
	}
								
	var button = createButton('generateMadlib');
	button.mousePressed(generate);
}

function generate() {
	console.log('generate');
}

function gotData(data, tabletop) {
  console.log(data)
		data = stuff;
}
