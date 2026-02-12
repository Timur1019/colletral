(function() {
    function getDetailModal() { return document.getElementById('legal-detail-modal'); }

    function getGroupFromUrl() {
        var p = new URLSearchParams(window.location.search);
        return p.get('group') || 'SOHIB OMAD BARAKASI';
    }

    function setGroupTitle() {
        var group = getGroupFromUrl();
        var name = group === 'SOHIB OMAD BARAKASI' ? 'Сохиб Омад' : group;
        document.getElementById('legal-group-title').textContent = name;
        document.getElementById('legal-group-breadcrumb').textContent = name;
        document.getElementById('legal-group-page-title').textContent = name;
        var sel = document.getElementById('legal-group-select');
        if (sel) for (var i = 0; i < sel.options.length; i++) {
            if (sel.options[i].value === group) { sel.selectedIndex = i; break; }
        }
    }

    window.onLegalGroupChange = function(value) {
        var name = value === 'SOHIB OMAD BARAKASI' ? 'Сохиб Омад' : value;
        document.getElementById('legal-group-title').textContent = name;
        document.getElementById('legal-group-breadcrumb').textContent = name;
        document.getElementById('legal-group-page-title').textContent = name;
        window.history.pushState({}, '', 'legal-group.html?group=' + encodeURIComponent(value));
    };

    var samplePdfUrl = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldev-17.pdf';

    function setTextContent(el, text) {
        if (el) el.textContent = text != null && text !== '' ? String(text) : '—';
    }

    window.openLegalDetailModal = function(rowNum) {
        var modalEl = getDetailModal();
        if (!modalEl) return;
        var idx = Math.max(0, parseInt(rowNum, 10) - 1);
        var d = courtCasesData[idx];
        if (!d) {
            d = { type: '—', caseNum: '—', stage: '—', statusKey: '', court: '—', date: '—', nextCourt: '—', summa: null, side: '—', client: '—', lawyer: '—', files: [] };
        }
        var statusInfo = getStatusInfo(d.statusKey || '');
        var files = Array.isArray(d.files) ? d.files : [];
        var iframe = document.getElementById('legal-detail-file-preview');
        var wrap = iframe ? iframe.closest('.legal-modal-preview-wrap') : null;
        var placeholder = document.getElementById('legal-detail-preview-placeholder');
        var docNameEl = document.getElementById('detail-current-doc-name');
        var downloadBtn = document.getElementById('legal-detail-download-btn');

        function showFileInPreview(url, docName) {
            if (url && iframe) {
                iframe.src = url;
                iframe.classList.add('has-src');
                if (wrap) wrap.classList.add('loaded');
                if (placeholder) placeholder.style.display = 'none';
            } else {
                if (iframe) { iframe.src = ''; iframe.classList.remove('has-src'); }
                if (wrap) wrap.classList.remove('loaded');
                if (placeholder) placeholder.style.display = 'flex';
            }
            if (docNameEl) docNameEl.textContent = docName || '';
            if (downloadBtn) {
                downloadBtn.href = url || '#';
                downloadBtn.download = docName || 'document.pdf';
                downloadBtn.style.display = url ? '' : 'none';
            }
        }

        /* Основные данные */
        setTextContent(document.getElementById('detail-type'), d.type);
        setTextContent(document.getElementById('detail-case-num'), d.caseNum);
        setTextContent(document.getElementById('detail-stage'), d.stage);
        setTextContent(document.getElementById('detail-status'), statusInfo.label);
        setTextContent(document.getElementById('detail-court'), d.court);
        setTextContent(document.getElementById('detail-date'), d.date);
        setTextContent(document.getElementById('detail-next-court'), d.nextCourt);
        setTextContent(document.getElementById('detail-summa'), d.summa);
        setTextContent(document.getElementById('detail-side'), d.side);
        setTextContent(document.getElementById('detail-client'), d.client);
        setTextContent(document.getElementById('detail-lawyer'), d.lawyer);

        /* Список файлов */
        var filesList = document.getElementById('legal-detail-files-list');
        var noFilesEl = document.getElementById('legal-detail-no-files');
        if (filesList) filesList.innerHTML = '';
        if (noFilesEl) noFilesEl.style.display = files.length > 0 ? 'none' : 'block';

        files.forEach(function(f, i) {
            var name = f.docName || f.name || ('Документ ' + (i + 1));
            var url = f.fileUrl || f.url || '';
            var div = document.createElement('div');
            div.className = 'legal-detail-file-item';
            div.dataset.url = url;
            div.dataset.name = name;
            div.innerHTML = '<span class="legal-detail-file-name"><i class="fas fa-file-pdf"></i>' + escapeHtml(name) + '</span>' +
                '<div class="legal-detail-file-actions">' +
                '<a href="' + (url ? escapeHtml(url) : '#') + '" class="btn btn-sm btn-outline-primary" download="' + escapeHtml(name) + '" title="Скачать"><i class="fas fa-download"></i></a>' +
                '</div>';
            if (url) {
                div.style.cursor = 'pointer';
                div.addEventListener('click', function(ev) {
                    if (ev.target.closest('.btn')) return;
                    showFileInPreview(url, name);
                });
            }
            if (filesList) filesList.appendChild(div);
        });

        /* Превью документа */
        if (files.length > 0 && files[0].fileUrl) {
            showFileInPreview(files[0].fileUrl, files[0].docName || files[0].name);
        } else if (files.length > 0 && files[0].url) {
            showFileInPreview(files[0].url, files[0].docName || files[0].name);
        } else {
            showFileInPreview('', '');
            if (docNameEl) docNameEl.textContent = '';
        }

        try {
            var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        } catch (e) {
            try { new bootstrap.Modal(modalEl).show(); } catch (e2) {
                modalEl.classList.add('show');
                modalEl.style.display = 'block';
                document.body.classList.add('modal-open');
                var backdrop = document.createElement('div');
                backdrop.className = 'modal-backdrop fade show';
                document.body.appendChild(backdrop);
            }
        }
    };

    window.closeLegalDetailModal = function() {
        var m = bootstrap.Modal.getInstance(getDetailModal());
        if (m) m.hide();
    };

    /* ——— Добавление юридических действий ——— */
    var addActionModal = document.getElementById('legal-add-action-modal');
    var talabnomaModal = document.getElementById('legal-talabnoma-modal');
    var instancesModal = document.getElementById('legal-instances-modal');
    var instanceFormModal = document.getElementById('legal-instance-form-modal');
    var qarorIjroModal = document.getElementById('legal-qaror-ijro-modal');
    var bankruptcyStageModal = document.getElementById('legal-bankruptcy-stage-modal');
    var bankruptcyFormModal = document.getElementById('legal-bankruptcy-form-modal');
    var bankruptcyQarorTypeModal = document.getElementById('legal-bankruptcy-qaror-type-modal');
    var courtsTbody = document.getElementById('legal-courts-tbody');

    var bankStageNames = { instance1: 'Инстанция', appeal: 'Апелляция', cassation: 'Кассация', taftish: 'Тафтиш', supreme: 'Олий суд' };

    var instanceNames = { instance1: '1-инстанция', appeal: 'Апелляция', cassation: 'Кассация', taftish: 'Тафтиш', supreme: 'Олий Суд' };
    var instanceHeaders = { instance1: '1-инстанция', appeal: 'Апелляция', cassation: 'Кассация', taftish: 'Тафтиш', supreme: 'Олий Суд' };

    /* Справочник статусов: ключ → { label, cssClass } — определяем "в суде" по статусу */
    var statusCatalog = {
        loyiha: { label: 'Лойиҳа', cssClass: 'legal-status-gray' },
        tayyorlash: { label: 'Тайёрлаш', cssClass: 'legal-status-gray' },
        'sudga-tayyorlash': { label: 'Суду готовили', cssClass: 'legal-status-gray' },
        'sudga-topshirilgan': { label: 'Судга топширилган', cssClass: 'legal-status-court' },
        'qabul-qilingan': { label: 'Қабул қилинган', cssClass: 'legal-status-court' },
        'kurib-chiqish': { label: 'Кўриб чиқиш жараёнида', cssClass: 'legal-status-yellow' },
        tinim: { label: 'Тиним', cssClass: 'legal-status-yellow' },
        'qaror-chiqarilgan': { label: 'Қарор чиқарилган', cssClass: 'legal-status-green' },
        apellyatsiyada: { label: 'Апелляцияда', cssClass: 'legal-status-orange' },
        kassatsiyada: { label: 'Кассацияда', cssClass: 'legal-status-orange' },
        'hal-qilingan': { label: 'Ҳал қилинган', cssClass: 'legal-status-red' },
        yopilgan: { label: 'Ёпилган', cssClass: 'legal-status-red' },
        'bekor-qilingan': { label: 'Бекор қилинган', cssClass: 'legal-status-red' },
        'ijroga-topshirilgan': { label: 'Ижрога топширилган', cssClass: 'legal-status-exec' },
        'ijro-etilgan': { label: 'Ижро этилган', cssClass: 'legal-status-done' },
        'muddat-utkazgan': { label: 'Муддат ўтказган', cssClass: 'legal-status-red' }
    };

    function getStatusInfo(statusKey) {
        return statusCatalog[statusKey] || { label: 'В суде', cssClass: 'legal-status-court' };
    }

    function isInCourt(statusKey) {
        var inCourtKeys = ['sudga-topshirilgan', 'qabul-qilingan', 'kurib-chiqish', 'tinim', 'qaror-chiqarilgan', 'apellyatsiyada', 'kassatsiyada'];
        return inCourtKeys.indexOf(statusKey) >= 0;
    }

    var courtCasesData = [];
    var caseCounter = 0;

    function showModal(el) {
        if (!el) return;
        bootstrap.Modal.getOrCreateInstance(el).show();
    }

    function hideModal(el) {
        if (!el) return;
        var m = bootstrap.Modal.getInstance(el);
        if (m) m.hide();
    }

    function hideThenShow(hideEl, showEl) {
        if (!hideEl || !showEl) return;
        hideEl.addEventListener('hidden.bs.modal', function onHidden() {
            hideEl.removeEventListener('hidden.bs.modal', onHidden);
            showModal(showEl);
        }, { once: true });
        hideModal(hideEl);
    }

    window.openAddCaseModal = function() { showModal(addActionModal); };

    if (addActionModal) {
        addActionModal.querySelectorAll('.legal-action-item[data-action]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var action = this.getAttribute('data-action');
                if (action === 'talabnoma') hideThenShow(addActionModal, talabnomaModal);
                else if (action === 'court') hideThenShow(addActionModal, instancesModal);
                else if (action === 'bankruptcy') hideThenShow(addActionModal, bankruptcyStageModal);
            });
        });
    }

    function addRowToTable(data) {
        var tbody = courtsTbody || document.getElementById('legal-courts-tbody');
        if (!tbody) return;
        var emptyRow = tbody.querySelector('.legal-courts-empty-row');
        if (emptyRow) emptyRow.style.display = 'none';
        var rowNum = courtCasesData.length;
        var tr = document.createElement('tr');
        tr.dataset.caseId = 'case-' + (++caseCounter);
        var info = getStatusInfo(data.statusKey || 'sudga-topshirilgan');
        var type = String(data.type || data.name || '—');
        var caseNum = String(data.caseNum || '—');
        var stage = String(data.stage || '—');
        var court = String(data.court || '—');
        var date = data.date ? String(data.date) : '—';
        var nextCourt = String(data.nextCourt || '—');
        var summa = data.summa != null && data.summa !== '' ? String(data.summa) : '—';
        var side = String(data.side || '—');
        tr.innerHTML = '<td>' + rowNum + '</td>' +
            '<td>' + escapeHtml(type) + '</td>' +
            '<td>' + escapeHtml(caseNum) + '</td>' +
            '<td>' + escapeHtml(stage) + '</td>' +
            '<td><span class="legal-status ' + info.cssClass + '">' + escapeHtml(info.label) + '</span></td>' +
            '<td>' + escapeHtml(court) + '</td>' +
            '<td>' + escapeHtml(date) + '</td>' +
            '<td>' + escapeHtml(nextCourt) + '</td>' +
            '<td>' + escapeHtml(summa) + '</td>' +
            '<td>' + escapeHtml(side) + '</td>' +
            '<td><div class="action-buttons">' +
            '<button type="button" class="btn btn-sm btn-outline-primary" title="Просмотр" onclick="openLegalDetailModal(' + rowNum + ')"><i class="fas fa-eye"></i></button>' +
            '<button type="button" class="btn btn-sm btn-outline-primary" title="Редактировать"><i class="fas fa-edit"></i></button>' +
            '</div></td>';
        tbody.appendChild(tr);
    }

    function escapeHtml(s) {
        if (!s) return '';
        var div = document.createElement('div');
        div.textContent = s;
        return div.innerHTML;
    }

    var talabnomaAddBtn = document.getElementById('talabnoma-add-btn');
    if (talabnomaAddBtn) talabnomaAddBtn.addEventListener('click', function() {
        var sana = (document.getElementById('talabnoma-sana') || {}).value || '';
        var text = (document.getElementById('talabnoma-text') || {}).value || 'Талабнома';
        var dateStr = sana ? new Date(sana).toLocaleDateString('ru-RU') : '—';
        var groupName = getGroupFromUrl() === 'SOHIB OMAD BARAKASI' ? 'OOO "Tashkent Logistics Solutions"' : 'OOO "Клиент"';
        var row = { type: text || 'Талабнома', caseNum: '—', stage: '—', court: '—', date: dateStr, statusKey: 'tayyorlash', summa: null, nextCourt: '—', side: '—', client: groupName, lawyer: '—', files: [] };
        courtCasesData.push(row);
        addRowToTable(row);
        hideModal(talabnomaModal);
        showModal(addActionModal);
    });

    if (instancesModal) {
        instancesModal.querySelectorAll('.legal-action-item[data-instance]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var instance = this.getAttribute('data-instance');
                instancesModal.addEventListener('hidden.bs.modal', function onHidden() {
                    instancesModal.removeEventListener('hidden.bs.modal', onHidden);
                    openInstanceFormModal(instance);
                }, { once: true });
                hideModal(instancesModal);
            });
        });
    }

    function clearInstanceForm() {
        var sudKuniList = document.getElementById('instance-claim-sud-kuni-list');
        if (sudKuniList) sudKuniList.innerHTML = '';
        var ids = ['instance-claim-sana', 'instance-claim-summa', 'instance-claim-court', 'instance-claim-javobgar', 'instance-claim-izoh',
            'instance-qaror-type', 'instance-qaror-sana', 'instance-qaror-summa', 'instance-qaror-ish', 'instance-qaror-izoh', 'instance-qaror-file',
            'instance-ijro-raqam', 'instance-ijro-sana', 'instance-ijro-kozgatilgan', 'instance-ijro-mib', 'instance-ijro-davlat', 'instance-ijro-tugatish', 'instance-ijro-izoh', 'instance-ijro-file'];
        ids.forEach(function(id) {
            var el = document.getElementById(id);
            if (!el) return;
            if (el.tagName === 'SELECT') el.selectedIndex = 0;
            else if (el.type === 'file') el.value = '';
            else el.value = '';
        });
    }

    function openInstanceFormModal(instanceKey) {
        clearInstanceForm();

        var titleEl = document.getElementById('legal-instance-form-title');
        if (titleEl) titleEl.textContent = 'Исковое заявление — ' + (instanceHeaders[instanceKey] || instanceKey);
        instanceFormModal.dataset.currentInstance = instanceKey;

        var qarorBlock = document.getElementById('legal-instance-qaror-block');
        var ijroBlock = document.getElementById('legal-instance-ijro-block');
        var addBtn = document.getElementById('legal-add-qaror-ijro-btn');
        if (qarorBlock) qarorBlock.style.display = 'none';
        if (ijroBlock) ijroBlock.style.display = 'none';
        if (addBtn) addBtn.style.display = '';

        showModal(instanceFormModal);
        var courtsTabBtn = document.getElementById('legal-tab-courts-btn');
        if (courtsTabBtn) bootstrap.Tab.getOrCreateInstance(courtsTabBtn).show();
    }

    function genIshRaqam() {
        return (Math.floor(Math.random()*10)+1) + '-' + (Math.floor(Math.random()*15)+1) + '-' + (Math.floor(Math.random()*9000)+1000) + '-' + (Math.floor(Math.random()*900)+100) + '/51';
    }

    var addQarorIjroBtn = document.getElementById('legal-add-qaror-ijro-btn');
    if (addQarorIjroBtn) addQarorIjroBtn.addEventListener('click', function() {
        showModal(qarorIjroModal);
    });

    if (qarorIjroModal) {
        qarorIjroModal.querySelectorAll('.legal-action-item[data-type]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var type = this.getAttribute('data-type');
                hideModal(qarorIjroModal);
                var qarorBlock = document.getElementById('legal-instance-qaror-block');
                var ijroBlock = document.getElementById('legal-instance-ijro-block');
                var addBtn = document.getElementById('legal-add-qaror-ijro-btn');
                if (type === 'qaror' && qarorBlock) {
                    qarorBlock.style.display = 'block';
                    var ishInput = document.getElementById('instance-qaror-ish');
                    if (ishInput) ishInput.value = genIshRaqam();
                } else if (type === 'ijro' && ijroBlock) {
                    ijroBlock.style.display = 'block';
                }
                if (addBtn && qarorBlock && ijroBlock && qarorBlock.style.display !== 'none' && ijroBlock.style.display !== 'none') {
                    addBtn.style.display = 'none';
                }
            });
        });
    }

    var instanceSaveBtn = document.getElementById('legal-instance-save-btn');
    if (instanceSaveBtn) instanceSaveBtn.addEventListener('click', function() {
        var court = (document.getElementById('instance-claim-court') || {}).value || '—';
        var sana = (document.getElementById('instance-claim-sana') || {}).value;
        var summa = (document.getElementById('instance-claim-summa') || {}).value;
        var statusKey = (document.getElementById('instance-claim-status') || {}).value || 'sudga-topshirilgan';
        var side = (document.getElementById('instance-claim-javobgar') || {}).value || '—';
        var instanceKey = instanceFormModal.dataset.currentInstance || 'instance1';
        var dateStr = sana ? new Date(sana).toLocaleDateString('ru-RU') : '—';
        var groupName = getGroupFromUrl() === 'SOHIB OMAD BARAKASI' ? 'OOO "Tashkent Logistics Solutions"' : 'OOO "Клиент"';
        var row = {
            type: 'Исковое заявление',
            caseNum: '—',
            stage: instanceHeaders[instanceKey] || '1-инстанция',
            court: court,
            date: dateStr,
            statusKey: statusKey,
            summa: summa || null,
            nextCourt: '—',
            side: side,
            client: groupName,
            lawyer: '—',
            files: []
        };
        courtCasesData.push(row);
        addRowToTable(row);
        hideModal(instanceFormModal);
        showModal(addActionModal);
    });

    var instanceAddMoreBtn = document.getElementById('legal-instance-add-more-btn');
    if (instanceAddMoreBtn) instanceAddMoreBtn.addEventListener('click', function() {
        hideModal(instanceFormModal);
        showModal(instancesModal);
    });

    /* ——— Модуль Банкротство ——— */
    if (bankruptcyStageModal) {
        bankruptcyStageModal.querySelectorAll('.legal-action-item[data-stage]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var stage = this.getAttribute('data-stage');
                bankruptcyStageModal.addEventListener('hidden.bs.modal', function onH() {
                    bankruptcyStageModal.removeEventListener('hidden.bs.modal', onH);
                    openBankruptcyForm(stage);
                }, { once: true });
                hideModal(bankruptcyStageModal);
            });
        });
    }

    function addDateRow(containerId, placeholder) {
        var c = document.getElementById(containerId);
        if (!c) return;
        var div = document.createElement('div');
        div.className = 'input-group input-group-sm mb-1';
        div.innerHTML = '<input type="date" class="form-control">' +
            '<button type="button" class="btn btn-outline-danger" title="Удалить"><i class="fas fa-times"></i></button>';
        var inp = div.querySelector('input');
        if (placeholder) inp.placeholder = placeholder;
        div.querySelector('button').addEventListener('click', function() { div.remove(); });
        c.appendChild(div);
    }

    function openBankruptcyForm(stage) {
        var titleEl = document.getElementById('bankruptcy-form-title');
        if (titleEl) titleEl.textContent = 'Банкротство — ' + (bankStageNames[stage] || stage);
        bankruptcyFormModal.dataset.currentStage = stage;

        ['bank-ariza-sud-kuni-list', 'bank-kuza-kreditor-list', 'bank-kuza-sud-kuni-list'].forEach(function(id) {
            var c = document.getElementById(id);
            if (c) c.innerHTML = '';
        });
        var qarorBlocks = document.getElementById('bank-qaror-blocks');
        if (qarorBlocks) qarorBlocks.innerHTML = '';

        showModal(bankruptcyFormModal);
        var courtsTabBtn = document.getElementById('legal-tab-courts-btn');
        if (courtsTabBtn) bootstrap.Tab.getOrCreateInstance(courtsTabBtn).show();
    }

    var bankAddSudKuniBtn = document.getElementById('bank-add-sud-kuni-btn');
    if (bankAddSudKuniBtn) bankAddSudKuniBtn.addEventListener('click', function() { addDateRow('bank-ariza-sud-kuni-list'); });
    var instanceAddSudKuniBtn = document.getElementById('instance-add-sud-kuni-btn');
    if (instanceAddSudKuniBtn) instanceAddSudKuniBtn.addEventListener('click', function() { addDateRow('instance-claim-sud-kuni-list'); });
    var bankAddKreditorBtn = document.getElementById('bank-add-kreditor-btn');
    if (bankAddKreditorBtn) bankAddKreditorBtn.addEventListener('click', function() { addDateRow('bank-kuza-kreditor-list'); });
    var bankAddKuzaSudKuniBtn = document.getElementById('bank-add-kuza-sud-kuni-btn');
    if (bankAddKuzaSudKuniBtn) bankAddKuzaSudKuniBtn.addEventListener('click', function() { addDateRow('bank-kuza-sud-kuni-list'); });

    var bankAddQarorBtn = document.getElementById('bank-add-qaror-btn');
    if (bankAddQarorBtn) bankAddQarorBtn.addEventListener('click', function() {
        showModal(bankruptcyQarorTypeModal);
    });

    function addDateRowToEl(containerEl) {
        if (!containerEl) return;
        var div = document.createElement('div');
        div.className = 'input-group input-group-sm mb-1';
        div.innerHTML = '<input type="date" class="form-control">' +
            '<button type="button" class="btn btn-outline-danger" title="Удалить"><i class="fas fa-times"></i></button>';
        div.querySelector('button').addEventListener('click', function() { div.remove(); });
        containerEl.appendChild(div);
    }

    function buildBankQarorBlock(type) {
        var uniq = Date.now();
        var tooltipQ = '<i class="fas fa-info-circle legal-field-tooltip" title="Хабарнома, Бюллетень, протокол, бахолаш хужжатлари" data-bs-toggle="tooltip"></i>';
        var tooltipH = '<i class="fas fa-info-circle legal-field-tooltip" title="Хисобот" data-bs-toggle="tooltip"></i>';
        var tooltipS = '<i class="fas fa-info-circle legal-field-tooltip" title="Сабаб" data-bs-toggle="tooltip"></i>';

        var html = '';
        if (type === 'tugatish') {
            html = '<div class="legal-form-block bank-qaror-block border-start border-primary border-3 ps-3 mb-3" data-type="tugatish">' +
                '<h6 class="text-primary">Тугатиш</h6>' +
                '<div class="row g-3">' +
                '<div class="col-md-6"><label class="form-label">Сана</label><input type="date" class="form-control"></div>' +
                '<div class="col-md-6"><label class="form-label">Иш раками</label><input type="text" class="form-control" value="' + genIshRaqam() + '" readonly></div>' +
                '<div class="col-md-6"><label class="form-label">Тайинланган суд бошкарувчиси Ф.И.О</label><input type="text" class="form-control" placeholder="Ф.И.О"></div>' +
                '<div class="col-md-6"><label class="form-label">Телефон</label><input type="tel" class="form-control" placeholder="+998..."></div>' +
                '<div class="col-12"><label class="form-label">Изох ' + tooltipQ + '</label><textarea class="form-control" rows="2"></textarea></div>' +
                '<div class="col-md-6"><label class="form-label">Файл</label><input type="file" class="form-control"></div>' +
                '<div class="col-12"><label class="form-label">Кредиторлар йигилиши санаси</label><div class="bank-qaror-kreditor-list" id="bank-kred-' + uniq + '"></div><button type="button" class="btn btn-outline-secondary btn-sm mt-1 bank-add-qaror-kreditor" data-target="bank-kred-' + uniq + '"><i class="fas fa-plus"></i> Добавить</button></div>' +
                '</div><div class="mt-2"><button type="button" class="btn btn-outline-primary btn-sm me-1 bank-save-qaror-btn">Сохранить</button><button type="button" class="btn btn-outline-secondary btn-sm bank-add-next-qaror-btn"><i class="fas fa-plus"></i> Добавить</button></div></div>';
        } else if (type === 'sanatsiya') {
            html = '<div class="legal-form-block bank-qaror-block border-start border-primary border-3 ps-3 mb-3" data-type="sanatsiya">' +
                '<h6 class="text-primary">Санация</h6>' +
                '<div class="row g-3">' +
                '<div class="col-md-6"><label class="form-label">Сана</label><input type="date" class="form-control"></div>' +
                '<div class="col-md-6"><label class="form-label">Муддат</label><input type="text" class="form-control" placeholder="Муддат"></div>' +
                '<div class="col-md-6"><label class="form-label">Иш раками</label><input type="text" class="form-control" value="' + genIshRaqam() + '" readonly></div>' +
                '<div class="col-md-6"><label class="form-label">Санация бошкарувчи Ф.И.О</label><input type="text" class="form-control" placeholder="Ф.И.О"></div>' +
                '<div class="col-md-6"><label class="form-label">Телефон</label><input type="tel" class="form-control" placeholder="+998..."></div>' +
                '<div class="col-12"><label class="form-label">Санация режаси</label><div class="bank-sanatsiya-reja-table"><table class="table table-sm"><thead><tr><th>Сана</th><th>Сумма</th></tr></thead><tbody></tbody></table></div><button type="button" class="btn btn-outline-secondary btn-sm mt-1 bank-add-sanatsiya-row"><i class="fas fa-plus"></i> Добавить</button></div>' +
                '<div class="col-12"><label class="form-label">Кредиторлар йигилиши сана ва кун тартиби</label><input type="date" class="form-control"></div>' +
                '<div class="col-12"><label class="form-label">Файл ' + tooltipH + '</label><input type="file" class="form-control"></div>' +
                '</div></div>';
        } else if (type === 'tashki') {
            html = '<div class="legal-form-block bank-qaror-block border-start border-primary border-3 ps-3 mb-3" data-type="tashki">' +
                '<h6 class="text-primary">Ташки бошкарув</h6>' +
                '<div class="row g-3">' +
                '<div class="col-md-6"><label class="form-label">Сана</label><input type="date" class="form-control"></div>' +
                '<div class="col-md-6"><label class="form-label">Муддат</label><input type="text" class="form-control" placeholder="Муддат"></div>' +
                '<div class="col-md-6"><label class="form-label">Иш раками</label><input type="text" class="form-control" value="' + genIshRaqam() + '" readonly></div>' +
                '<div class="col-md-6"><label class="form-label">Ташки бошкарув Ф.И.О</label><input type="text" class="form-control" placeholder="Ф.И.О"></div>' +
                '<div class="col-md-6"><label class="form-label">Телефон</label><input type="tel" class="form-control" placeholder="+998..."></div>' +
                '<div class="col-12"><label class="form-label">Ташки бошкарув режаси</label><div class="bank-tashki-reja-table"><table class="table table-sm"><thead><tr><th>Сана</th><th>Сумма</th><th>Изох</th></tr></thead><tbody></tbody></table></div><button type="button" class="btn btn-outline-secondary btn-sm mt-1 bank-add-tashki-row"><i class="fas fa-plus"></i> Добавить</button></div>' +
                '<div class="col-12"><label class="form-label">Кредиторлар йигилиши сана ва кун тартиби</label><input type="date" class="form-control"></div>' +
                '<div class="col-12"><label class="form-label">Файл ' + tooltipH + '</label><input type="file" class="form-control"></div>' +
                '</div></div>';
        } else if (type === 'toliqsiz') {
            html = '<div class="legal-form-block bank-qaror-block border-start border-primary border-3 ps-3 mb-3" data-type="toliqsiz">' +
                '<h6 class="text-primary">Толовга кобилятсиз эмас</h6>' +
                '<div class="row g-3">' +
                '<div class="col-md-6"><label class="form-label">Сана</label><input type="date" class="form-control"></div>' +
                '<div class="col-md-6"><label class="form-label">Иш раками</label><input type="text" class="form-control" value="' + genIshRaqam() + '" readonly></div>' +
                '<div class="col-12"><label class="form-label">Изох ' + tooltipS + '</label><textarea class="form-control" rows="2"></textarea></div>' +
                '<div class="col-12"><label class="form-label">Файл</label><input type="file" class="form-control"></div>' +
                '</div></div>';
        }
        return html;
    }

    if (bankruptcyQarorTypeModal) {
        bankruptcyQarorTypeModal.querySelectorAll('.legal-action-item[data-qaror-type]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var type = this.getAttribute('data-qaror-type');
                hideModal(bankruptcyQarorTypeModal);
                var qarorBlocks = document.getElementById('bank-qaror-blocks');
                if (qarorBlocks) {
                    qarorBlocks.insertAdjacentHTML('beforeend', buildBankQarorBlock(type));
                    qarorBlocks.querySelectorAll('.bank-qaror-block [data-bs-toggle="tooltip"]').forEach(function(el) {
                        try { new bootstrap.Tooltip(el); } catch (err) {}
                    });
                }
            });
        });
    }

    document.addEventListener('click', function(e) {
        var kredBtn = e.target.closest('.bank-add-qaror-kreditor');
        if (kredBtn) {
            var targetId = kredBtn.getAttribute('data-target');
            var list = targetId ? document.getElementById(targetId) : kredBtn.previousElementSibling;
            if (list) addDateRowToEl(list);
        }
        if (e.target.closest('.bank-add-next-qaror-btn')) {
            showModal(bankruptcyQarorTypeModal);
        }
        if (e.target.closest('.bank-add-sanatsiya-row')) {
            var tbody = e.target.closest('.bank-qaror-block').querySelector('.bank-sanatsiya-reja-table tbody');
            if (tbody) { var tr = tbody.insertRow(); tr.innerHTML = '<td><input type="date" class="form-control form-control-sm"></td><td><input type="text" class="form-control form-control-sm" placeholder="Сумма"></td>'; }
        }
        if (e.target.closest('.bank-add-tashki-row')) {
            var tbody = e.target.closest('.bank-qaror-block').querySelector('.bank-tashki-reja-table tbody');
            if (tbody) { var tr = tbody.insertRow(); tr.innerHTML = '<td><input type="date" class="form-control form-control-sm"></td><td><input type="text" class="form-control form-control-sm" placeholder="Сумма"></td><td><input type="text" class="form-control form-control-sm" placeholder="Изох"></td>'; }
        }
    });

    var bankruptcySaveBtn = document.getElementById('bankruptcy-save-btn');
    if (bankruptcySaveBtn) bankruptcySaveBtn.addEventListener('click', function() {
        var court = (document.getElementById('bank-ariza-court') || {}).value || '—';
        var sana = (document.getElementById('bank-ariza-sana') || {}).value;
        var stage = bankruptcyFormModal.dataset.currentStage || 'instance1';
        var dateStr = sana ? new Date(sana).toLocaleDateString('ru-RU') : '—';
        var groupName = getGroupFromUrl() === 'SOHIB OMAD BARAKASI' ? 'OOO "Tashkent Logistics Solutions"' : 'OOO "Клиент"';
        var row = {
            type: 'Банкротство',
            caseNum: '—',
            stage: bankStageNames[stage] || 'Инстанция',
            court: court,
            date: dateStr,
            statusKey: 'qabul-qilingan',
            summa: null,
            nextCourt: '—',
            side: '—',
            client: groupName,
            lawyer: '—',
            files: []
        };
        courtCasesData.push(row);
        addRowToTable(row);
        hideModal(bankruptcyFormModal);
        showModal(addActionModal);
    });

    document.addEventListener('DOMContentLoaded', function() {
        setGroupTitle();
        var addCaseBtn = document.getElementById('legal-add-case-btn');
        if (addCaseBtn) addCaseBtn.addEventListener('click', openAddCaseModal);
        [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(function(el) {
            try { new bootstrap.Tooltip(el); } catch (e) {}
        });
        var cardsCourts = document.getElementById('legal-cards-courts');
        if (cardsCourts) cardsCourts.style.display = '';
        var tbody = document.getElementById('legal-courts-tbody');
        var sampleRows = tbody && tbody.querySelectorAll('tr[data-sample]');
        if (sampleRows) sampleRows.forEach(function(tr) { tr.remove(); });
        var groupName = getGroupFromUrl() === 'SOHIB OMAD BARAKASI' ? 'OOO "Tashkent Logistics Solutions"' : 'OOO "Клиент"';
        var sample1 = { type: 'Исковое заявление', caseNum: '1-15-1234-2024/51', stage: '1-инстанция', court: 'Уголовный суд', date: '—', statusKey: 'sudga-tayyorlash', summa: '150 000 000', nextCourt: '—', side: 'ООО "Ответчик"', client: groupName, lawyer: 'Ибрат Нуруллаев', files: [{ docName: 'Исковое заявление.pdf', fileUrl: samplePdfUrl }, { docName: 'Доверенность.pdf', fileUrl: samplePdfUrl }] };
        var sample2 = { type: 'Банкротство', caseNum: '3-42-5678-2024/Б', stage: 'Инстанция', court: 'Экономический суд', date: '—', statusKey: 'qabul-qilingan', summa: null, nextCourt: '15.03.2025', side: '—', client: groupName, lawyer: 'Умид Кудратов', files: [{ docName: 'Заявление о банкротстве.pdf', fileUrl: samplePdfUrl }] };
        courtCasesData.push(sample1);
        addRowToTable(sample1);
        courtCasesData.push(sample2);
        addRowToTable(sample2);
    });
})();
