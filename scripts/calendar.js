(function() {
    var monthTitle = document.getElementById('calendar-month-title');
    var prevBtn = document.getElementById('calendar-prev-month');
    var nextBtn = document.getElementById('calendar-next-month');
    var todayBtn = document.getElementById('calendar-today-btn');

    var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    var currentView = { year: 2023, month: 9 }; // октябрь = 9 (0-indexed)

    function updateTitle() {
        if (monthTitle) {
            monthTitle.textContent = months[currentView.month] + ' ' + currentView.year;
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentView.month--;
            if (currentView.month < 0) {
                currentView.month = 11;
                currentView.year--;
            }
            updateTitle();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentView.month++;
            if (currentView.month > 11) {
                currentView.month = 0;
                currentView.year++;
            }
            updateTitle();
        });
    }
    if (todayBtn) {
        todayBtn.addEventListener('click', function() {
            var d = new Date();
            currentView.year = d.getFullYear();
            currentView.month = d.getMonth();
            updateTitle();
            var todayCell = document.querySelector('.calendar-day-today');
            if (todayCell) todayCell.classList.remove('calendar-day-today');
            var day4 = document.querySelector('.calendar-day .day-num');
            var cells = document.querySelectorAll('.calendar-day');
            cells.forEach(function(cell) {
                var num = cell.querySelector('.day-num');
                if (num && num.textContent === String(d.getDate()) && !cell.classList.contains('calendar-day-other')) {
                    cell.classList.add('calendar-day-today');
                }
            });
        });
    }

    // Переключение вкладок вида: Месяц / Неделя / День
    var viewBtns = document.querySelectorAll('.calendar-view-btn');
    viewBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            viewBtns.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
        });
    });

    // Клик по пилюлям инстанций (фильтр)
    var pills = document.querySelectorAll('.calendar-pill');
    pills.forEach(function(pill) {
        pill.addEventListener('click', function() {
            if (pill.classList.contains('active')) {
                pill.classList.remove('active');
            } else {
                pills.forEach(function(p) { p.classList.remove('active'); });
                pill.classList.add('active');
            }
        });
    });
})();
