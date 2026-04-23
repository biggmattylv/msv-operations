document.addEventListener('DOMContentLoaded', () => {
    async function fetchModuleMetrics(moduleId, jsonFile, metricIds) {
        try {
            const response = await fetch(jsonFile);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            for (const key in metricIds) {
                const element = document.getElementById(metricIds[key]);
                if (element) {
                    element.textContent = data[key] || 'N/A';
                }
            }
        } catch (error) {
            console.error(`Error fetching ${moduleId} metrics:`, error);
            for (const key in metricIds) {
                const element = document.getElementById(metricIds[key]);
                if (element) {
                    element.textContent = 'Error loading';
                }
            }
        }
    }

    async function fetchLogs() {
        try {
            const logsResponse = await fetch('logs.json');
            if (!logsResponse.ok) {
                throw new Error(`HTTP error! status: ${logsResponse.status}`);
            }
            const logs = await logsResponse.json();
            const logOutput = document.getElementById('log-output');
            logOutput.innerHTML = ''; // Clear existing logs

            logs.forEach(log => {
                const p = document.createElement('p');
                p.textContent = `[${new Date(log.timestamp).toLocaleString()}] ${log.level}: ${log.message}`;
                if (log.level === 'ERROR') p.style.color = 'red';
                else if (log.level === 'WARNING') p.style.color = 'orange';
                else if (log.level === 'INFO') p.style.color = 'green';
                logOutput.appendChild(p);
            });

        } catch (error) {
            console.error('Error fetching logs:', error);
            document.getElementById('log-output').innerHTML = '<p style="color: red;">Failed to load logs.</p>';
        }
    }

    async function initializeDashboard() {
        // Fetch for MSV Operations
        fetchModuleMetrics('MSV', 'msv_metrics.json', {
            'personal-task-count': 'msv-task-count',
            'msv-efficiency': 'msv-efficiency',
            'msv-projects-complete': 'msv-projects-complete',
            'msv-open-invoices': 'msv-open-invoices',
            'msv-social-engagement': 'msv-social-engagement',
            'msv-website-traffic': 'msv-website-traffic'
        });

        // Fetch for MMG Operations
        fetchModuleMetrics('MMG', 'mmg_metrics.json', {
            'mmg-active-projects': 'mmg-active-projects',
            'mmg-projects-pipeline': 'mmg-projects-pipeline',
            'mmg-revenue-ytd': 'mmg-revenue-ytd',
            'mmg-completion-rate': 'mmg-completion-rate',
            'mmg-satisfaction-score': 'mmg-satisfaction-score',
            'mmg-crew-utilization': 'mmg-crew-utilization',
            'mmg-material-spend': 'mmg-material-spend',
            'mmg-open-invoices': 'mmg-open-invoices'
        });

        // Fetch for Seamless Operations
        fetchModuleMetrics('Seamless', 'seamless_metrics.json', {
            'seamless-hubspot-companies': 'seamless-hubspot-companies',
            'seamless-hubspot-deals': 'seamless-hubspot-deals',
            'seamless-hubspot-tasks': 'seamless-hubspot-tasks',
            'seamless-hubspot-engagements': 'seamless-hubspot-engagements',
            'seamless-new-prospects': 'seamless-new-prospects',
            'seamless-active-negotiation': 'seamless-active-negotiation'
        });

        // Fetch for Coachingbio.com Metrics
        fetchModuleMetrics('Coachingbio', 'coachingbio_metrics.json', {
            'coaching-new-signups': 'coaching-new-signups',
            'coaching-active-users': 'coaching-active-users',
            'coaching-course-completions': 'coaching-course-completions',
            'coaching-avg-session': 'coaching-avg-session',
            'coaching-feedback-score': 'coaching-feedback-score',
            'coaching-conversion-rate': 'coaching-conversion-rate'
        });

        fetchLogs();
    }

    initializeDashboard();
});