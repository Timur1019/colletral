// Legal Module JavaScript

const legalModule = {
    // Текущее состояние
    currentPage: 'main', // 'main', 'group', 'client'
    currentGroup: null,
    currentClient: null,
    currentAction: null,
    currentInstance: null,

    // Данные групп клиентов
    groupsData: [
        {
            id: 1,
            hub: 'Central',
            groupName: 'NAVOIY GOLDMOON MCHJ',
            localExposure: '500 000 000',
            ifrsExposure: '480 000 000',
            lawyer: 'Абдуллаев А.'
        },
        {
            id: 2,
            hub: 'North',
            groupName: 'SOHIB OMAD BARAKASI',
            localExposure: '562 600 000',
            ifrsExposure: '279 000 000',
            lawyer: 'Иванов И.'
        },
        {
            id: 3,
            hub: 'South',
            groupName: 'Euro Global Invest',
            localExposure: '680 300 000',
            ifrsExposure: '350 800 000',
            lawyer: 'Петров П.'
        }
    ],

    // Данные клиентов по группам
    clientsByGroup: {
        'NAVOIY GOLDMOON MCHJ': [
            { id: 1, name: 'NAVOIY GOLDMOON MCHJ', exposure: '500 000 000' },
            { id: 2, name: 'GOLDMOON TEXTILE', exposure: '300 000 000' },
            { id: 3, name: 'GOLDMOON TRADE', exposure: '200 000 000' }
        ],
        'SOHIB OMAD BARAKASI': [
            { id: 1, name: 'SOHIB OMAD BARAKASI', exposure: '562 600 000' },
            { id: 2, name: 'ООО "BEST TEXTILE INTERNATIONAL"', exposure: '450 200 000' },
            { id: 3, name: 'Statiska HOMS', exposure: '400 000 000' }
        ],
        'Euro Global Invest': [
            { id: 1, name: 'Euro Global Invest', exposure: '680 300 000' },
            { id: 2, name: 'ООО "EURO GLOBAL INVEST"', exposure: '550 000 000' }
        ]
    },

    // KPI данные для групп
    groupKpiData: {
        'NAVOIY GOLDMOON MCHJ': {
            totalCases: 15,
            inWork: 8,
            closed: 7,
            recoveryAmount: '450 млн',
            lawyers: 2
        },
        'SOHIB OMAD BARAKASI': {
            totalCases: 24,
            inWork: 12,
            closed: 12,
            recoveryAmount: '680 млн',
            lawyers: 3
        },
        'Euro Global Invest': {
            totalCases: 18,
            inWork: 10,
            closed: 8,
            recoveryAmount: '520 млн',
            lawyers: 2
        }
    },

    // Справочник судов
    courtsData: [
        'Тошкент шаҳар Алмазар тумани суди',
        'Тошкент шаҳар Бектемир тумани суди',
        'Тошкент шаҳар Мирзо-Улуғбек тумани суди',
        'Тошкент шаҳар Сергели тумани суди',
        'Тошкент шаҳар Учтепа тумани суди',
        'Тошкент шаҳар Чилонзар тумани суди',
        'Тошкент шаҳар Шайхонтоҳур тумани суди',
        'Тошкент шаҳар Юнусобод тумани суди',
        'Тошкент вилояти суди',
        'Андижон вилояти суди',
        'Бухоро вилояти суди',
        'Жиззах вилояти суди',
        'Қашқадарё вилояти суди',
        'Навоий вилояти суди',
        'Наманган вилояти суди',
        'Самарқанд вилояти суди',
        'Сурхондарё вилояти суди',
        'Сирдарё вилояти суди',
        'Тошкент вилояти суди',
        'Фарғона вилояти суди',
        'Хоразм вилояти суди',
        'Қорақалпоғистон Республикаси суди',
        'Олий Суд Республики Узбекистан'
    ],

    // МИБ бўлими
    mibBolimi: [
        'Ўзбекистон Республикаси МИБ',
        'Андижон вилояти МИБ',
        'Бухоро вилояти МИБ',
        'Жиззах вилояти МИБ',
        'Қашқадарё вилояти МИБ',
        'Навоий вилояти МИБ',
        'Наманган вилояти МИБ',
        'Самарқанд вилояти МИБ',
        'Сурхондарё вилояти МИБ',
        'Сирдарё вилояти МИБ',
        'Тошкент вилояти МИБ',
        'Тошкент шаҳар МИБ',
        'Фарғона вилояти МИБ',
        'Хоразм вилояти МИБ',
        'Қорақалпоғистон Республикаси МИБ',
        'Жиззах шаҳри МИБ',
        'Зомин шаҳри МИБ'
    ],

    // Инициализация
    init() {
        this.renderGroupsTable();
        this.initTableFilters();
        this.initDatePickers();
        this.initTooltips();
        this.populateMibBolimi();
        this.initCourtLookup();
    },

    // Рендеринг таблицы групп
    renderGroupsTable() {
        const tbody = document.getElementById('legal-groups-table-body');
        if (!tbody) return;

        tbody.innerHTML = this.groupsData.map((group, index) => `
            <tr class="clickable-row" onclick="legalModule.openGroup('${group.groupName}')" style="cursor: pointer;">
                <td>${index + 1}</td>
                <td>${group.hub}</td>
                <td>${group.groupName}</td>
                <td>${group.localExposure}</td>
                <td>${group.ifrsExposure}</td>
                <td>${group.lawyer}</td>
                <td>
                    <div class="action-buttons" onclick="event.stopPropagation();">
                        <button class="action-btn edit" title="Edit" onclick="event.stopPropagation();">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    // Инициализация фильтров таблицы
    initTableFilters() {
        const filterInputs = document.querySelectorAll('.table-filter-input');
        filterInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const columnIndex = parseInt(e.target.dataset.column);
                const filterValue = e.target.value.toLowerCase();
                const table = document.getElementById('legal-groups-table');
                const rows = table.querySelectorAll('tbody tr');

                rows.forEach(row => {
                    const cell = row.cells[columnIndex];
                    if (cell) {
                        const text = cell.textContent.toLowerCase();
                        row.style.display = text.includes(filterValue) ? '' : 'none';
                    }
                });
            });
        });
    },

    // Открытие группы
    openGroup(groupName) {
        this.currentPage = 'group';
        this.currentGroup = groupName;
        
        // Скрываем главную страницу
        document.getElementById('legal-main-page').style.display = 'none';
        
        // Показываем страницу группы
        const groupPage = document.getElementById('legal-group-page');
        groupPage.style.display = 'block';

        // Обновляем заголовок
        document.getElementById('legal-group-title').textContent = `"${groupName}" MCHJ clients`;
        
        // Обновляем breadcrumbs
        this.updateBreadcrumbs(['Home', 'Groups', `"${groupName}" MCHJ clients`]);

        // Рендерим KPI для группы
        this.renderGroupKpi(groupName);

        // Рендерим список клиентов
        this.renderClientsList(groupName);

        // Показываем пустое состояние
        document.getElementById('legal-group-empty').style.display = 'block';
        document.getElementById('legal-clients-list').style.display = 'none';
    },

    // Рендеринг KPI для группы
    renderGroupKpi(groupName) {
        const kpiData = this.groupKpiData[groupName] || {
            totalCases: 0,
            inWork: 0,
            closed: 0,
            recoveryAmount: '0',
            lawyers: 0
        };

        const container = document.getElementById('legal-group-kpi');
        container.innerHTML = `
            <div class="legal-kpi-card">
                <div class="legal-kpi-icon">
                    <i class="fas fa-folder-open"></i>
                </div>
                <div class="legal-kpi-content">
                    <div class="legal-kpi-title">Всего дел</div>
                    <div class="legal-kpi-value">${kpiData.totalCases}</div>
                </div>
            </div>
            <div class="legal-kpi-card">
                <div class="legal-kpi-icon">
                    <i class="fas fa-briefcase"></i>
                </div>
                <div class="legal-kpi-content">
                    <div class="legal-kpi-title">В работе</div>
                    <div class="legal-kpi-value">${kpiData.inWork}</div>
                </div>
            </div>
            <div class="legal-kpi-card">
                <div class="legal-kpi-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="legal-kpi-content">
                    <div class="legal-kpi-title">Закрыто</div>
                    <div class="legal-kpi-value">${kpiData.closed}</div>
                </div>
            </div>
            <div class="legal-kpi-card">
                <div class="legal-kpi-icon">
                    <i class="fas fa-money-bill-wave"></i>
                </div>
                <div class="legal-kpi-content">
                    <div class="legal-kpi-title">Сумма взыскания</div>
                    <div class="legal-kpi-value">${kpiData.recoveryAmount}</div>
                </div>
            </div>
            <div class="legal-kpi-card">
                <div class="legal-kpi-icon">
                    <i class="fas fa-user-tie"></i>
                </div>
                <div class="legal-kpi-content">
                    <div class="legal-kpi-title">Юристов</div>
                    <div class="legal-kpi-value">${kpiData.lawyers}</div>
                </div>
            </div>
        `;
    },

    // Рендеринг списка клиентов
    renderClientsList(groupName) {
        const clients = this.clientsByGroup[groupName] || [];
        const container = document.getElementById('legal-clients-list');
        
        container.innerHTML = clients.map(client => `
            <div class="legal-client-item" onclick="legalModule.openClient('${client.name}')">
                <div class="legal-client-item-title">${client.name}</div>
                <div class="legal-client-item-info">Exposure: ${client.exposure}</div>
            </div>
        `).join('');
    },

    // Открытие клиента
    openClient(clientName) {
        this.currentPage = 'client';
        this.currentClient = clientName;

        // Скрываем страницу группы
        document.getElementById('legal-group-page').style.display = 'none';
        
        // Показываем страницу клиента
        const clientPage = document.getElementById('legal-client-page');
        clientPage.style.display = 'block';

        // Обновляем заголовок
        document.getElementById('legal-client-title').textContent = clientName;

        // Обновляем breadcrumbs
        this.updateBreadcrumbs(['Home', 'Groups', `"${this.currentGroup}" MCHJ clients`, clientName]);

        // Рендерим карточку клиента
        this.renderClientCard(clientName);
    },

    // Рендеринг карточки клиента
    renderClientCard(clientName) {
        const container = document.getElementById('legal-client-card');
        const clients = this.clientsByGroup[this.currentGroup] || [];
        const client = clients.find(c => c.name === clientName);

        container.innerHTML = `
            <div class="legal-client-info">
                <div class="legal-form-group">
                    <label class="legal-form-label">Client Name</label>
                    <div class="legal-client-value">${clientName}</div>
                </div>
                <div class="legal-form-group">
                    <label class="legal-form-label">Group</label>
                    <div class="legal-client-value">${this.currentGroup}</div>
                </div>
                ${client ? `
                <div class="legal-form-group">
                    <label class="legal-form-label">Exposure</label>
                    <div class="legal-client-value">${client.exposure}</div>
                </div>
                ` : ''}
            </div>
        `;
    },

    // Назад
    goBack() {
        if (this.currentPage === 'client') {
            // Возвращаемся к группе
            this.currentPage = 'group';
            document.getElementById('legal-client-page').style.display = 'none';
            document.getElementById('legal-group-page').style.display = 'block';
            this.updateBreadcrumbs(['Home', 'Groups', `"${this.currentGroup}" MCHJ clients`]);
        } else if (this.currentPage === 'group') {
            // Возвращаемся на главную
            this.currentPage = 'main';
            document.getElementById('legal-group-page').style.display = 'none';
            document.getElementById('legal-main-page').style.display = 'block';
            this.updateBreadcrumbs(['Home']);
        } else {
            window.location.href = 'index.html';
        }
    },

    // Обновление breadcrumbs
    updateBreadcrumbs(items) {
        const breadcrumbs = document.getElementById('legal-breadcrumbs');
        breadcrumbs.innerHTML = items.map((item, index) => {
            if (index === 0) {
                return `<i class="fas fa-home"></i><span class="breadcrumb-separator">/</span><span>${item}</span>`;
            }
            return `<span class="breadcrumb-separator">/</span><span>${item}</span>`;
        }).join('');
    },

    // Открытие модального окна добавления действия
    openAddModal() {
        const modal = new bootstrap.Modal(document.getElementById('legal-add-action-modal'));
        modal.show();
    },

    // Инициализация date pickers в модальном окне
    initModalDatePickers(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            const dateInputs = modal.querySelectorAll('.legal-date-input:not([data-fp-initialized])');
            dateInputs.forEach(input => {
                flatpickr(input, {
                    dateFormat: 'd.m.Y',
                    locale: 'ru',
                    allowInput: true
                });
                input.dataset.fpInitialized = 'true';
            });
        }
    },

    // Выбор действия
    selectAction(action) {
        this.currentAction = action;
        const modal = bootstrap.Modal.getInstance(document.getElementById('legal-add-action-modal'));
        modal.hide();

        if (action === 'talabnoma') {
            const talabnomaModal = new bootstrap.Modal(document.getElementById('legal-talabnoma-modal'));
            talabnomaModal.show();
            // Инициализируем date pickers после показа модального окна
            setTimeout(() => {
                this.initModalDatePickers('legal-talabnoma-modal');
            }, 100);
        } else if (action === 'sud') {
            const instanceModal = new bootstrap.Modal(document.getElementById('legal-instance-modal'));
            instanceModal.show();
        } else if (action === 'bankrot') {
            alert('Функционал банкротства будет реализован дополнительно');
        }
    },

    // Добавление Талабнома
    addTalabnoma() {
        const form = document.getElementById('legal-talabnoma-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('Talabnoma data:', data);

        // Закрываем модальное окно
        const modal = bootstrap.Modal.getInstance(document.getElementById('legal-talabnoma-modal'));
        modal.hide();

        // Показываем модальное окно выбора инстанции после небольшой задержки
        setTimeout(() => {
            const instanceModal = new bootstrap.Modal(document.getElementById('legal-instance-modal'));
            instanceModal.show();
        }, 300);
    },

    // Выбор инстанции
    selectInstance(instanceType) {
        this.currentInstance = instanceType;
        const modal = bootstrap.Modal.getInstance(document.getElementById('legal-instance-modal'));
        modal.hide();

        // Обновляем заголовок формы
        const instanceNames = {
            '1-instance': '1-инстанция',
            'apellyatsiya': 'Апелляция',
            'kassatsiya': 'Кассация',
            'taftish': 'Тафтиш',
            'oliy-sud': 'Олий Суд'
        };

        document.getElementById('legalInstanceFormModalLabel').textContent = instanceNames[instanceType];
        document.getElementById('instance-type-input').value = instanceType;

        // Генерируем номер дела
        this.generateIshRaqami();

        // Открываем форму инстанции
        const formModal = new bootstrap.Modal(document.getElementById('legal-instance-form-modal'));
        formModal.show();
        // Инициализируем date pickers после показа модального окна
        setTimeout(() => {
            this.initModalDatePickers('legal-instance-form-modal');
            this.initCourtLookup();
        }, 100);
    },

    // Добавление инстанции
    addInstance() {
        const form = document.getElementById('legal-instance-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('Instance data:', data);

        // Показываем сообщение об успехе
        alert('Данные успешно сохранены!');

        // Закрываем модальное окно
        const modal = bootstrap.Modal.getInstance(document.getElementById('legal-instance-form-modal'));
        modal.hide();

        // Очищаем форму
        form.reset();
        const ishRaqamiInput = document.getElementById('ish-raqami-input');
        if (ishRaqamiInput) {
            ishRaqamiInput.value = '';
        }

        // Можно снова показать модальное окно выбора инстанции для добавления следующей
        setTimeout(() => {
            if (confirm('Добавить еще одну судебную инстанцию?')) {
                const instanceModal = new bootstrap.Modal(document.getElementById('legal-instance-modal'));
                instanceModal.show();
            }
        }, 300);
    },

    // Генерация номера дела
    generateIshRaqami() {
        // Формат: 4-12-1234-123/51
        const part1 = Math.floor(Math.random() * 10);
        const part2 = String(Math.floor(Math.random() * 100)).padStart(2, '0');
        const part3 = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
        const part4 = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
        const part5 = String(Math.floor(Math.random() * 100)).padStart(2, '0');
        
        const ishRaqami = `${part1}-${part2}-${part3}-${part4}/${part5}`;
        const input = document.getElementById('ish-raqami-input');
        if (input) {
            input.value = ishRaqami;
        }
    },

    // Инициализация Date Pickers
    initDatePickers() {
        const dateInputs = document.querySelectorAll('.legal-date-input:not([data-fp-initialized])');
        dateInputs.forEach(input => {
            if (!input.dataset.fpInitialized) {
                flatpickr(input, {
                    dateFormat: 'd.m.Y',
                    locale: 'ru',
                    allowInput: true
                });
                input.dataset.fpInitialized = 'true';
            }
        });
    },

    // Инициализация Tooltips
    initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    },

    // Заполнение МИБ бўлими
    populateMibBolimi() {
        const select = document.querySelector('select[name="mib-bolimi"]');
        if (select) {
            select.innerHTML = '<option value="">---</option>' + 
                this.mibBolimi.map(mib => `<option value="${mib}">${mib}</option>`).join('');
        }
    },

    // Инициализация Lookup для судов
    initCourtLookup() {
        const lookupInput = document.getElementById('sud-nomi-lookup');
        const dropdown = document.getElementById('sud-nomi-dropdown');

        if (!lookupInput || !dropdown) return;

        // Удаляем старые обработчики, если они есть
        const newInput = lookupInput.cloneNode(true);
        lookupInput.parentNode.replaceChild(newInput, lookupInput);

        newInput.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            
            if (value.length < 2) {
                dropdown.classList.remove('show');
                return;
            }

            const filtered = this.courtsData.filter(court => 
                court.toLowerCase().includes(value)
            );

            if (filtered.length > 0) {
                dropdown.innerHTML = filtered.slice(0, 10).map(court => `
                    <div class="legal-lookup-item" onclick="legalModule.selectCourt('${court.replace(/'/g, "\\'")}')">${court}</div>
                `).join('');
                dropdown.classList.add('show');
            } else {
                dropdown.classList.remove('show');
            }
        });

        // Закрытие при клике вне
        const closeHandler = (e) => {
            if (!newInput.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        };
        
        document.removeEventListener('click', this._courtLookupCloseHandler);
        this._courtLookupCloseHandler = closeHandler;
        document.addEventListener('click', closeHandler);
    },

    // Выбор суда из lookup
    selectCourt(courtName) {
        document.getElementById('sud-nomi-lookup').value = courtName;
        document.getElementById('sud-nomi-dropdown').classList.remove('show');
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    legalModule.init();
    legalModule.initFileUploads();
    
    // Инициализация date pickers для динамически создаваемых элементов
    const observer = new MutationObserver(() => {
        legalModule.initDatePickers();
        legalModule.initTooltips();
        legalModule.initFileUploads();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Инициализация обработчиков загрузки файлов
legalModule.initFileUploads = function() {
    const fileInputs = document.querySelectorAll('.file-input');
    fileInputs.forEach(input => {
        if (!input.dataset.uploadInitialized) {
            input.addEventListener('change', function(e) {
                const files = e.target.files;
                const uploadArea = this.closest('.file-upload-area');
                const uploadText = uploadArea?.querySelector('.file-upload-text');
                
                if (files.length > 0 && uploadText) {
                    const fileNames = Array.from(files).map(f => f.name).join(', ');
                    uploadText.textContent = `Выбрано файлов: ${files.length}. ${fileNames.substring(0, 50)}${fileNames.length > 50 ? '...' : ''}`;
                    uploadArea.style.borderColor = 'var(--success)';
                } else if (uploadText) {
                    uploadText.textContent = 'Перетащите файлы сюда или нажмите для выбора';
                    uploadArea.style.borderColor = 'var(--border-color)';
                }
            });
            
            // Drag and drop
            const uploadArea = input.closest('.file-upload-area');
            if (uploadArea && !uploadArea.dataset.dragInitialized) {
                uploadArea.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    this.style.borderColor = 'var(--primary)';
                    this.style.background = 'rgba(102, 126, 234, 0.1)';
                });
                
                uploadArea.addEventListener('dragleave', function(e) {
                    e.preventDefault();
                    this.style.borderColor = 'var(--border-color)';
                    this.style.background = 'rgba(249, 250, 251, 0.5)';
                });
                
                uploadArea.addEventListener('drop', function(e) {
                    e.preventDefault();
                    this.style.borderColor = 'var(--border-color)';
                    this.style.background = 'rgba(249, 250, 251, 0.5)';
                    
                    const files = e.dataTransfer.files;
                    if (files.length > 0) {
                        input.files = files;
                        input.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                });
                
                uploadArea.dataset.dragInitialized = 'true';
            }
            
            input.dataset.uploadInitialized = 'true';
        }
    });
};
