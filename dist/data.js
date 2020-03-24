/**
 * Ueed to store metadata to draw the graph
 */
export const winningStatistics = {
    type: 'bar',
    data: {
        labels: ['Possible attempts', 'Wins', 'Losses'],
        datasets: [
            {
                label: 'Statistics',
                data: [10, 0, 0],
                backgroundColor: [
                    'rgba(123, 239, 178, 1)',
                    'rgba(54,73,93,.5)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    '#36495d',
                    '#36495d',
                    '#36495d',
                ],
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        lineTension: 1,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    padding: 25,
                }
            }]
        }
    }
}

export default winningStatistics;