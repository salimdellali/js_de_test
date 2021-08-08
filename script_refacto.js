'use strict';

var data = [
	{
		Cheese: 22.2,
		CHOCOLATE: 10.3,
		Impulse: 1.5,
		period: '2021_26',
	},
	{
		Cheese: 21.8,
		CHOCOLATE: 9.8,
		Impulse: 1.5,
		period: '2021_27',
	},
	{
		Cheese: 21.2,
		CHOCOLATE: 9.7,
		Impulse: 1.4,
		period: '2021_28',
	},
];

generateGraph();

function generateGraph() {
	// prepare graph values
	const dataWithTotal = createDataWithTotal(data);
	console.log({ data });
	console.log({ dataWithTotal });
	const keys = getKeys(dataWithTotal);
	const labels = getLabels(dataWithTotal);
	const graphValues = generateGraphValues({ keys, dataWithTotal });

	// display graph values
	const ctx = document.getElementById('myChart').getContext('2d');
	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: graphValues,
		},
	});
}

function createDataWithTotal(data) {
	// for data immutability
	const deepCloneData = JSON.parse(JSON.stringify(data));

	return deepCloneData.map((record) => {
		let total = 0;
		for (const key in record) {
			if (key !== 'period') {
				total += record[key];
			}
		}
		record.total = total / 3;
		return record;
	});
}

function getLabels(dataWithTotal) {
	var labels = [];

	for (var i = 0; i < dataWithTotal.length; i++) {
		labels.push(dataWithTotal[i]['period']);
	}

	return labels;
}

function getKeys(dataWithTotal) {
	return Object.keys(dataWithTotal[0]);
}

function generateGraphValues({ keys, dataWithTotal }) {
	var graphValues = [];

	for (var i = 0; i < keys.length; i++) {
		if (keys[i] !== 'period') {
			var temp = {
				label: keys[i],
				data: [],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
				],
			};

			for (var n = 0; n < dataWithTotal.length; n++) {
				temp.data.push(dataWithTotal[n][keys[i]]);
			}

			graphValues.push(temp);
		}
	}

	return graphValues;
}
