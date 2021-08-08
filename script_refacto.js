'use strict';

const data = [
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
	// prepare arguments to display the graph
	const dataWithTotal = createDataWithTotal(data);
	const keys = getKeys(dataWithTotal);
	const labels = getPeriodLabels(dataWithTotal);
	const graphValues = generateGraphValues({ keys, dataWithTotal });

	displayGraph({ labels, graphValues });
}

function createDataWithTotal(data) {
	return data.map((record) => {
		const filtredRecordEntries = Object.entries(record).filter(
			([key, value]) => key !== 'period'
		);

		const total = Object.values(
			Object.fromEntries(filtredRecordEntries)
		).reduce((accumulator, currentValue) => accumulator + currentValue);

		return {
			...record,
			total: total / 3,
		};
	});
}

function getKeys(dataWithTotal) {
	return Object.keys(dataWithTotal[0]);
}

function getPeriodLabels(dataWithTotal) {
	return dataWithTotal.map((record) => {
		return record['period'];
	});
}

function generateGraphValues({ keys, dataWithTotal }) {
	return keys
		.filter((key) => key !== 'period')
		.map((key) => {
			const data = dataWithTotal.map((record) => {
				return record[key];
			});

			return {
				label: key,
				data,
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
		});
}

function displayGraph({ labels, graphValues }) {
	const ctx = document.getElementById('myChart').getContext('2d');
	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: graphValues,
		},
	});
}
