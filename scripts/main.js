// Chart.js Configuration
document.addEventListener('DOMContentLoaded', function() {
    const chartCanvas = document.getElementById('statsChart');
    
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Loans', 'Clients', 'Collaterals', 'Workouts'],
                datasets: [
                    {
                        label: 'Loans',
                        data: [650, 0, 0, 0],
                        backgroundColor: 'rgba(102, 126, 234, 0.8)',
                        borderColor: 'rgba(102, 126, 234, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Clients',
                        data: [0, 444, 0, 0],
                        backgroundColor: 'rgba(240, 147, 251, 0.8)',
                        borderColor: 'rgba(240, 147, 251, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Collaterals',
                        data: [0, 0, 420, 0],
                        backgroundColor: 'rgba(79, 172, 254, 0.8)',
                        borderColor: 'rgba(79, 172, 254, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Workouts',
                        data: [0, 0, 0, 50],
                        backgroundColor: 'rgba(250, 112, 154, 0.8)',
                        borderColor: 'rgba(250, 112, 154, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 800,
                        ticks: {
                            stepSize: 200,
                            font: {
                                size: 11
                            },
                            color: '#6c7293'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 11
                            },
                            color: '#6c7293'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Language selector
    const langElements = document.querySelectorAll('.lang');
    langElements.forEach(lang => {
        lang.addEventListener('click', function() {
            langElements.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Table row click handlers
    const tableRows = document.querySelectorAll('.data-table tbody tr[onclick]');
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // Don't trigger if clicking on action buttons or links
            if (!e.target.closest('.action-btn') && !e.target.closest('a')) {
                const onclickAttr = this.getAttribute('onclick');
                if (onclickAttr) {
                    eval(onclickAttr);
                }
            }
        });
    });
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Filter clicked');
            // Add filter logic here
        });
    });
    
    // Pagination buttons
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    paginationButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled) {
                paginationButtons.forEach(b => b.classList.remove('active'));
                if (!this.querySelector('i')) {
                    this.classList.add('active');
                }
                console.log('Page changed');
                // Add pagination logic here
            }
        });
    });
});

