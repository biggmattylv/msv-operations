document.addEventListener('DOMContentLoaded', () => {
    // Placeholder for fetching data
    function fetchData() {
        // Simulate API calls
        setTimeout(() => {
            document.getElementById('metric1').textContent = '1,234 (Dummy Data)';
            document.getElementById('metric2').textContent = '56.78% (Dummy Data)';

            const logOutput = document.getElementById('log-output');
            logOutput.innerHTML = `
                <p>[${new Date().toLocaleString()}] INFO: System started successfully.</p>
                <p>[${new Date().toLocaleString()}] DEBUG: Processing daily reports.</p>
                <p>[${new Date().toLocaleString()}] WARNING: Disk space 80% full.</p>
            `;
        }, 1000);
    }

    fetchData();
});