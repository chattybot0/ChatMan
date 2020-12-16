const brain = require("brain.js");
const fs = require("fs");
var outs = [];

const lstm = new brain.recurrent.LSTM();


if (fs.existsSync("data.json")) {
	const data = fs.readFileSync("./data.json");
	//console.log(data);
	lstm.fromJSON(JSON.parse(data));
}

function step(inp, out, callback) {
	try {
		if (fs.existsSync("data.json")) {

			const data = fs.readFileSync("./data.json");
			//console.log(data);
			lstm.fromJSON(JSON.parse(data));
		}
	}
	catch{

	}
	var out = [{ input: inp, output: out }];
	var bruhbruh = "Learn Log:";
	lstm.train(out, {
		iterations: 100,
		log: (details) => { console.log(details); outs.push(details); bruhbruh = bruhbruh + "\n" + details; },
		errorThresh: 0.011
	});
	fs.writeFile("data.json", JSON.stringify(lstm.toJSON()), function() {
	});

	return callback(bruhbruh.toString() + "\nLearn Result: " + lstm.run(inp));
}

function run(input, callback) {
	return callback(lstm.run(input));
}

function train(input, output, callback) {
	step(input, output, function(data) {
		return callback(data);
	});
}

module.exports = { train, run, step };