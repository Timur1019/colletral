// Legal Module JavaScript

const legalModule = {
    // Текущее состояние
    currentPage: 'main', // 'main', 'group', 'client'
    currentGroup: null,
    currentClient: null,
    currentAction: null,
    currentInstance: null,
    selectedCalendarDate: null, // Выбранная дата из календаря
    lastInstanceTopData: null, // Сохраненные верхние данные инстанции для повторного использования
    isAddingMoreInstance: false, // Флаг для отслеживания процесса добавления еще одной инстанции

    // Хранилище данных о делах (в реальном проекте это будет API)
    legalCases: {
        // Тестовые данные для NAVOIY GOLDMOON MCHJ
        'NAVOIY GOLDMOON MCHJ': [
            {
                type: 'talabnoma',
                date: '12.03.2024',
                talabnoma: 'Талабнома о взыскании задолженности',
                taraf: 'ООО "Глобал Логистик"',
                izoh: 'Официальное письмо-требование отправлено заказным письмом. Получение подтверждено 15 марта.',
                files: ['протокол_заседания.pdf']
            },
            {
                type: 'sud',
                instances: [
                    {
                        instanceType: '1-instance',
                        date: '14.05.2024',
                        summa: 45000000,
                        sudNomi: 'Тошкент шаҳар Алмазар тумани суди',
                        javobgar: 'ООО "Глобал Логистик"',
                        izoh: 'Предварительное слушание по взысканию задолженности. Судья Робертсон. Перенесено на 10 июня.',
                        qaror: {
                            turi: 'to\'liq',
                            date: '10.06.2024',
                            summa: 45000000,
                            ishRaqami: 'ИШ-2024-001',
                            izoh: 'Решение суда о взыскании полной суммы задолженности',
                            files: ['sud_qarori_001.pdf']
                        },
                        ijro: {
                            ijroIshRaqami: 'ИЖ-2024-001',
                            date: '15.06.2024',
                            boshlanishDate: '20.06.2024',
                            mibBolimi: 'Тошкент шаҳар МИБ',
                            davlatIshtirokchisi: 'Иванов И.И. - +998901234567',
                            tugatishDate: '',
                            izoh: 'Исполнительное производство открыто',
                            files: ['ijro_001.pdf']
                        }
                    }
                ]
            }
        ],
        'GOLDMOON TEXTILE': [
            {
                type: 'talabnoma',
                date: '28.04.2024',
                talabnoma: 'Талабнома о нарушении договорных обязательств',
                taraf: 'GOLDMOON TEXTILE',
                izoh: 'Квартальный баланс и декларация об активах поданы по запросу противоположной стороны.',
                files: ['talabnoma_textile.pdf', 'balans_2024.pdf']
            },
            {
                type: 'sud',
                instances: [
                    {
                        instanceType: '1-instance',
                        date: '05.02.2024',
                        summa: 30000000,
                        sudNomi: 'Тошкент вилояти суди',
                        javobgar: 'GOLDMOON TEXTILE',
                        izoh: 'Первичная документация клиента получена, юридическое досье.',
                        qaror: {
                            turi: 'qisman',
                            date: '20.02.2024',
                            summa: 15000000,
                            ishRaqami: 'ИШ-2024-002',
                            izoh: 'Частичное решение суда',
                            files: []
                        }
                    }
                ]
            }
        ],
        'GOLDMOON TRADE': [
            {
                type: 'talabnoma',
                date: '15.01.2024',
                talabnoma: 'Претензия о возврате товара',
                taraf: 'GOLDMOON TRADE',
                izoh: 'Претензия отправлена по поводу возврата некачественного товара.',
                files: ['pretenziya_trade.pdf']
            }
        ],
        // Тестовые данные для SOHIB OMAD BARAKASI
        'SOHIB OMAD BARAKASI': [
            {
                type: 'sud',
                instances: [
                    {
                        instanceType: '1-instance',
                        date: '01.03.2024',
                        summa: 562600000,
                        sudNomi: 'Самарқанд вилояти суди',
                        javobgar: 'SOHIB OMAD BARAKASI',
                        izoh: 'Судебное разбирательство по крупной задолженности.',
                        qaror: {
                            turi: 'to\'liq',
                            date: '25.03.2024',
                            summa: 562600000,
                            ishRaqami: 'ИШ-2024-003',
                            izoh: 'Решение о взыскании полной суммы',
                            files: ['qaror_samarkand.pdf']
                        }
                    },
                    {
                        instanceType: 'apellyatsiya',
                        date: '10.04.2024',
                        summa: 562600000,
                        sudNomi: 'Апелляционный суд',
                        javobgar: 'SOHIB OMAD BARAKASI',
                        izoh: 'Подана апелляция на решение первой инстанции.',
                        qaror: {
                            turi: 'to\'liq',
                            date: '30.04.2024',
                            summa: 562600000,
                            ishRaqami: 'ИШ-2024-003-АП',
                            izoh: 'Апелляция отклонена',
                            files: []
                        }
                    }
                ]
            }
        ],
        'ООО "BEST TEXTILE INTERNATIONAL"': [
            {
                type: 'talabnoma',
                date: '20.02.2024',
                talabnoma: 'Талабнома о взыскании долга',
                taraf: 'ООО "BEST TEXTILE INTERNATIONAL"',
                izoh: 'Отправлена претензия о взыскании задолженности по договору поставки.',
                files: ['talabnoma_best.pdf']
            }
        ],
        // Тестовые данные для Euro Global Invest
        'Euro Global Invest': [
            {
                type: 'sud',
                instances: [
                    {
                        instanceType: '1-instance',
                        date: '05.01.2024',
                        summa: 680300000,
                        sudNomi: 'Тошкент шаҳар Чилонзар тумани суди',
                        javobgar: 'Euro Global Invest',
                        izoh: 'Дело открыто. Первичная документация клиента получена, юридическое досье.',
                        qaror: {
                            turi: 'to\'liq',
                            date: '15.02.2024',
                            summa: 680300000,
                            ishRaqami: 'ИШ-2024-004',
                            izoh: 'Решение суда о взыскании задолженности',
                            files: ['qaror_euro.pdf']
                        },
                        ijro: {
                            ijroIshRaqami: 'ИЖ-2024-002',
                            date: '20.02.2024',
                            boshlanishDate: '25.02.2024',
                            mibBolimi: 'Тошкент шаҳар МИБ',
                            davlatIshtirokchisi: 'Петров П.П. - +998907654321',
                            tugatishDate: '',
                            izoh: 'Исполнительное производство в процессе',
                            files: ['ijro_euro.pdf']
                        }
                    }
                ]
            }
        ]
    },

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
            { id: 1, name: 'NAVOIY GOLDMOON MCHJ', exposure: '500 000 000', inn: '982-341-029', industry: 'Транспорт и тяжелая логистика', legalRepresentative: 'Алексей Волков', nibbd: '175464' },
            { id: 2, name: 'GOLDMOON TEXTILE', exposure: '300 000 000', inn: '982-341-030', industry: 'Текстильная промышленность', legalRepresentative: 'Иван Петров', nibbd: '175465' },
            { id: 3, name: 'GOLDMOON TRADE', exposure: '200 000 000', inn: '982-341-031', industry: 'Торговля', legalRepresentative: 'Мария Сидорова', nibbd: '175466' }
        ],
        'SOHIB OMAD BARAKASI': [
            { id: 1, name: 'SOHIB OMAD BARAKASI', exposure: '562 600 000', inn: '982-341-032', industry: 'Кластер', legalRepresentative: 'Сиддиков Мумин', nibbd: '190917' },
            { id: 2, name: 'ООО "BEST TEXTILE INTERNATIONAL"', exposure: '450 200 000', inn: '982-341-033', industry: 'Текстильная промышленность', legalRepresentative: 'Иванов Иван', nibbd: '223160' },
            { id: 3, name: 'Statiska HOMS', exposure: '400 000 000', inn: '982-341-034', industry: 'Кластер', legalRepresentative: 'Петров Петр', nibbd: '175467' }
        ],
        'Euro Global Invest': [
            { id: 1, name: 'Euro Global Invest', exposure: '680 300 000', inn: '982-341-035', industry: 'Инвестиции', legalRepresentative: 'Сидоров Сидор', nibbd: '229035' },
            { id: 2, name: 'ООО "EURO GLOBAL INVEST"', exposure: '550 000 000', inn: '982-341-036', industry: 'Инвестиции', legalRepresentative: 'Кузнецов Кузьма', nibbd: '236366' }
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
        this.initFilters();
        this.populateFilterOptions();
        this.initDefendants();
    },
    
    // Инициализация ответчиков
    initDefendants() {
        this.defendants = [];
    },
    
    // Добавление ответчика
    addDefendantInput() {
        const name = prompt('Введите имя ответчика:');
        if (name && name.trim()) {
            if (!this.defendants) {
                this.defendants = [];
            }
            this.defendants.push(name.trim());
            this.updateDefendantsDisplay();
        }
    },
    
    // Удаление ответчика
    removeDefendant(index) {
        if (this.defendants && this.defendants[index]) {
            this.defendants.splice(index, 1);
            this.updateDefendantsDisplay();
        }
    },
    
    // Обновление отображения ответчиков
    updateDefendantsDisplay() {
        const container = document.getElementById('legal-defendants-tags');
        const input = document.getElementById('javobgarlar-input');
        
        if (!container || !input) return;
        
        if (this.defendants && this.defendants.length > 0) {
            container.innerHTML = this.defendants.map((defendant, index) => `
                <span class="legal-defendant-tag">
                    ${defendant}
                    <button type="button" class="legal-defendant-remove" onclick="legalModule.removeDefendant(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                </span>
            `).join('');
            input.value = this.defendants.join(', ');
        } else {
            container.innerHTML = '';
            input.value = '';
        }
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

    // Инициализация фильтров таблицы (удалено - фильтры теперь в панели сверху)
    initTableFilters() {
        // Фильтры теперь в панели сверху, не нужны в заголовках таблицы
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
        document.getElementById('legal-group-title').textContent = `Клиенты МЧЖ "${groupName}"`;
        
        // Обновляем breadcrumbs
        this.updateBreadcrumbs(['Главная', 'Группы', `Клиенты МЧЖ "${groupName}"`]);

        // Рендерим KPI для группы
        this.renderGroupKpi(groupName);

        // Рендерим список клиентов
        this.renderClientsList(groupName);

        // Показываем историю группы
        this.renderGroupHistory(groupName);
        document.getElementById('legal-group-empty').style.display = 'block';
        document.getElementById('legal-selected-client-content').style.display = 'none';
    },

    // Рендеринг KPI для группы
    renderGroupKpi(groupName) {
        const kpiData = this.groupKpiData[groupName] || {
            totalCases: 0,
            activeDisputes: 0,
            successfulCases: 0,
            totalSum: '0',
            pendingTasks: 0
        };

        // Подсчитываем реальные данные из дел
        const clients = this.clientsByGroup[groupName] || [];
        let totalCases = 0;
        let activeDisputes = 0;
        let totalSum = 0;

        clients.forEach(client => {
            const cases = this.legalCases[client.name] || [];
            cases.forEach(caseItem => {
                if (caseItem.type === 'talabnoma') {
                    totalCases++;
                    activeDisputes++;
                } else if (caseItem.type === 'sud' && caseItem.instances) {
                    caseItem.instances.forEach(instance => {
                        totalCases++;
                        activeDisputes++;
                        totalSum += instance.summa || 0;
                    });
                }
            });
        });

        const successfulCases = totalCases > 0 ? Math.round((totalCases - activeDisputes) / totalCases * 100) : 0;

        const container = document.getElementById('legal-group-kpi');
        container.innerHTML = `
            <div class="legal-kpi-card">
                <div class="legal-kpi-icon" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);">
                    <i class="fas fa-list"></i>
                </div>
                <div class="legal-kpi-content">
                    <div class="legal-kpi-title">Всего дел</div>
                    <div class="legal-kpi-value">${totalCases || kpiData.totalCases}</div>
                </div>
            </div>
            <div class="legal-kpi-card">
                <div class="legal-kpi-icon" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
                    <i class="fas fa-balance-scale"></i>
                </div>
                <div class="legal-kpi-content">
                    <div class="legal-kpi-title">Активные споры</div>
                    <div class="legal-kpi-value">${activeDisputes || kpiData.activeDisputes}</div>
                </div>
            </div>
            <div class="legal-kpi-card">
                <div class="legal-kpi-icon" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                    <i class="fas fa-check-square"></i>
                </div>
                <div class="legal-kpi-content">
                    <div class="legal-kpi-title">Успешные дела</div>
                    <div class="legal-kpi-value">${successfulCases || kpiData.successfulCases}%</div>
                </div>
            </div>
            <div class="legal-kpi-card">
                <div class="legal-kpi-icon" style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);">
                    <i class="fas fa-folder-open"></i>
                </div>
                <div class="legal-kpi-content">
                    <div class="legal-kpi-title">Общая сумма</div>
                    <div class="legal-kpi-value">${totalSum > 0 ? (totalSum / 1000000).toFixed(1) + 'M USD' : kpiData.totalSum}</div>
                </div>
            </div>
            <div class="legal-kpi-card">
                <div class="legal-kpi-icon" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="legal-kpi-content">
                    <div class="legal-kpi-title">Ожидают задач</div>
                    <div class="legal-kpi-value">${kpiData.pendingTasks || 15}</div>
                </div>
            </div>
        `;
    },

    // Рендеринг списка клиентов в боковой панели
    renderClientsList(groupName) {
        const clients = this.clientsByGroup[groupName] || [];
        const sidebarList = document.getElementById('legal-clients-list-sidebar');
        
        if (!sidebarList) return;
        
        // Подсчитываем активные дела для каждого клиента
        const clientsWithCases = clients.map(client => {
            const cases = this.legalCases[client.name] || [];
            let activeCases = 0;
            
            cases.forEach(caseItem => {
                if (caseItem.type === 'talabnoma') {
                    activeCases++;
                } else if (caseItem.type === 'sud' && caseItem.instances) {
                    activeCases += caseItem.instances.length;
                }
            });
            
            return {
                ...client,
                activeCases: activeCases
            };
        });
        
        sidebarList.innerHTML = clientsWithCases.map((client, index) => `
            <div class="legal-client-sidebar-item ${this.currentClient === client.name ? 'active' : ''}" 
                 onclick="legalModule.openClient('${client.name.replace(/'/g, "\\'")}')">
                <div class="legal-client-sidebar-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="legal-client-sidebar-info">
                    <div class="legal-client-sidebar-name">${client.name}</div>
                    <div class="legal-client-sidebar-cases">${client.activeCases} активных дел</div>
                </div>
            </div>
        `).join('');
        
        // Инициализируем поиск
        this.initClientsSearch();
    },
    
    // Инициализация поиска клиентов
    initClientsSearch() {
        const searchInput = document.getElementById('legal-clients-search-input');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            const searchValue = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.legal-client-sidebar-item');
            
            items.forEach(item => {
                const name = item.querySelector('.legal-client-sidebar-name')?.textContent.toLowerCase() || '';
                item.style.display = name.includes(searchValue) ? '' : 'none';
            });
        });
    },
    
    // Обновление списка клиентов
    refreshClientsList() {
        if (this.currentGroup) {
            this.renderClientsList(this.currentGroup);
            this.renderGroupHistory(this.currentGroup);
        }
    },
    
    // Рендеринг истории действий группы
    renderGroupHistory(groupName) {
        const container = document.getElementById('legal-group-empty');
        if (!container) return;
        
        const clients = this.clientsByGroup[groupName] || [];
        
        // Собираем все дела всех клиентов группы
        const allCases = [];
        clients.forEach(client => {
            const cases = this.legalCases[client.name] || [];
            cases.forEach(caseItem => {
                const expanded = this.expandCasesForChronology([caseItem]);
                expanded.forEach(expandedCase => {
                    allCases.push({
                        ...expandedCase,
                        clientName: client.name
                    });
                });
            });
        });
        
        // Сортируем по дате (новые сверху)
        allCases.sort((a, b) => {
            try {
                if (!a.date || a.date === '-') return 1;
                if (!b.date || b.date === '-') return -1;
                const dateA = new Date(a.date.split('.').reverse().join('-'));
                const dateB = new Date(b.date.split('.').reverse().join('-'));
                return dateB - dateA;
            } catch (e) {
                return 0;
            }
        });
        
        // Определяем недавние события (за последние 30 дней)
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        
        if (allCases.length === 0) {
            container.innerHTML = `
                <div class="legal-group-history-empty">
                    <div class="legal-empty-icon-large">
                        <i class="fas fa-history"></i>
                    </div>
                    <div class="legal-empty-text">
                        <h3>История действий</h3>
                        <p>Пока нет зарегистрированных действий по клиентам этой группы. Выберите клиента, чтобы добавить новое дело.</p>
                    </div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="legal-group-history">
                <div class="legal-group-history-header">
                    <h3 class="legal-group-history-title">
                        <i class="fas fa-history"></i>
                        История действий группы
                    </h3>
                    <p class="legal-group-history-subtitle">Все юридические действия по клиентам группы "${groupName}"</p>
                </div>
                
                <div class="legal-group-history-timeline">
                    ${allCases.map((caseItem, index) => {
                        let eventDate;
                        try {
                            if (caseItem.date && caseItem.date !== '-') {
                                const [day, month, year] = caseItem.date.split('.');
                                eventDate = new Date(year, parseInt(month) - 1, parseInt(day));
                            }
                        } catch (e) {
                            eventDate = null;
                        }
                        
                        const isRecent = eventDate && eventDate >= thirtyDaysAgo;
                        
                        // Определяем тип события и иконку
                        let eventTitle = '';
                        let eventIcon = 'fas fa-file-alt';
                        let eventDescription = '';
                        let eventFiles = [];
                        
                        if (caseItem.type === 'talabnoma') {
                            eventTitle = 'Отправлена претензия (Талабнома)';
                            eventIcon = 'fas fa-envelope';
                            eventDescription = caseItem.description || 'Официальное письмо-требование отправлено заказным письмом.';
                            eventFiles = caseItem.files || [];
                        } else if (caseItem.type === 'sud') {
                            if (caseItem.isQaror) {
                                eventTitle = 'Суд қарори';
                                eventIcon = 'fas fa-gavel';
                                eventDescription = caseItem.description || 'Решение суда по делу.';
                                eventFiles = caseItem.qarorFiles || [];
                            } else if (caseItem.isIjro) {
                                eventTitle = 'Ижро иши';
                                eventIcon = 'fas fa-file-contract';
                                eventDescription = caseItem.description || 'Исполнительное производство.';
                                eventFiles = caseItem.files || [];
                            } else if (caseItem.instanceInfo && caseItem.instanceInfo.includes('1-инстанция')) {
                                eventTitle = 'Проведено судебное заседание';
                                eventIcon = 'fas fa-gavel';
                                eventDescription = caseItem.description || 'Судебное заседание по делу.';
                                eventFiles = [];
                            } else {
                                eventTitle = 'Судебное производство';
                                eventIcon = 'fas fa-balance-scale';
                                eventDescription = caseItem.description || 'Судебное разбирательство по делу.';
                                eventFiles = [];
                            }
                        } else {
                            eventTitle = 'Дело открыто';
                            eventIcon = 'fas fa-folder-open';
                            eventDescription = caseItem.description || 'Первичная документация клиента получена.';
                            eventFiles = [];
                        }
                        
                        // Форматируем дату
                        let formattedDate = caseItem.date || '-';
                        if (eventDate) {
                            const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                                           'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
                            formattedDate = `${eventDate.getDate()} ${months[eventDate.getMonth()]} ${eventDate.getFullYear()}`;
                        }
                        
                        return `
                            <div class="legal-group-history-item ${isRecent ? 'recent' : ''}" onclick="legalModule.openClient('${caseItem.clientName.replace(/'/g, "\\'")}')">
                                <div class="legal-group-history-marker">
                                    <div class="legal-group-history-icon ${isRecent ? 'recent-icon' : ''}">
                                        <i class="${eventIcon}"></i>
                                    </div>
                                    ${index < allCases.length - 1 ? '<div class="legal-group-history-line"></div>' : ''}
                                </div>
                                <div class="legal-group-history-content">
                                    <div class="legal-group-history-date">
                                        ${formattedDate}
                                        ${isRecent ? '<span class="legal-group-history-recent-badge">недавно</span>' : ''}
                                    </div>
                                    <div class="legal-group-history-event">
                                        <div class="legal-group-history-client">
                                            <i class="fas fa-building"></i>
                                            ${caseItem.clientName}
                                        </div>
                                        <h4 class="legal-group-history-event-title">${eventTitle}</h4>
                                        <p class="legal-group-history-event-description">${eventDescription}</p>
                                        ${eventFiles.length > 0 ? `
                                        <div class="legal-group-history-files">
                                            ${eventFiles.map(file => `
                                                <span class="legal-group-history-file">
                                                    <i class="fas fa-paperclip"></i>
                                                    ${file}
                                                </span>
                                            `).join('')}
                                        </div>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    // Открытие клиента
    openClient(clientName) {
        this.currentClient = clientName;

        // Скрываем боковую панель с клиентами
        const sidebar = document.querySelector('.legal-clients-sidebar');
        if (sidebar) {
            sidebar.style.display = 'none';
        }

        // Изменяем layout на одну колонку (паспорт на всю ширину)
        const layout = document.querySelector('.legal-group-layout');
        if (layout) {
            layout.classList.add('client-selected');
        }

        // Скрываем историю группы
        document.getElementById('legal-group-empty').style.display = 'none';
        
        // Показываем контент клиента
        const clientContent = document.getElementById('legal-selected-client-content');
        clientContent.style.display = 'block';

        // Рендерим контент клиента
        this.renderSelectedClientContent(clientName);
    },
    
    // Рендеринг контента выбранного клиента
    renderSelectedClientContent(clientName) {
        const container = document.getElementById('legal-selected-client-content');
        const clients = this.clientsByGroup[this.currentGroup] || [];
        const client = clients.find(c => c.name === clientName);
        
        // Получаем данные клиента
        const clientData = this.getClientData(clientName);
        const clientId = `CL-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

        container.innerHTML = `
            <!-- Кнопка возврата к списку клиентов -->
            <div class="legal-client-back-header">
                <button class="btn-back-to-clients" onclick="legalModule.goBack()">
                    <i class="fas fa-arrow-left"></i>
                    <span>Вернуться к списку клиентов</span>
                </button>
            </div>
            
            <div class="legal-client-detail-layout">
                <!-- Левая панель: Паспорт клиента -->
                <div class="legal-client-passport-sidebar">
                    <!-- Заголовок паспорта -->
                    <div class="legal-client-passport-header">
                        <div class="legal-client-passport-logo">
                            <div class="client-logo-placeholder">GLOBAL</div>
                        </div>
                        <div class="legal-client-passport-info">
                            <h2 class="legal-client-passport-name">${clientName}</h2>
                            <div class="legal-client-passport-id">ID Клиента: #${clientId}</div>
                            <div class="legal-client-passport-risk">
                                <span class="risk-badge high-risk">Высокий риск</span>
                            </div>
                        </div>
                    </div>

                    <!-- Навигация по вкладкам -->
                    <div class="legal-client-passport-nav">
                        <button class="legal-passport-nav-item active" onclick="legalModule.showPassportTab('calendar')" data-tab="calendar">
                            <i class="fas fa-calendar-alt"></i>
                            <span>Календарь</span>
                        </button>
                        <button class="legal-passport-nav-item" onclick="legalModule.showPassportTab('overview')" data-tab="overview">
                            <i class="fas fa-eye"></i>
                            <span>Обзор</span>
                        </button>
                        <button class="legal-passport-nav-item" onclick="legalModule.showPassportTab('documents')" data-tab="documents">
                            <i class="fas fa-folder"></i>
                            <span>Документы</span>
                        </button>
                    </div>

                    <!-- Основная информация клиента -->
                    <div class="legal-client-passport-details">
                        <div class="legal-client-detail-row">
                            <div class="legal-client-detail-label">ИНН</div>
                            <div class="legal-client-detail-value">${clientData.inn || '982-341-029'}</div>
                        </div>
                        <div class="legal-client-detail-row">
                            <div class="legal-client-detail-label">ОТРАСЛЬ</div>
                            <div class="legal-client-detail-value">${clientData.industry || 'Транспорт и тяжелая логистика'}</div>
                        </div>
                        <div class="legal-client-detail-row">
                            <div class="legal-client-detail-label">ЗАКОННЫЙ ПРЕДСТАВИТЕЛЬ</div>
                            <div class="legal-client-detail-value">${clientData.legalRepresentative || 'Алексей Волков'}</div>
                        </div>
                    </div>

                    <button class="btn-edit-profile" onclick="legalModule.editClientProfile()">
                        <i class="fas fa-pencil-alt"></i>
                        Редактировать профиль
                    </button>

                    <!-- Финансовые карточки -->
                    <div class="legal-passport-finance-cards">
                        <div class="legal-finance-card">
                            <div class="legal-finance-card-header">
                                <span class="legal-finance-card-title">Общая задолженность</span>
                                <i class="fas fa-arrow-up" style="color: var(--danger);"></i>
                            </div>
                            <div class="legal-finance-card-value">45,000,000 сум</div>
                            <div class="legal-finance-card-note">Увеличилась на 1.2 млн за прошлый месяц</div>
                        </div>
                        <div class="legal-finance-card">
                            <div class="legal-finance-card-header">
                                <span class="legal-finance-card-title">Назначенный юрист</span>
                            </div>
                            <div class="legal-lawyer-info">
                                <div class="legal-lawyer-avatar">ЕП</div>
                                <div class="legal-lawyer-name">Елена Петрова</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Правая область: Хронология -->
                <div class="legal-client-chronology-main">
                    <!-- Заголовок хронологии -->
                    <div class="legal-chronology-header">
                        <div class="legal-chronology-header-left">
                            <h2 class="legal-chronology-title">Хронология судебного процесса</h2>
                            <p class="legal-chronology-subtitle">История всех юридических действий в хронологическом порядке</p>
                        </div>
                        <div class="legal-chronology-stage-badge">
                            <span class="stage-dot"></span>
                            <span class="stage-text">Текущая стадия: Судебный процесс</span>
                        </div>
                    </div>

                    <!-- Контент вкладок -->
                    <div class="legal-client-passport-content">
                        <!-- Вкладка: Календарь -->
                        <div class="legal-passport-tab-content active" id="passport-tab-calendar">
                            <div class="legal-calendar-page-layout">
                                <!-- Левая панель: Уведомления календаря -->
                                <div class="legal-calendar-notifications-panel">
                                    <h3 class="legal-calendar-notifications-title">Календарные сообщения</h3>
                                    <div class="legal-calendar-notifications-list" id="legal-calendar-notifications-list">
                                        <!-- Уведомления будут заполнены динамически -->
                                    </div>
                                </div>
                                
                                <!-- Правая область: Календарь -->
                                <div class="legal-calendar-main-area">
                                    <h2 class="legal-calendar-page-title">Календарь событий</h2>
                                    <div class="legal-calendar-widget-full" id="legal-calendar-widget-full">
                                        <!-- Календарь будет заполнен динамически -->
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        
                        <!-- Вкладка: Обзор -->
                        <div class="legal-passport-tab-content" id="passport-tab-overview">
                            <div class="legal-timeline-container" id="legal-timeline-container">
                                <!-- Таймлайн будет заполнен динамически -->
                            </div>
                        </div>

                        <!-- Вкладка: Документы -->
                        <div class="legal-passport-tab-content" id="passport-tab-documents">
                            <div class="legal-documents-list" id="legal-documents-list">
                                <!-- Заполняется динамически -->
                            </div>
                        </div>

                        <!-- Вкладка: Финансы -->
                        <div class="legal-passport-tab-content" id="passport-tab-finance">
                            <div class="legal-finance-details" id="legal-finance-details">
                                <!-- Финансовая информация -->
                            </div>
                        </div>

                        <!-- Вкладка: Коммуникации -->
                        <div class="legal-passport-tab-content" id="passport-tab-communications">
                            <div class="legal-communications-list" id="legal-communications-list">
                                <div class="legal-communication-empty">
                                    <i class="fas fa-comments"></i>
                                    <p>Нет записей коммуникаций</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Плавающая кнопка добавления с выпадающим меню -->
                <div class="legal-floating-add-container">
                    <!-- Выпадающее меню действий -->
                    <div class="legal-add-actions-dropdown" id="legal-add-actions-dropdown">
                        <div class="legal-add-actions-title">ВЫБЕРИТЕ ДЕЙСТВИЕ</div>
                        <div class="legal-add-actions-list">
                            <button class="legal-add-action-item" onclick="legalModule.selectAction('talabnoma')">
                                <div class="legal-add-action-icon" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);">
                                    <i class="fas fa-exclamation-circle"></i>
                                </div>
                                <div class="legal-add-action-content">
                                    <div class="legal-add-action-title">Претензия (Талабнома)</div>
                                    <div class="legal-add-action-description">Подготовка досудебного требования</div>
                                </div>
                            </button>
                            <button class="legal-add-action-item" onclick="legalModule.selectAction('sud')">
                                <div class="legal-add-action-icon" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                                    <i class="fas fa-balance-scale"></i>
                                </div>
                                <div class="legal-add-action-content">
                                    <div class="legal-add-action-title">Суд и исполнительный лист</div>
                                    <div class="legal-add-action-description">Исковое производство и исполнение</div>
                                </div>
                            </button>
                            <button class="legal-add-action-item" onclick="legalModule.selectAction('bankrot')">
                                <div class="legal-add-action-icon" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
                                    <i class="fas fa-building"></i>
                                </div>
                                <div class="legal-add-action-content">
                                    <div class="legal-add-action-title">Банкротство</div>
                                    <div class="legal-add-action-description">Процедура несостоятельности</div>
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Кнопка добавления -->
                    <button class="legal-floating-add-btn" onclick="legalModule.toggleAddActions()" id="legal-floating-add-btn">
                        <i class="fas fa-plus"></i>
                        <span>Добавить</span>
                    </button>
                </div>
            </div>
        `;

        // Рендерим контент вкладок
        setTimeout(() => {
            this.renderTimeline(clientName);
            this.renderDocumentsList(clientName);
            this.renderCalendarFull(clientName);
            this.renderCalendarNotifications(clientName);
        }, 100);
        
        // Обновляем breadcrumbs
        this.updateBreadcrumbs(['Все клиенты', `Детали дела: ${clientName}`]);
    },
    
    // Получение данных клиента
    getClientData(clientName) {
        // Ищем клиента в данных групп
        for (const groupName in this.clientsByGroup) {
            const client = this.clientsByGroup[groupName].find(c => c.name === clientName);
            if (client) {
                return {
                    inn: client.inn || '982-341-029',
                    industry: client.industry || 'Транспорт и тяжелая логистика',
                    legalRepresentative: client.legalRepresentative || 'Алексей Волков',
                    nibbd: client.nibbd || '175464',
                    riskLevel: 'high'
                };
            }
        }
        
        // Дефолтные данные
        return {
            inn: '982-341-029',
            industry: 'Транспорт и тяжелая логистика',
            legalRepresentative: 'Алексей Волков',
            nibbd: '175464',
            riskLevel: 'high'
        };
    },
    
    // Переключение вкладок паспорта
    showPassportTab(tabName) {
        // Убираем активный класс со всех вкладок
        document.querySelectorAll('.legal-passport-nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.legal-passport-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Активируем выбранную вкладку
        const navItem = document.querySelector(`[data-tab="${tabName}"]`);
        const tabContent = document.getElementById(`passport-tab-${tabName}`);
        
        if (navItem) navItem.classList.add('active');
        if (tabContent) tabContent.classList.add('active');
    },
    
    // Рендеринг таймлайна хронологии
    renderTimeline(clientName) {
        const container = document.getElementById('legal-timeline-container');
        if (!container) return;
        
        const cases = this.legalCases[clientName] || [];
        
        if (cases.length === 0) {
            container.innerHTML = `
                <div class="legal-timeline-empty">
                    <i class="fas fa-folder-open"></i>
                    <p>Нет добавленных дел</p>
                </div>
            `;
            return;
        }
        
        // Сортируем дела по дате (новые сверху)
        const sortedCases = this.expandCasesForChronology(cases).sort((a, b) => {
            try {
                const dateA = new Date(a.date.split('.').reverse().join('-'));
                const dateB = new Date(b.date.split('.').reverse().join('-'));
                return dateB - dateA;
            } catch (e) {
                return 0;
            }
        });
        
        // Определяем, какие события являются недавними (за последние 30 дней)
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        
        container.innerHTML = `
            <div class="legal-timeline">
                ${sortedCases.map((caseItem, index) => {
                    let eventDate;
                    try {
                        if (caseItem.date && caseItem.date !== '-') {
                            const [day, month, year] = caseItem.date.split('.');
                            eventDate = new Date(year, parseInt(month) - 1, parseInt(day));
                        }
                    } catch (e) {
                        eventDate = null;
                    }
                    
                    const isRecent = eventDate && eventDate >= thirtyDaysAgo;
                    const isFirst = index === 0;
                    
                    // Определяем тип события и иконку
                    let eventTitle = '';
                    let eventIcon = 'fas fa-file-alt';
                    let eventDescription = '';
                    let eventFiles = [];
                    
                    if (caseItem.type === 'talabnoma') {
                        eventTitle = 'Отправлена претензия (Талабнома)';
                        eventIcon = 'fas fa-envelope';
                        eventDescription = caseItem.description || 'Официальное письмо-требование отправлено заказным письмом. Получение подтверждено.';
                        eventFiles = caseItem.files || [];
                    } else if (caseItem.type === 'sud') {
                        if (caseItem.isQaror) {
                            eventTitle = 'Суд қарори';
                            eventIcon = 'fas fa-gavel';
                            eventDescription = caseItem.description || 'Решение суда по делу.';
                            eventFiles = caseItem.qarorFiles || [];
                        } else if (caseItem.isIjro) {
                            eventTitle = 'Ижро иши';
                            eventIcon = 'fas fa-file-contract';
                            eventDescription = caseItem.description || 'Исполнительное производство.';
                            eventFiles = caseItem.files || [];
                        } else if (caseItem.instanceInfo && caseItem.instanceInfo.includes('1-инстанция')) {
                            eventTitle = 'Проведено судебное заседание';
                            eventIcon = 'fas fa-gavel';
                            eventDescription = caseItem.description || 'Предварительное слушание по взысканию задолженности. Судья Робертсон. Перенесено на 10 июня.';
                            eventFiles = [];
                        } else {
                            eventTitle = 'Судебное производство';
                            eventIcon = 'fas fa-balance-scale';
                            eventDescription = caseItem.description || 'Судебное разбирательство по делу.';
                            eventFiles = [];
                        }
                    } else {
                        eventTitle = 'Дело открыто';
                        eventIcon = 'fas fa-folder-open';
                        eventDescription = caseItem.description || 'Первичная документация клиента получена, юридическое досье.';
                        eventFiles = [];
                    }
                    
                        // Форматируем дату
                        let formattedDate = caseItem.date || '-';
                        let dateDisplay = formattedDate;
                        if (eventDate) {
                            const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                                           'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
                            formattedDate = `${eventDate.getDate()} ${months[eventDate.getMonth()]} ${eventDate.getFullYear()}`;
                            // Также показываем оригинальную дату для точности
                            dateDisplay = formattedDate;
                        }
                        
                        return `
                            <div class="legal-timeline-item ${isRecent ? 'recent' : ''} ${isFirst ? 'first' : ''}">
                                <div class="legal-timeline-marker">
                                    <div class="legal-timeline-icon ${isRecent ? 'recent-icon' : ''}">
                                        <i class="${eventIcon}"></i>
                                    </div>
                                    ${index < sortedCases.length - 1 ? '<div class="legal-timeline-line"></div>' : ''}
                                </div>
                                <div class="legal-timeline-content">
                                    <div class="legal-timeline-date">
                                        ${dateDisplay}
                                        ${isRecent ? '<span class="legal-timeline-recent-badge">недавно</span>' : ''}
                                    </div>
                                    <div class="legal-timeline-event">
                                        <h4 class="legal-timeline-event-title">${eventTitle}</h4>
                                        <p class="legal-timeline-event-description">${eventDescription}</p>
                                        ${eventFiles.length > 0 ? `
                                        <div class="legal-timeline-files">
                                            ${eventFiles.map(file => `
                                                <a href="#" class="legal-timeline-file-link" onclick="event.preventDefault(); legalModule.downloadFile('${file}')">
                                                    <i class="fas fa-paperclip"></i>
                                                    ${file}
                                                </a>
                                            `).join('')}
                                        </div>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        `;
                }).join('')}
            </div>
        `;
    },
    
    // Скачивание файла
    downloadFile(fileName) {
        alert(`Скачивание файла: ${fileName}`);
        // В реальном проекте здесь будет логика скачивания
    },
    
    // Рендеринг полного календаря
    renderCalendarFull(clientName) {
        const container = document.getElementById('legal-calendar-widget-full');
        if (!container) return;
        
        this.renderCalendarWidgetInternal(container, clientName);
    },
    
    // Рендеринг календаря с уведомлениями (старая версия для обзора)
    renderCalendarWidget(clientName) {
        const container = document.getElementById('legal-calendar-widget');
        if (!container) return;
        
        this.renderCalendarWidgetInternal(container, clientName);
    },
    
    // Внутренняя функция рендеринга календаря
    renderCalendarWidgetInternal(container, clientName) {
        
        const cases = this.legalCases[clientName] || [];
        const expandedCases = this.expandCasesForChronology(cases);
        
        // Собираем все даты с событиями
        const eventsByDate = {};
        expandedCases.forEach(caseItem => {
            if (!caseItem.date || caseItem.date === '-') return;
            
            try {
                const [day, month, year] = caseItem.date.split('.');
                const dateKey = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                
                if (!eventsByDate[dateKey]) {
                    eventsByDate[dateKey] = [];
                }
                
                let eventTitle = '';
                if (caseItem.type === 'talabnoma') {
                    eventTitle = 'Талабнома';
                } else if (caseItem.type === 'sud') {
                    if (caseItem.isQaror) {
                        eventTitle = 'Суд қарори';
                    } else if (caseItem.isIjro) {
                        eventTitle = 'Ижро иши';
                    } else {
                        eventTitle = 'Судебное заседание';
                    }
                }
                
                eventsByDate[dateKey].push({
                    title: eventTitle,
                    date: caseItem.date
                });
            } catch (e) {
                console.error('Error parsing date:', caseItem.date);
            }
        });
        
        // Получаем текущий месяц
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        // Генерируем календарь на текущий месяц
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                           'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        
        let calendarHTML = `
            <div class="legal-calendar-header">
                <h5 class="legal-calendar-month-title">${monthNames[currentMonth]} ${currentYear}</h5>
            </div>
            <div class="legal-calendar-grid">
                <div class="legal-calendar-weekdays">
                    ${dayNames.map(day => `<div class="legal-calendar-weekday">${day}</div>`).join('')}
                </div>
                <div class="legal-calendar-days">
        `;
        
        // Пустые ячейки для дней до начала месяца
        for (let i = 0; i < startingDayOfWeek; i++) {
            calendarHTML += '<div class="legal-calendar-day empty"></div>';
        }
        
        // Дни месяца
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = eventsByDate[dateKey] || [];
            const isToday = day === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear();
            const hasEvents = dayEvents.length > 0;
            
            calendarHTML += `
                <div class="legal-calendar-day ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}" 
                     ${hasEvents ? `title="${dayEvents.map(e => e.title).join(', ')}"` : ''}>
                    <span class="legal-calendar-day-number">${day}</span>
                    ${hasEvents ? `<div class="legal-calendar-event-dot"></div>` : ''}
                </div>
            `;
        }
        
        calendarHTML += `
                </div>
            </div>
            ${Object.keys(eventsByDate).length > 0 ? `
            <div class="legal-calendar-events-list">
                <h6 class="legal-calendar-events-title">Ближайшие события</h6>
                ${Object.keys(eventsByDate).sort().slice(0, 5).map(dateKey => {
                    const events = eventsByDate[dateKey];
                    const [year, month, day] = dateKey.split('-');
                    const date = new Date(year, parseInt(month) - 1, day);
                    const formattedDate = `${day}.${month}.${year}`;
                    
                    return events.map(event => `
                        <div class="legal-calendar-event-item">
                            <div class="legal-calendar-event-date">${formattedDate}</div>
                            <div class="legal-calendar-event-title">${event.title}</div>
                        </div>
                    `).join('');
                }).join('')}
            </div>
            ` : ''}
        `;
        
        container.innerHTML = calendarHTML;
        
        // Добавляем обработчики кликов на даты (только для полного календаря)
        if (container.id === 'legal-calendar-widget-full') {
            const calendarDays = container.querySelectorAll('.legal-calendar-day:not(.empty)');
            calendarDays.forEach(day => {
                day.style.cursor = 'pointer';
                day.addEventListener('click', (e) => {
                    const dayNumber = day.querySelector('.legal-calendar-day-number')?.textContent;
                    if (dayNumber) {
                        this.openDateEventModal(clientName, dayNumber);
                    }
                });
            });
        }
    },
    
    // Рендеринг уведомлений календаря
    renderCalendarNotifications(clientName) {
        const container = document.getElementById('legal-calendar-notifications-list');
        if (!container) return;
        
        const cases = this.legalCases[clientName] || [];
        const expandedCases = this.expandCasesForChronology(cases);
        
        // Собираем все события с датами
        const events = [];
        expandedCases.forEach(caseItem => {
            if (!caseItem.date || caseItem.date === '-') return;
            
            try {
                const [day, month, year] = caseItem.date.split('.');
                const dateKey = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                const date = new Date(year, parseInt(month) - 1, day);
                
                let eventTitle = '';
                if (caseItem.type === 'talabnoma') {
                    eventTitle = 'Талабнома';
                } else if (caseItem.type === 'sud') {
                    if (caseItem.isQaror) {
                        eventTitle = 'Суд қарори';
                    } else if (caseItem.isIjro) {
                        eventTitle = 'Ижро иши';
                    } else {
                        eventTitle = 'Судебное заседание';
                    }
                }
                
                events.push({
                    date: caseItem.date,
                    dateKey: dateKey,
                    dateObj: date,
                    title: eventTitle,
                    description: caseItem.description || '',
                    type: caseItem.type
                });
            } catch (e) {
                console.error('Error parsing date:', caseItem.date);
            }
        });
        
        // Сортируем по дате (новые первыми)
        events.sort((a, b) => b.dateObj - a.dateObj);
        
        if (events.length === 0) {
            container.innerHTML = `
                <div class="legal-calendar-notification-empty">
                    <i class="fas fa-calendar-times"></i>
                    <p>Нет запланированных событий</p>
                </div>
            `;
            return;
        }
        
        // Группируем по датам
        const eventsByDate = {};
        events.forEach(event => {
            if (!eventsByDate[event.dateKey]) {
                eventsByDate[event.dateKey] = [];
            }
            eventsByDate[event.dateKey].push(event);
        });
        
        // Формируем HTML
        const sortedDates = Object.keys(eventsByDate).sort().reverse();
        container.innerHTML = sortedDates.slice(0, 10).map(dateKey => {
            const dateEvents = eventsByDate[dateKey];
            const firstEvent = dateEvents[0];
            const [year, month, day] = dateKey.split('-');
            const formattedDate = `${day}.${month}.${year}`;
            
            return `
                <div class="legal-calendar-notification-item">
                    <div class="legal-calendar-notification-date">${formattedDate}</div>
                    ${dateEvents.map(event => `
                        <div class="legal-calendar-notification-event">
                            <div class="legal-calendar-notification-event-title">${event.title}</div>
                            ${event.description ? `<div class="legal-calendar-notification-event-description">${event.description}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }).join('');
    },
    
    // Открытие модального окна для добавления события на дату
    openDateEventModal(clientName, dayNumber) {
        // Получаем текущий месяц и год из календаря
        const calendarHeader = document.querySelector('.legal-calendar-month-title');
        if (!calendarHeader) return;
        
        const headerText = calendarHeader.textContent.trim();
        const [monthName, year] = headerText.split(' ');
        
        const monthNames = {
            'Январь': 0, 'Февраль': 1, 'Март': 2, 'Апрель': 3, 'Май': 4, 'Июнь': 5,
            'Июль': 6, 'Август': 7, 'Сентябрь': 8, 'Октябрь': 9, 'Ноябрь': 10, 'Декабрь': 11
        };
        
        const monthIndex = monthNames[monthName];
        if (monthIndex === undefined) return;
        
        const selectedDate = new Date(parseInt(year), monthIndex, parseInt(dayNumber));
        const formattedDate = `${String(dayNumber).padStart(2, '0')}.${String(monthIndex + 1).padStart(2, '0')}.${year}`;
        
        // Сохраняем выбранную дату для использования при добавлении события
        this.selectedCalendarDate = formattedDate;
        
        // Показываем выпадающее меню действий через основную кнопку
        this.toggleAddActions();
    },
    
    // Разворачивание дел для хронологии
    expandCasesForChronology(cases) {
        const expanded = [];
        const instanceNames = {
            '1-instance': '1-инстанция',
            'apellyatsiya': 'Апелляция',
            'kassatsiya': 'Кассация',
            'taftish': 'Тафтиш',
            'oliy-sud': 'Олий Суд'
        };
        
        cases.forEach((caseItem, caseIndex) => {
            if (caseItem.type === 'talabnoma') {
                expanded.push({
                    type: 'talabnoma',
                    date: caseItem.date,
                    instanceInfo: '-',
                    summa: '-',
                    description: caseItem.talabnoma || caseItem.izoh,
                    files: caseItem.files || [],
                    originalIndex: caseIndex
                });
            } else if (caseItem.type === 'sud' && caseItem.instances) {
                caseItem.instances.forEach((instance, instIndex) => {
                    // Добавляем событие для инстанции
                    expanded.push({
                        type: 'sud',
                        date: instance.date || '-',
                        instanceInfo: instanceNames[instance.instanceType] || instance.instanceType || '-',
                        summa: instance.summa ? instance.summa.toLocaleString('ru-RU') : '-',
                        description: instance.izoh || 'Судебное разбирательство',
                        files: [],
                        originalIndex: caseIndex,
                        instanceIndex: instIndex
                    });
                    
                    // Добавляем событие для суд қарори, если есть
                    if (instance.qaror && instance.qaror.date) {
                        expanded.push({
                            type: 'sud',
                            date: instance.qaror.date,
                            instanceInfo: instanceNames[instance.instanceType] || '-',
                            summa: instance.qaror.summa ? instance.qaror.summa.toLocaleString('ru-RU') : '-',
                            description: instance.qaror.izoh || 'Суд қарори',
                            qarorFiles: instance.qaror.files || [],
                            originalIndex: caseIndex,
                            instanceIndex: instIndex,
                            isQaror: true
                        });
                    }
                    
                    // Добавляем событие для ижро иши, если есть
                    if (instance.ijro && instance.ijro.date) {
                        expanded.push({
                            type: 'sud',
                            date: instance.ijro.date,
                            instanceInfo: 'Ижро иши',
                            summa: '-',
                            description: instance.ijro.izoh || 'Ижро иши',
                            files: instance.ijro.files || [],
                            originalIndex: caseIndex,
                            instanceIndex: instIndex,
                            isIjro: true
                        });
                    }
                });
            } else if (caseItem.type === 'bankrotstvo') {
                expanded.push({
                    type: 'bankrotstvo',
                    date: caseItem.date || '-',
                    instanceInfo: '-',
                    summa: '-',
                    description: caseItem.izoh || 'Процедура банкротства',
                    files: [],
                    originalIndex: caseIndex
                });
            }
        });
        
        return expanded;
    },
    
    // Рендеринг календаря с делами
    renderCasesCalendar(clientName) {
        const container = document.getElementById('legal-cases-calendar');
        if (!container) return;
        
        const cases = this.legalCases[clientName] || [];
        const expandedCases = this.expandCasesForChronology(cases);
        
        // Группируем дела по месяцам
        const casesByMonth = {};
        expandedCases.forEach(caseItem => {
            if (!caseItem.date || caseItem.date === '-') return;
            
            try {
                const [day, month, year] = caseItem.date.split('.');
                const monthKey = `${year}-${month.padStart(2, '0')}`;
                const monthName = new Date(year, parseInt(month) - 1).toLocaleString('ru-RU', { month: 'long', year: 'numeric' });
                
                if (!casesByMonth[monthKey]) {
                    casesByMonth[monthKey] = {
                        monthName: monthName,
                        cases: []
                    };
                }
                casesByMonth[monthKey].cases.push(caseItem);
            } catch (e) {
                console.error('Error parsing date:', caseItem.date);
            }
        });
        
        if (Object.keys(casesByMonth).length === 0) {
            container.innerHTML = `
                <div class="legal-calendar-empty">
                    <i class="fas fa-calendar"></i>
                    <p>Нет дел с датами для отображения в календаре</p>
                </div>
            `;
            return;
        }
        
        // Сортируем месяцы
        const sortedMonths = Object.keys(casesByMonth).sort().reverse();
        
        container.innerHTML = sortedMonths.map(monthKey => {
            const monthData = casesByMonth[monthKey];
            return `
                <div class="legal-calendar-month">
                    <h5 class="legal-calendar-month-title">${monthData.monthName}</h5>
                    <div class="legal-calendar-month-cases">
                        ${monthData.cases.map(caseItem => {
                            const caseTypeName = caseItem.type === 'talabnoma' ? 'Талабнома' : 
                                                 caseItem.type === 'sud' ? 'Суд ва ижро варакаси' : 
                                                 'Банкротство';
                            return `
                                <div class="legal-calendar-case-item">
                                    <div class="legal-calendar-case-date">${caseItem.date}</div>
                                    <div class="legal-calendar-case-type">${caseTypeName}</div>
                                    ${caseItem.instanceInfo && caseItem.instanceInfo !== '-' ? `
                                    <div class="legal-calendar-case-instance">${caseItem.instanceInfo}</div>
                                    ` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
    },
    
    // Рендеринг списка документов
    renderDocumentsList(clientName) {
        const container = document.getElementById('legal-documents-list');
        if (!container) return;
        
        const cases = this.legalCases[clientName] || [];
        const documents = [];
        
        // Собираем все документы из дел
        cases.forEach((caseItem, caseIndex) => {
            if (caseItem.type === 'talabnoma' && caseItem.files && caseItem.files.length > 0) {
                caseItem.files.forEach((fileName, fileIndex) => {
                    documents.push({
                        name: fileName,
                        type: 'Талабнома',
                        date: caseItem.date,
                        description: caseItem.izoh || 'Документ талабнома',
                        caseIndex: caseIndex,
                        fileIndex: fileIndex
                    });
                });
            } else if (caseItem.type === 'sud' && caseItem.instances) {
                caseItem.instances.forEach((instance, instIndex) => {
                    if (instance.qaror && instance.qaror.files && instance.qaror.files.length > 0) {
                        instance.qaror.files.forEach((fileName, fileIndex) => {
                            documents.push({
                                name: fileName,
                                type: 'Суд қарори',
                                date: instance.qaror.date || instance.date,
                                description: instance.qaror.izoh || 'Документ суд қарори',
                                caseIndex: caseIndex,
                                instanceIndex: instIndex,
                                fileIndex: fileIndex
                            });
                        });
                    }
                    if (instance.ijro && instance.ijro.files && instance.ijro.files.length > 0) {
                        instance.ijro.files.forEach((fileName, fileIndex) => {
                            documents.push({
                                name: fileName,
                                type: 'Ижро иши',
                                date: instance.ijro.date || instance.date,
                                description: instance.ijro.izoh || 'Документ ижро иши',
                                caseIndex: caseIndex,
                                instanceIndex: instIndex,
                                fileIndex: fileIndex
                            });
                        });
                    }
                });
            }
        });
        
        if (documents.length === 0) {
            container.innerHTML = `
                <div class="legal-documents-empty">
                    <i class="fas fa-folder-open"></i>
                    <p>Нет прикрепленных документов</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = documents.map((doc, index) => `
            <div class="legal-document-item">
                <div class="legal-document-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="legal-document-info">
                    <div class="legal-document-name">${doc.name}</div>
                    <div class="legal-document-meta">
                        <span class="legal-document-type">${doc.type}</span>
                        <span class="legal-document-separator">•</span>
                        <span class="legal-document-date">${doc.date || '-'}</span>
                    </div>
                    ${doc.description ? `
                    <div class="legal-document-description">
                        <i class="fas fa-info-circle"></i>
                        ${doc.description}
                    </div>
                    ` : ''}
                </div>
                <div class="legal-document-actions">
                    <button class="action-btn edit" title="Скачать">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="action-btn edit" title="Просмотр">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },
    
    // Редактирование профиля клиента
    editClientProfile() {
        alert('Функционал редактирования профиля будет реализован дополнительно');
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

        // Рендерим список дел клиента
        this.renderClientCases(clientName);
    },

    // Рендеринг списка дел клиента
    renderClientCases(clientName) {
        const tableBody = document.getElementById('legal-cases-table-body');
        if (!tableBody) return;

        const cases = this.legalCases[clientName] || [];

        if (cases.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center" style="padding: 40px; color: var(--text-secondary);">
                        <i class="fas fa-folder-open" style="font-size: 48px; margin-bottom: 16px; display: block; opacity: 0.3;"></i>
                        Нет добавленных дел
                    </td>
                </tr>
            `;
            return;
        }

        // Разделяем дела на отдельные записи
        const expandedCases = [];
        let rowIndex = 0;

        cases.forEach((caseItem, caseIndex) => {
            if (caseItem.type === 'talabnoma') {
                // Талабнома - отдельная запись
                expandedCases.push({
                    type: 'talabnoma',
                    date: caseItem.date,
                    instanceInfo: '-',
                    summa: '-',
                    originalIndex: caseIndex,
                    rowIndex: rowIndex++
                });
            } else if (caseItem.type === 'sud' && caseItem.instances && caseItem.instances.length > 0) {
                // Суд ва ижро - каждая инстанция отдельной записью
                caseItem.instances.forEach((instance, instIndex) => {
                    const instanceNames = {
                        '1-instance': '1-инстанция',
                        'apellyatsiya': 'Апелляция',
                        'kassatsiya': 'Кассация',
                        'taftish': 'Тафтиш',
                        'oliy-sud': 'Олий Суд'
                    };

                    expandedCases.push({
                        type: 'sud',
                        date: instance.date || '-',
                        instanceInfo: instanceNames[instance.instanceType] || instance.instanceType || '-',
                        summa: instance.summa ? instance.summa.toLocaleString('ru-RU') : '-',
                        originalIndex: caseIndex,
                        instanceIndex: instIndex,
                        rowIndex: rowIndex++
                    });
                });
            } else if (caseItem.type === 'sud') {
                // Суд без инстанций
                expandedCases.push({
                    type: 'sud',
                    date: '-',
                    instanceInfo: '-',
                    summa: '-',
                    originalIndex: caseIndex,
                    rowIndex: rowIndex++
                });
            } else {
                // Банкротство или другие типы
                expandedCases.push({
                    type: caseItem.type,
                    date: caseItem.date || '-',
                    instanceInfo: '-',
                    summa: '-',
                    originalIndex: caseIndex,
                    rowIndex: rowIndex++
                });
            }
        });

        if (expandedCases.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center" style="padding: 40px; color: var(--text-secondary);">
                        <i class="fas fa-folder-open" style="font-size: 48px; margin-bottom: 16px; display: block; opacity: 0.3;"></i>
                        Нет добавленных дел
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = expandedCases.map((expandedCase) => {
            const caseTypeName = expandedCase.type === 'talabnoma' ? 'Талабнома' : 
                                 expandedCase.type === 'sud' ? 'Суд ва ижро варакаси' : 
                                 'Банкротство';

            return `
                <tr>
                    <td>${expandedCase.rowIndex + 1}</td>
                    <td>${caseTypeName}</td>
                    <td>${expandedCase.date}</td>
                    <td>${expandedCase.instanceInfo}</td>
                    <td>${expandedCase.summa}</td>
                    <td><span class="badge badge-info">В работе</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn edit" title="View" onclick="legalModule.viewCase('${clientName.replace(/'/g, "\\'")}', ${expandedCase.originalIndex}${expandedCase.instanceIndex !== undefined ? `, ${expandedCase.instanceIndex}` : ''})">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn delete" title="Delete" onclick="legalModule.deleteCase('${clientName.replace(/'/g, "\\'")}', ${expandedCase.originalIndex}${expandedCase.instanceIndex !== undefined ? `, ${expandedCase.instanceIndex}` : ''})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    },

    // Назад
    goBack() {
        if (this.currentClient) {
            // Возвращаемся к группе, сбрасываем выбранного клиента
            this.currentClient = null;
            
            // Показываем боковую панель с клиентами
            const sidebar = document.querySelector('.legal-clients-sidebar');
            if (sidebar) {
                sidebar.style.display = 'block';
            }

            // Возвращаем layout на две колонки
            const layout = document.querySelector('.legal-group-layout');
            if (layout) {
                layout.classList.remove('client-selected');
            }
            
            // Показываем историю группы
            if (this.currentGroup) {
                this.renderGroupHistory(this.currentGroup);
            }
            document.getElementById('legal-group-empty').style.display = 'block';
            document.getElementById('legal-selected-client-content').style.display = 'none';
            
            // Убираем активный класс со всех элементов
            const sidebarItems = document.querySelectorAll('.legal-client-sidebar-item');
            sidebarItems.forEach(item => item.classList.remove('active'));
            
            // Обновляем breadcrumbs
            this.updateBreadcrumbs(['Главная', 'Группы', `Клиенты МЧЖ "${this.currentGroup}"`]);
        } else if (this.currentPage === 'group') {
            // Возвращаемся на главную
            this.currentPage = 'main';
            this.currentGroup = null;
            document.getElementById('legal-group-page').style.display = 'none';
            document.getElementById('legal-main-page').style.display = 'block';
            this.updateBreadcrumbs(['Главная']);
        } else {
            window.location.href = 'index.html';
        }
    },

    // Обновление breadcrumbs
    updateBreadcrumbs(items) {
        const breadcrumbs = document.getElementById('legal-breadcrumbs');
        if (!breadcrumbs) return;
        
        breadcrumbs.innerHTML = items.map((item, index) => {
            if (index === 0) {
                return `<i class="fas fa-home"></i><span class="breadcrumb-separator">/</span><span>${item}</span>`;
            }
            return `<span class="breadcrumb-separator">/</span><span>${item}</span>`;
        }).join('');
    },

    // Переключение выпадающего меню действий
    toggleAddActions() {
        const dropdown = document.getElementById('legal-add-actions-dropdown');
        if (!dropdown) return;
        
        const isVisible = dropdown.classList.contains('show');
        
        if (isVisible) {
            dropdown.classList.remove('show');
            document.removeEventListener('click', this.closeAddActionsOnClickOutside.bind(this));
        } else {
            dropdown.classList.add('show');
            // Закрываем меню при клике вне его
            setTimeout(() => {
                document.addEventListener('click', this.closeAddActionsOnClickOutside.bind(this));
            }, 100);
        }
    },
    
    // Закрытие меню при клике вне его
    closeAddActionsOnClickOutside(event) {
        const dropdown = document.getElementById('legal-add-actions-dropdown');
        const button = document.getElementById('legal-floating-add-btn');
        
        if (!dropdown || !button) return;
        
        if (!dropdown.contains(event.target) && !button.contains(event.target)) {
            dropdown.classList.remove('show');
            document.removeEventListener('click', this.closeAddActionsOnClickOutside.bind(this));
        }
    },
    
    // Открытие модального окна добавления действия (старый метод, оставлен для совместимости)
    openAddModal() {
        this.toggleAddActions();
    },

    // Инициализация date pickers в модальном окне
    initModalDatePickers(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            const dateInputs = modal.querySelectorAll('.legal-date-input:not([data-fp-initialized])');
            dateInputs.forEach(input => {
                flatpickr(input, {
                    dateFormat: 'm/d/Y',
                    locale: 'ru',
                    allowInput: true,
                    altInput: false
                });
                input.dataset.fpInitialized = 'true';
            });
        }
    },

    // Выбор действия
    selectAction(action) {
        this.currentAction = action;
        
        // Очищаем сохраненные верхние данные при выборе нового действия
        this.lastInstanceTopData = null;
        
        // Закрываем выпадающее меню
        const dropdown = document.getElementById('legal-add-actions-dropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
        document.removeEventListener('click', this.closeAddActionsOnClickOutside.bind(this));

        if (action === 'talabnoma') {
            const talabnomaModal = new bootstrap.Modal(document.getElementById('legal-talabnoma-modal'));
            talabnomaModal.show();
            // Инициализируем date pickers после показа модального окна
            setTimeout(() => {
                this.initModalDatePickers('legal-talabnoma-modal');
            }, 100);
        } else         if (action === 'sud') {
            const instanceModal = new bootstrap.Modal(document.getElementById('legal-instance-modal'));
            instanceModal.show();
            // Сохраняем выбранную дату для использования после выбора инстанции
            // Дата будет подставлена в форму инстанции
        } else if (action === 'bankrot') {
            alert('Функционал банкротства будет реализован дополнительно');
            // В будущем здесь будет модальное окно для банкротства
        }
    },

    // Сохранение Талабнома (закрывает форму)
    saveTalabnoma() {
        const form = document.getElementById('legal-talabnoma-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Если была выбрана дата из календаря, используем её
        if (this.selectedCalendarDate && !data.date) {
            data.date = this.selectedCalendarDate;
        }
        // Сбрасываем выбранную дату после использования
        this.selectedCalendarDate = null;

        // Сохраняем данные талабнома
        if (!this.legalCases[this.currentClient]) {
            this.legalCases[this.currentClient] = [];
        }

        const talabnomaCase = {
            type: 'talabnoma',
            date: data.date,
            talabnoma: data.talabnoma,
            taraf: data.taraf,
            izoh: data.izoh,
            files: []
        };

        const fileInput = form.querySelector('input[name="file"]');
        if (fileInput && fileInput.files.length > 0) {
            talabnomaCase.files = Array.from(fileInput.files).map(f => f.name);
        }

        this.legalCases[this.currentClient].push(talabnomaCase);

        // Показываем сообщение об успехе
        const successMsg = document.createElement('div');
        successMsg.className = 'alert alert-success alert-dismissible fade show';
        successMsg.style.position = 'fixed';
        successMsg.style.top = '20px';
        successMsg.style.right = '20px';
        successMsg.style.zIndex = '9999';
        successMsg.style.minWidth = '300px';
        successMsg.innerHTML = `
            <strong>Успешно!</strong> Талабнома сохранена.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(successMsg);
        setTimeout(() => {
            successMsg.remove();
        }, 3000);

        // Очищаем форму
        form.reset();
        
        const dateInputs = form.querySelectorAll('.legal-date-input');
        dateInputs.forEach(input => {
            if (input._flatpickr) {
                input._flatpickr.clear();
            }
        });

        // Сбрасываем файловый инпут
        if (fileInput) {
            fileInput.value = '';
            const uploadText = fileInput.closest('.file-upload-area')?.querySelector('.file-upload-text');
            if (uploadText) {
                uploadText.textContent = 'Перетащите файлы сюда или нажмите для выбора';
            }
        }

        // Обновляем список дел
        this.renderClientCases(this.currentClient);
        
        // Обновляем таймлайн, если открыт паспорт клиента
        if (document.getElementById('legal-timeline-container')) {
            this.renderTimeline(this.currentClient);
        }
        
        // Обновляем календарь, если открыт паспорт клиента
        if (document.getElementById('legal-calendar-widget')) {
            this.renderCalendarWidget(this.currentClient);
        }
        
        // Обновляем полный календарь и уведомления
        if (document.getElementById('legal-calendar-widget-full')) {
            this.renderCalendarFull(this.currentClient);
            this.renderCalendarNotifications(this.currentClient);
        }

        // Закрываем модальное окно
        const modal = bootstrap.Modal.getInstance(document.getElementById('legal-talabnoma-modal'));
        if (modal) {
            modal.hide();
        }
    },

    // Добавление Талабнома (старая функция, оставлена для совместимости)
    addTalabnoma() {
        const form = document.getElementById('legal-talabnoma-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Сохраняем данные талабнома
        if (!this.legalCases[this.currentClient]) {
            this.legalCases[this.currentClient] = [];
        }

        const talabnomaCase = {
            type: 'talabnoma',
            date: data.date,
            talabnoma: data.talabnoma,
            taraf: data.taraf,
            izoh: data.izoh,
            files: []
        };

        // Сохраняем информацию о файлах
        const fileInput = form.querySelector('input[name="file"]');
        if (fileInput && fileInput.files.length > 0) {
            talabnomaCase.files = Array.from(fileInput.files).map(f => f.name);
        }

        this.legalCases[this.currentClient].push(talabnomaCase);

        console.log('Talabnoma data saved:', talabnomaCase);

        // Показываем сообщение об успехе
        const successMsg = document.createElement('div');
        successMsg.className = 'alert alert-success alert-dismissible fade show';
        successMsg.style.position = 'fixed';
        successMsg.style.top = '20px';
        successMsg.style.right = '20px';
        successMsg.style.zIndex = '9999';
        successMsg.style.minWidth = '300px';
        successMsg.innerHTML = `
            <strong>Успешно!</strong> Талабнома добавлена.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(successMsg);
        setTimeout(() => {
            successMsg.remove();
        }, 3000);

        // Очищаем форму
        form.reset();
        
        // Сбрасываем date pickers
        const dateInputs = form.querySelectorAll('.legal-date-input');
        dateInputs.forEach(input => {
            if (input._flatpickr) {
                input._flatpickr.clear();
            }
        });

        // Обновляем список дел
        this.renderClientCases(this.currentClient);
        
        // Обновляем таймлайн, если открыт паспорт клиента
        if (document.getElementById('legal-timeline-container')) {
            this.renderTimeline(this.currentClient);
        }
        
        // Обновляем календарь, если открыт паспорт клиента
        if (document.getElementById('legal-calendar-widget')) {
            this.renderCalendarWidget(this.currentClient);
        }

        // Спрашиваем, что делать дальше
        setTimeout(() => {
            const action = confirm('Талабнома успешно добавлена!\n\nНажмите OK, чтобы добавить судебную инстанцию к этому делу.\nНажмите Отмена, чтобы закрыть форму.');
            
            if (action) {
                // Добавляем судебную инстанцию
                const modal = bootstrap.Modal.getInstance(document.getElementById('legal-talabnoma-modal'));
                if (modal) {
                    modal.hide();
                }
                setTimeout(() => {
                    const instanceModal = new bootstrap.Modal(document.getElementById('legal-instance-modal'));
                    instanceModal.show();
                }, 300);
            } else {
                // Закрываем модальное окно, но форма остается доступной для повторного добавления
                const modal = bootstrap.Modal.getInstance(document.getElementById('legal-talabnoma-modal'));
                if (modal) {
                    modal.hide();
                }
            }
        }, 100);
    },

    // Добавление Талабнома и возможность добавить еще
    addTalabnomaAndAddMore() {
        const form = document.getElementById('legal-talabnoma-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Сохраняем данные талабнома
        if (!this.legalCases[this.currentClient]) {
            this.legalCases[this.currentClient] = [];
        }

        const talabnomaCase = {
            type: 'talabnoma',
            date: data.date,
            talabnoma: data.talabnoma,
            taraf: data.taraf,
            izoh: data.izoh,
            files: []
        };

        const fileInput = form.querySelector('input[name="file"]');
        if (fileInput && fileInput.files.length > 0) {
            talabnomaCase.files = Array.from(fileInput.files).map(f => f.name);
        }

        this.legalCases[this.currentClient].push(talabnomaCase);

        // Показываем сообщение об успехе
        const successMsg = document.createElement('div');
        successMsg.className = 'alert alert-success alert-dismissible fade show';
        successMsg.style.position = 'fixed';
        successMsg.style.top = '20px';
        successMsg.style.right = '20px';
        successMsg.style.zIndex = '9999';
        successMsg.style.minWidth = '300px';
        successMsg.innerHTML = `
            <strong>Успешно!</strong> Талабнома добавлена. Можете добавить еще.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(successMsg);
        setTimeout(() => {
            successMsg.remove();
        }, 3000);

        // Очищаем форму, но оставляем модальное окно открытым
        form.reset();
        
        const dateInputs = form.querySelectorAll('.legal-date-input');
        dateInputs.forEach(input => {
            if (input._flatpickr) {
                input._flatpickr.clear();
            }
        });

        // Сбрасываем файловый инпут
        if (fileInput) {
            fileInput.value = '';
            const uploadText = fileInput.closest('.file-upload-area')?.querySelector('.file-upload-text');
            if (uploadText) {
                uploadText.textContent = 'Перетащите файлы сюда или нажмите для выбора';
            }
        }

        // Обновляем список дел
        this.renderClientCases(this.currentClient);
        
        // Обновляем таймлайн, если открыт паспорт клиента
        if (document.getElementById('legal-timeline-container')) {
            this.renderTimeline(this.currentClient);
        }
        
        // Обновляем календарь, если открыт паспорт клиента
        if (document.getElementById('legal-calendar-widget')) {
            this.renderCalendarWidget(this.currentClient);
        }
        
        // Обновляем полный календарь и уведомления
        if (document.getElementById('legal-calendar-widget-full')) {
            this.renderCalendarFull(this.currentClient);
            this.renderCalendarNotifications(this.currentClient);
        }

        // Фокус на первое поле для быстрого ввода следующей записи
        setTimeout(() => {
            const firstInput = form.querySelector('input[required]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    },

    // Выбор инстанции
    selectInstance(instanceType) {
        this.currentInstance = instanceType;
        // Сбрасываем флаг, так как пользователь выбрал инстанцию
        this.isAddingMoreInstance = false;
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('legal-instance-modal'));
        if (modal) {
            modal.hide();
        }

        // Обновляем заголовок формы
        const instanceNames = {
            '1-instance': '1-инстанция',
            'apellyatsiya': 'Апелляция',
            'kassatsiya': 'Кассация',
            'taftish': 'Тафтиш',
            'oliy-sud': 'Олий Суд'
        };

        const titleElement = document.getElementById('legalInstanceFormModalLabel');
        const typeInput = document.getElementById('instance-type-input');
        
        if (titleElement) {
            titleElement.textContent = instanceNames[instanceType] || instanceType;
        }
        if (typeInput) {
            typeInput.value = instanceType;
        }

        // Генерируем номер дела
        this.generateIshRaqami();

        // Открываем форму инстанции
        const formModal = new bootstrap.Modal(document.getElementById('legal-instance-form-modal'));
        formModal.show();
        
        // Инициализируем date pickers после показа модального окна
        setTimeout(() => {
            this.initModalDatePickers('legal-instance-form-modal');
            this.initCourtLookup();
            
            // Предзаполняем форму сохраненными верхними данными, если они есть
            if (this.lastInstanceTopData) {
                const form = document.getElementById('legal-instance-form');
                
                // Предзаполняем дату
                const dateInput = form.querySelector('input[name="date"]');
                if (dateInput && this.lastInstanceTopData.date) {
                    if (dateInput._flatpickr) {
                        dateInput._flatpickr.setDate(this.lastInstanceTopData.date, false);
                    } else {
                        dateInput.value = this.lastInstanceTopData.date;
                    }
                }
                
                // Предзаполняем сумму
                const summaInput = form.querySelector('input[name="summa"]');
                if (summaInput && this.lastInstanceTopData.summa) {
                    summaInput.value = this.lastInstanceTopData.summa;
                }
                
                // Предзаполняем название суда
                const sudNomiInput = document.getElementById('sud-nomi-lookup');
                if (sudNomiInput && this.lastInstanceTopData.sudNomi) {
                    sudNomiInput.value = this.lastInstanceTopData.sudNomi;
                }
                
                // Предзаполняем примечание
                const izohInput = form.querySelector('textarea[name="izoh"]');
                if (izohInput && this.lastInstanceTopData.izoh) {
                    izohInput.value = this.lastInstanceTopData.izoh;
                }
                
                // Предзаполняем ответчиков
                if (this.lastInstanceTopData.defendants && this.lastInstanceTopData.defendants.length > 0) {
                    this.defendants = [...this.lastInstanceTopData.defendants];
                    this.updateDefendantsDisplay();
                } else {
                    this.defendants = [];
                    this.updateDefendantsDisplay();
                }
            } else {
                // Сбрасываем ответчиков, если нет сохраненных данных
                if (this.defendants) {
                    this.defendants = [];
                    this.updateDefendantsDisplay();
                }
            }
        }, 100);
    },

    // Сохранение инстанции (закрывает форму)
    saveInstance() {
        const form = document.getElementById('legal-instance-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Получаем ответчиков
        const defendantsInput = document.getElementById('javobgarlar-input');
        if (defendantsInput && this.defendants && this.defendants.length > 0) {
            data.javobgarlar = this.defendants.join(', ');
        }

        if (!this.legalCases[this.currentClient]) {
            this.legalCases[this.currentClient] = [];
        }
        
        // Сбрасываем ответчиков после сохранения
        if (this.defendants) {
            this.defendants = [];
            this.updateDefendantsDisplay();
        }

        let lastSudCase = this.legalCases[this.currentClient]
            .slice()
            .reverse()
            .find(c => c.type === 'sud');

        if (!lastSudCase) {
            lastSudCase = {
                type: 'sud',
                instances: []
            };
            this.legalCases[this.currentClient].push(lastSudCase);
        }

        if (!lastSudCase.instances) {
            lastSudCase.instances = [];
        }

        const qarorFileInput = form.querySelector('input[name="qaror-file"]');
        const ijroFileInput = form.querySelector('input[name="ijro-file"]');

        const instanceData = {
            instanceType: data['instance-type'],
            date: data.date,
            summa: parseFloat(data.summa) || 0,
            sudNomi: data['sud-nomi'],
            javobgarlar: data.javobgarlar,
            izoh: data.izoh,
            qaror: {
                type: data['qaror-type'],
                date: data['qaror-date'],
                summa: parseFloat(data['qaror-summa']) || 0,
                ishRaqami: data['ish-raqami'],
                izoh: data['qaror-izoh'],
                files: []
            },
            ijro: {
                raqami: data['ijro-raqami'],
                date: data['ijro-date'],
                qozgatilganDate: data['ijro-qozgatilgan-date'],
                mibBolimi: data['mib-bolimi'],
                davlatIshtirokchisi: data['davlat-ishtirokchisi'],
                tugatishDate: data['ijro-tugatish-date'],
                izoh: data['ijro-izoh'],
                files: []
            }
        };

        if (qarorFileInput && qarorFileInput.files.length > 0) {
            instanceData.qaror.files = Array.from(qarorFileInput.files).map(f => f.name);
        }

        if (ijroFileInput && ijroFileInput.files.length > 0) {
            instanceData.ijro.files = Array.from(ijroFileInput.files).map(f => f.name);
        }

        lastSudCase.instances.push(instanceData);

        // Показываем сообщение об успехе
        const successMsg = document.createElement('div');
        successMsg.className = 'alert alert-success alert-dismissible fade show';
        successMsg.style.position = 'fixed';
        successMsg.style.top = '20px';
        successMsg.style.right = '20px';
        successMsg.style.zIndex = '9999';
        successMsg.style.minWidth = '300px';
        successMsg.innerHTML = `
            <strong>Успешно!</strong> Инстанция сохранена.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(successMsg);
        setTimeout(() => {
            successMsg.remove();
        }, 3000);

        // Очищаем сохраненные верхние данные при обычном сохранении
        this.lastInstanceTopData = null;
        this.isAddingMoreInstance = false;
        
        // Очищаем форму
        form.reset();
        
        const dateInputs = form.querySelectorAll('.legal-date-input');
        dateInputs.forEach(input => {
            if (input._flatpickr) {
                input._flatpickr.clear();
            }
        });

        const sudNomiInput = document.getElementById('sud-nomi-lookup');
        if (sudNomiInput) {
            sudNomiInput.value = '';
        }

        const ishRaqamiInput = document.getElementById('ish-raqami-input');
        if (ishRaqamiInput) {
            ishRaqamiInput.value = '';
        }

        // Сбрасываем файловые инпуты
        if (qarorFileInput) {
            qarorFileInput.value = '';
            const qarorUploadText = qarorFileInput.closest('.file-upload-area')?.querySelector('.file-upload-text');
            if (qarorUploadText) {
                qarorUploadText.textContent = 'Перетащите файлы сюда или нажмите для выбора';
            }
        }
        if (ijroFileInput) {
            ijroFileInput.value = '';
            const ijroUploadText = ijroFileInput.closest('.file-upload-area')?.querySelector('.file-upload-text');
            if (ijroUploadText) {
                ijroUploadText.textContent = 'Перетащите файлы сюда или нажмите для выбора';
            }
        }

        // Обновляем список дел
        this.renderClientCases(this.currentClient);
        
        // Обновляем таймлайн, если открыт паспорт клиента
        if (document.getElementById('legal-timeline-container')) {
            this.renderTimeline(this.currentClient);
        }
        
        // Обновляем календарь, если открыт паспорт клиента
        if (document.getElementById('legal-calendar-widget')) {
            this.renderCalendarWidget(this.currentClient);
        }
        
        // Обновляем полный календарь и уведомления
        if (document.getElementById('legal-calendar-widget-full')) {
            this.renderCalendarFull(this.currentClient);
            this.renderCalendarNotifications(this.currentClient);
        }

        // Закрываем модальное окно
        const modal = bootstrap.Modal.getInstance(document.getElementById('legal-instance-form-modal'));
        if (modal) {
            modal.hide();
        }
    },

    // Добавление инстанции (старая функция, оставлена для совместимости)
    addInstance() {
        const form = document.getElementById('legal-instance-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Получаем ответчиков
        const defendantsInput = document.getElementById('javobgarlar-input');
        if (defendantsInput && this.defendants && this.defendants.length > 0) {
            data.javobgarlar = this.defendants.join(', ');
        }

        // Сохраняем данные инстанции
        if (!this.legalCases[this.currentClient]) {
            this.legalCases[this.currentClient] = [];
        }

        // Находим последнее дело типа "sud" или создаем новое
        let lastSudCase = this.legalCases[this.currentClient]
            .slice()
            .reverse()
            .find(c => c.type === 'sud');

        if (!lastSudCase) {
            // Создаем новое дело
            lastSudCase = {
                type: 'sud',
                instances: []
            };
            this.legalCases[this.currentClient].push(lastSudCase);
        }

        if (!lastSudCase.instances) {
            lastSudCase.instances = [];
        }

        // Собираем данные о файлах
        const qarorFileInput = form.querySelector('input[name="qaror-file"]');
        const ijroFileInput = form.querySelector('input[name="ijro-file"]');

        const instanceData = {
            instanceType: data['instance-type'],
            date: data.date,
            summa: parseFloat(data.summa) || 0,
            sudNomi: data['sud-nomi'],
            javobgarlar: data.javobgarlar,
            izoh: data.izoh,
            qaror: {
                type: data['qaror-type'],
                date: data['qaror-date'],
                summa: parseFloat(data['qaror-summa']) || 0,
                ishRaqami: data['ish-raqami'],
                izoh: data['qaror-izoh'],
                files: []
            },
            ijro: {
                raqami: data['ijro-raqami'],
                date: data['ijro-date'],
                qozgatilganDate: data['ijro-qozgatilgan-date'],
                mibBolimi: data['mib-bolimi'],
                davlatIshtirokchisi: data['davlat-ishtirokchisi'],
                tugatishDate: data['ijro-tugatish-date'],
                izoh: data['ijro-izoh'],
                files: []
            }
        };

        if (qarorFileInput && qarorFileInput.files.length > 0) {
            instanceData.qaror.files = Array.from(qarorFileInput.files).map(f => f.name);
        }

        if (ijroFileInput && ijroFileInput.files.length > 0) {
            instanceData.ijro.files = Array.from(ijroFileInput.files).map(f => f.name);
        }

        lastSudCase.instances.push(instanceData);

        console.log('Instance data saved:', instanceData);

        // Показываем сообщение об успехе
        const successMsg = document.createElement('div');
        successMsg.className = 'alert alert-success alert-dismissible fade show';
        successMsg.style.position = 'fixed';
        successMsg.style.top = '20px';
        successMsg.style.right = '20px';
        successMsg.style.zIndex = '9999';
        successMsg.style.minWidth = '300px';
        successMsg.innerHTML = `
            <strong>Успешно!</strong> Судебная инстанция добавлена.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(successMsg);
        setTimeout(() => {
            successMsg.remove();
        }, 3000);

        // Очищаем форму
        form.reset();
        
        // Сбрасываем date pickers
        const dateInputs = form.querySelectorAll('.legal-date-input');
        dateInputs.forEach(input => {
            if (input._flatpickr) {
                input._flatpickr.clear();
            }
        });

        // Сбрасываем lookup
        const sudNomiInput = document.getElementById('sud-nomi-lookup');
        if (sudNomiInput) {
            sudNomiInput.value = '';
        }

        // Сбрасываем номер дела
        const ishRaqamiInput = document.getElementById('ish-raqami-input');
        if (ishRaqamiInput) {
            ishRaqamiInput.value = '';
        }

        // Сбрасываем файловые инпуты
        if (qarorFileInput) {
            qarorFileInput.value = '';
            const qarorUploadText = qarorFileInput.closest('.file-upload-area')?.querySelector('.file-upload-text');
            if (qarorUploadText) {
                qarorUploadText.textContent = 'Перетащите файлы сюда или нажмите для выбора';
            }
        }
        if (ijroFileInput) {
            ijroFileInput.value = '';
            const ijroUploadText = ijroFileInput.closest('.file-upload-area')?.querySelector('.file-upload-text');
            if (ijroUploadText) {
                ijroUploadText.textContent = 'Перетащите файлы сюда или нажмите для выбора';
            }
        }

        // Обновляем список дел
        this.renderClientCases(this.currentClient);
        
        // Обновляем таймлайн, если открыт паспорт клиента
        if (document.getElementById('legal-timeline-container')) {
            this.renderTimeline(this.currentClient);
        }
        
        // Обновляем календарь, если открыт паспорт клиента
        if (document.getElementById('legal-calendar-widget')) {
            this.renderCalendarWidget(this.currentClient);
        }

        // Спрашиваем, что делать дальше
        setTimeout(() => {
            const action = confirm('Судебная инстанция успешно добавлена!\n\nНажмите OK, чтобы добавить еще одну инстанцию.\nНажмите Отмена, чтобы закрыть форму.');
            
            if (action) {
                // Генерируем новый номер дела для следующей инстанции
                this.generateIshRaqami();
                
                // Оставляем модальное окно открытым, но форма уже очищена
                // Можно сразу выбрать следующую инстанцию
                const modal = bootstrap.Modal.getInstance(document.getElementById('legal-instance-form-modal'));
                if (modal) {
                    modal.hide();
                }
                setTimeout(() => {
                    const instanceModal = new bootstrap.Modal(document.getElementById('legal-instance-modal'));
                    instanceModal.show();
                }, 300);
            } else {
                // Закрываем модальное окно
                const modal = bootstrap.Modal.getInstance(document.getElementById('legal-instance-form-modal'));
                if (modal) {
                    modal.hide();
                }
            }
        }, 100);
    },

    // Добавление инстанции и возможность добавить еще
    addInstanceAndAddMore() {
        const form = document.getElementById('legal-instance-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Получаем ответчиков
        const defendantsInput = document.getElementById('javobgarlar-input');
        if (defendantsInput && this.defendants && this.defendants.length > 0) {
            data.javobgarlar = this.defendants.join(', ');
        }

        // Сохраняем верхние данные (секция 01) для повторного использования
        this.lastInstanceTopData = {
            date: data.date,
            summa: data.summa,
            sudNomi: data['sud-nomi'],
            javobgarlar: data.javobgarlar,
            izoh: data.izoh,
            defendants: this.defendants ? [...this.defendants] : []
        };

        if (!this.legalCases[this.currentClient]) {
            this.legalCases[this.currentClient] = [];
        }

        let lastSudCase = this.legalCases[this.currentClient]
            .slice()
            .reverse()
            .find(c => c.type === 'sud');

        if (!lastSudCase) {
            lastSudCase = {
                type: 'sud',
                instances: []
            };
            this.legalCases[this.currentClient].push(lastSudCase);
        }

        if (!lastSudCase.instances) {
            lastSudCase.instances = [];
        }

        const qarorFileInput = form.querySelector('input[name="qaror-file"]');
        const ijroFileInput = form.querySelector('input[name="ijro-file"]');

        const instanceData = {
            instanceType: data['instance-type'],
            date: data.date,
            summa: parseFloat(data.summa) || 0,
            sudNomi: data['sud-nomi'],
            javobgarlar: data.javobgarlar,
            izoh: data.izoh,
            qaror: {
                type: data['qaror-type'],
                date: data['qaror-date'],
                summa: parseFloat(data['qaror-summa']) || 0,
                ishRaqami: data['ish-raqami'],
                izoh: data['qaror-izoh'],
                files: []
            },
            ijro: {
                raqami: data['ijro-raqami'],
                date: data['ijro-date'],
                qozgatilganDate: data['ijro-qozgatilgan-date'],
                mibBolimi: data['mib-bolimi'],
                davlatIshtirokchisi: data['davlat-ishtirokchisi'],
                tugatishDate: data['ijro-tugatish-date'],
                izoh: data['ijro-izoh'],
                files: []
            }
        };

        if (qarorFileInput && qarorFileInput.files.length > 0) {
            instanceData.qaror.files = Array.from(qarorFileInput.files).map(f => f.name);
        }

        if (ijroFileInput && ijroFileInput.files.length > 0) {
            instanceData.ijro.files = Array.from(ijroFileInput.files).map(f => f.name);
        }

        lastSudCase.instances.push(instanceData);

        // Показываем сообщение об успехе
        const successMsg = document.createElement('div');
        successMsg.className = 'alert alert-success alert-dismissible fade show';
        successMsg.style.position = 'fixed';
        successMsg.style.top = '20px';
        successMsg.style.right = '20px';
        successMsg.style.zIndex = '9999';
        successMsg.style.minWidth = '300px';
        successMsg.innerHTML = `
            <strong>Успешно!</strong> Инстанция добавлена. Можете добавить еще.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(successMsg);
        setTimeout(() => {
            successMsg.remove();
        }, 3000);

        // Устанавливаем флаг, что мы добавляем еще одну инстанцию
        this.isAddingMoreInstance = true;

        // Обновляем список дел
        this.renderClientCases(this.currentClient);
        
        // Обновляем таймлайн, если открыт паспорт клиента
        if (document.getElementById('legal-timeline-container')) {
            this.renderTimeline(this.currentClient);
        }
        
        // Обновляем календарь, если открыт паспорт клиента
        if (document.getElementById('legal-calendar-widget')) {
            this.renderCalendarWidget(this.currentClient);
        }
        
        // Обновляем полный календарь и уведомления
        if (document.getElementById('legal-calendar-widget-full')) {
            this.renderCalendarFull(this.currentClient);
            this.renderCalendarNotifications(this.currentClient);
        }

        // Закрываем форму инстанции и ждем полного закрытия перед открытием следующего модального окна
        const formModalElement = document.getElementById('legal-instance-form-modal');
        const formModal = bootstrap.Modal.getInstance(formModalElement);
        
        if (formModal) {
            // Обработчик полного закрытия модального окна
            const onFormModalHidden = () => {
                // Удаляем обработчик после использования
                formModalElement.removeEventListener('hidden.bs.modal', onFormModalHidden);
                
                // Показываем модальное окно выбора инстанции снова
                // Данные lastInstanceTopData будут использованы в selectInstance для предзаполнения
                setTimeout(() => {
                    const instanceModalElement = document.getElementById('legal-instance-modal');
                    if (instanceModalElement) {
                        const instanceModal = new bootstrap.Modal(instanceModalElement);
                        instanceModal.show();
                        
                        // Сбрасываем флаг после открытия модального окна
                        setTimeout(() => {
                            this.isAddingMoreInstance = false;
                        }, 300);
                    }
                }, 100);
            };
            
            // Добавляем обработчик перед закрытием
            formModalElement.addEventListener('hidden.bs.modal', onFormModalHidden, { once: true });
            
            // Закрываем модальное окно
            formModal.hide();
        } else {
            // Если модальное окно не найдено, просто открываем выбор инстанции
            setTimeout(() => {
                const instanceModalElement = document.getElementById('legal-instance-modal');
                if (instanceModalElement) {
                    const instanceModal = new bootstrap.Modal(instanceModalElement);
                    instanceModal.show();
                    this.isAddingMoreInstance = false;
                }
            }, 100);
        }
    },

    // Просмотр дела
    viewCase(clientName, caseIndex, instanceIndex) {
        const cases = this.legalCases[clientName] || [];
        const caseItem = cases[caseIndex];
        
        if (!caseItem) return;

        let details = `Просмотр дела:\nТип: ${caseItem.type === 'talabnoma' ? 'Талабнома' : caseItem.type === 'sud' ? 'Суд ва ижро варакаси' : 'Банкротство'}\n`;

        if (caseItem.type === 'talabnoma') {
            details += `Дата: ${caseItem.date || '-'}\n`;
            details += `Талабнома: ${caseItem.talabnoma || '-'}\n`;
            details += `Тарафлар: ${caseItem.taraf || '-'}\n`;
            if (caseItem.izoh) details += `Изох: ${caseItem.izoh}\n`;
        } else if (caseItem.type === 'sud' && caseItem.instances) {
            if (instanceIndex !== undefined && caseItem.instances[instanceIndex]) {
                const instance = caseItem.instances[instanceIndex];
                const instanceNames = {
                    '1-instance': '1-инстанция',
                    'apellyatsiya': 'Апелляция',
                    'kassatsiya': 'Кассация',
                    'taftish': 'Тафтиш',
                    'oliy-sud': 'Олий Суд'
                };
                details += `Инстанция: ${instanceNames[instance.instanceType] || instance.instanceType}\n`;
                details += `Дата: ${instance.date || '-'}\n`;
                details += `Сумма: ${instance.summa ? instance.summa.toLocaleString('ru-RU') : '-'}\n`;
                details += `Суд номи: ${instance.sudNomi || '-'}\n`;
            } else {
                details += `Количество инстанций: ${caseItem.instances.length}\n`;
            }
        }

        // Здесь можно открыть модальное окно с детальной информацией о деле
        alert(details + '\n\nДетальная информация будет отображаться в модальном окне.');
    },

    // Удаление дела
    deleteCase(clientName, caseIndex, instanceIndex) {
        const cases = this.legalCases[clientName] || [];
        const caseItem = cases[caseIndex];
        
        if (!caseItem) return;

        if (instanceIndex !== undefined && caseItem.type === 'sud' && caseItem.instances) {
            // Удаляем конкретную инстанцию
            if (confirm('Вы уверены, что хотите удалить эту инстанцию?')) {
                caseItem.instances.splice(instanceIndex, 1);
                // Если инстанций не осталось, удаляем все дело
                if (caseItem.instances.length === 0) {
                    cases.splice(caseIndex, 1);
                }
                this.renderClientCases(clientName);
            }
        } else {
            // Удаляем все дело
            if (confirm('Вы уверены, что хотите удалить это дело?')) {
                cases.splice(caseIndex, 1);
                this.renderClientCases(clientName);
            }
        }
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
                    dateFormat: 'm/d/Y',
                    locale: 'ru',
                    allowInput: true,
                    altInput: false
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
    },

    // Инициализация фильтров
    initFilters() {
        const filterInputs = [
            'legal-mfo-filter',
            'legal-region-filter',
            'legal-group-filter',
            'legal-clients-filter',
            'legal-lawyer-filter'
        ];

        filterInputs.forEach(filterId => {
            const input = document.getElementById(filterId);
            if (input) {
                input.addEventListener('input', () => {
                    this.applyFilters();
                });
            }
        });
    },

    // Заполнение опций фильтров
    populateFilterOptions() {
        // MFO
        const mfoList = document.getElementById('legal-mfo-list');
        if (mfoList) {
            const mfos = [...new Set(this.groupsData.map(g => g.hub))];
            mfoList.innerHTML = mfos.map(mfo => `<option value="${mfo}">`).join('');
        }

        // Regions
        const regionList = document.getElementById('legal-region-list');
        if (regionList) {
            const regions = ['Toshkent', 'Samarqand', 'Andijon', 'Farg\'ona', 'Namangan', 'Qashqadaryo', 'Surxondaryo', 'Buxoro', 'Xorazm', 'Navoiy', 'Jizzax', 'Sirdaryo', 'Qoraqalpog\'iston'];
            regionList.innerHTML = regions.map(region => `<option value="${region}">`).join('');
        }

        // Groups
        const groupList = document.getElementById('legal-group-list');
        if (groupList) {
            const groups = this.groupsData.map(g => g.groupName);
            groupList.innerHTML = groups.map(group => `<option value="${group}">`).join('');
        }

        // Clients
        const clientsList = document.getElementById('legal-clients-list');
        if (clientsList) {
            const allClients = [];
            Object.values(this.clientsByGroup).forEach(clients => {
                clients.forEach(client => allClients.push(client.name));
            });
            clientsList.innerHTML = [...new Set(allClients)].map(client => `<option value="${client}">`).join('');
        }

        // Lawyers
        const lawyerList = document.getElementById('legal-lawyer-list');
        if (lawyerList) {
            const lawyers = [...new Set(this.groupsData.map(g => g.lawyer))];
            lawyerList.innerHTML = lawyers.map(lawyer => `<option value="${lawyer}">`).join('');
        }
    },

    // Применение фильтров
    applyFilters() {
        const mfoFilter = document.getElementById('legal-mfo-filter')?.value.toLowerCase() || '';
        const regionFilter = document.getElementById('legal-region-filter')?.value.toLowerCase() || '';
        const groupFilter = document.getElementById('legal-group-filter')?.value.toLowerCase() || '';
        const clientsFilter = document.getElementById('legal-clients-filter')?.value.toLowerCase() || '';
        const economistFilter = document.getElementById('legal-economist-filter')?.value.toLowerCase() || '';
        const lawyerFilter = document.getElementById('legal-lawyer-filter')?.value.toLowerCase() || '';

        const table = document.getElementById('legal-groups-table');
        const rows = table?.querySelectorAll('tbody tr') || [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length < 6) return;

            const hub = cells[1]?.textContent.toLowerCase() || '';
            const groupName = cells[2]?.textContent.toLowerCase() || '';
            const lawyer = cells[5]?.textContent.toLowerCase() || '';

            const matches = 
                (!mfoFilter || hub.includes(mfoFilter)) &&
                (!groupFilter || groupName.includes(groupFilter)) &&
                (!lawyerFilter || lawyer.includes(lawyerFilter));

            row.style.display = matches ? '' : 'none';
        });
    },

    // Очистка всех фильтров
    clearAllFilters() {
        document.getElementById('legal-mfo-filter').value = '';
        document.getElementById('legal-region-filter').value = '';
        document.getElementById('legal-group-filter').value = '';
        document.getElementById('legal-clients-filter').value = '';
        document.getElementById('legal-lawyer-filter').value = '';
        
        this.applyFilters();
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    legalModule.init();
    legalModule.initFileUploads();
    
    // Очищаем сохраненные верхние данные при закрытии модального окна формы инстанции
    // (когда пользователь закрывает модальное окно через Cancel или X)
    const instanceFormModal = document.getElementById('legal-instance-form-modal');
    if (instanceFormModal) {
        instanceFormModal.addEventListener('hidden.bs.modal', function (e) {
            // Очищаем сохраненные данные только если модальное окно было закрыто не через "Добавить"
            // Проверяем флаг isAddingMoreInstance
            setTimeout(() => {
                if (!legalModule.isAddingMoreInstance) {
                    const instanceModal = document.getElementById('legal-instance-modal');
                    const isInstanceModalOpen = instanceModal && instanceModal.classList.contains('show');
                    if (!isInstanceModalOpen && legalModule.lastInstanceTopData) {
                        legalModule.lastInstanceTopData = null;
                    }
                }
            }, 200);
        });
    }
    
    // Сбрасываем флаг при закрытии модального окна выбора инстанции
    const instanceModal = document.getElementById('legal-instance-modal');
    if (instanceModal) {
        instanceModal.addEventListener('hidden.bs.modal', function (e) {
            // Если модальное окно было закрыто без выбора инстанции, сбрасываем флаг
            if (legalModule.isAddingMoreInstance) {
                setTimeout(() => {
                    const formModal = document.getElementById('legal-instance-form-modal');
                    const isFormModalOpen = formModal && formModal.classList.contains('show');
                    if (!isFormModalOpen) {
                        legalModule.isAddingMoreInstance = false;
                        // Также очищаем сохраненные данные, если форма не открыта
                        if (legalModule.lastInstanceTopData) {
                            legalModule.lastInstanceTopData = null;
                        }
                    }
                }, 100);
            }
        });
    }
    
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
