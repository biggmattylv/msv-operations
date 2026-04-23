document.addEventListener('DOMContentLoaded', () => {
    async function fetchData() {
        try {
            // Fetch Metrics
            const metricsResponse = await fetch('metrics.json');
            const metrics = await metricsResponse.json();
            document.getElementById('metric1').textContent = metrics.metric1;
            document.getElementById('metric2').textContent = metrics.metric2;

            // Fetch Logs
            const logsResponse = await fetch('logs.json');
            const logs = await logsResponse.json();
            const logOutput = document.getElementById('log-output');
            logOutput.innerHTML = ''; // Clear existing logs

            logs.forEach(log => {
                const p = document.createElement('p');
                p.textContent = `[${new Date(log.timestamp).toLocaleString()}] ${log.level}: ${log.message}`;
                // Optional: Add styling based on log level
                if (log.level === 'ERROR') p.style.color = 'red';
                if (log.level === 'WARNING') p.style.color = 'orange';
                logOutput.appendChild(p);
            });

        } catch (error) {
            console.error('Error fetching data:', error);
            document.getElementById('metric1').textContent = 'Error loading';
            document.getElementById('metric2').textContent = 'Error loading';
            document.getElementById('log-output').innerHTML = '<p style="color: red;">Failed to load data. Please check the console for details.</p>';
        }
    }

    fetchData();
});