import { createSignal, onCleanup } from 'solid-js';
import { Chart, registerables } from 'chart.js'; // Import Chart.js
import 'chart.js/auto'; // Import Chart.js auto library for easier configuration

const Statistics = (props) => {
  const [chart, setChart] = createSignal(null);

  const calculatePriorityStats = () => {
    // Calculate statistics based on task priorities
    const priorityCounts = props.tasks.reduce((counts, task) => {
      counts[task.priority] = (counts[task.priority] || 0) + 1;
      return counts;
    }, {});

    const priorityLabels = Object.keys(priorityCounts);
    const priorityData = Object.values(priorityCounts);

    return { labels: priorityLabels, data: priorityData };
  };

  const calculateOrderStats = () => {
    // Calculate statistics based on task order completion
    const orderCompletionTimes = props.tasks.map((task) => task.timeTaken);

    return { data: orderCompletionTimes };
  };

  const updateCharts = () => {
    if (chart()) {
      const priorityStats = calculatePriorityStats();
      const orderStats = calculateOrderStats();

      // Update priority chart
      chart().data.labels = priorityStats.labels;
      chart().data.datasets[0].data = priorityStats.data;
      chart().update();

      // Update order completion chart
      chart().data.datasets[1].data = orderStats.data;
      chart().update();
    }
  };

  // Create charts on component mount
  createSignal(() => {
    const priorityStats = calculatePriorityStats();
    const orderStats = calculateOrderStats();

    const ctx = document.getElementById('priorityChart').getContext('2d');
    const priorityChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: priorityStats.labels,
        datasets: [
          {
            label: 'Priority Tasks Count',
            data: priorityStats.data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const orderCtx = document.getElementById('orderChart').getContext('2d');
    const orderChart = new Chart(orderCtx, {
      type: 'line',
      data: {
        labels: orderStats.data.map((_, index) => `Task ${index + 1}`),
        datasets: [
          {
            label: 'Time Taken to Complete',
            data: orderStats.data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });

    setChart({
      priorityChart,
      orderChart,
    });

    // Cleanup when component is unmounted
    onCleanup(() => {
      priorityChart.destroy();
      orderChart.destroy();
    });
  });

  // Update charts when tasks change
  createSignal(() => {
    updateCharts();
  });

  return (
    <div>
      <h2>Statistics View</h2>
      <div>
        <canvas id="priorityChart" width="400" height="200"></canvas>
      </div>
      <div>
        <canvas id="orderChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default Statistics;
