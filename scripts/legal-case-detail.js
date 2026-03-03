(function() {
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

    function getLifecycleStageIndex(statusKey) {
        var stage2 = ['qabul-qilingan', 'kurib-chiqish', 'tinim', 'apellyatsiyada', 'kassatsiyada'];
        var stage3 = ['qaror-chiqarilgan'];
        var stage4 = ['ijro-etilgan', 'yopilgan', 'hal-qilingan', 'bekor-qilingan', 'muddat-utkazgan'];
        if (stage4.indexOf(statusKey) >= 0) return 4;
        if (stage3.indexOf(statusKey) >= 0) return 3;
        if (stage2.indexOf(statusKey) >= 0) return 2;
        return 1;
    }

    function setText(id, text) {
        var el = document.getElementById(id);
        if (el) el.textContent = text != null && text !== '' ? String(text) : '—';
    }

    function escapeHtml(s) {
        if (!s) return '';
        var div = document.createElement('div');
        div.textContent = s;
        return div.innerHTML;
    }

    var params = new URLSearchParams(window.location.search);
    var group = params.get('group') || '';

    var stored = null;
    try {
        var raw = sessionStorage.getItem('legalCaseDetail');
        if (raw) stored = JSON.parse(raw);
    } catch (e) {}

    var data = stored || {};
    var statusInfo = getStatusInfo(data.statusKey || '');
    var stepIndex = getLifecycleStageIndex(data.statusKey || '');

    document.getElementById('legal-case-detail-title').textContent = (data.type || 'Дело') + (data.caseNum ? ' ' + data.caseNum : '');
    document.getElementById('legal-case-detail-heading').textContent = (data.type || '—') + (data.caseNum ? ' № ' + data.caseNum : '');

    setText('case-type', data.type);
    setText('case-num', data.caseNum);
    setText('case-stage', data.stage);
    setText('case-status', statusInfo.label);
    setText('case-court', data.court);
    setText('case-date', data.date);
    setText('case-next-court', data.nextCourt);
    setText('case-summa', data.summa);
    setText('case-side', data.side);
    setText('case-client', data.client);
    setText('case-lawyer', data.lawyer);

    var backUrl = 'legal-group.html' + (group ? '?group=' + encodeURIComponent(group) : '');
    document.getElementById('legal-case-detail-back').onclick = function() { window.location.href = backUrl; };
    var groupLink = document.getElementById('legal-case-detail-breadcrumb-group');
    groupLink.href = backUrl;
    groupLink.textContent = group === 'SOHIB OMAD BARAKASI' ? 'Сохиб Омад' : (group || 'Группа');
    document.getElementById('legal-case-detail-breadcrumb-case').textContent = data.type || 'Дело';

    var stepsContainer = document.getElementById('legal-case-lifecycle-steps');
    if (stepsContainer) {
        var steps = stepsContainer.querySelectorAll('.legal-step');
        steps.forEach(function(step, i) {
            var idx = i + 1;
            step.classList.remove('legal-step-done', 'legal-step-active', 'legal-step-pending');
            if (idx < stepIndex) step.classList.add('legal-step-done');
            else if (idx === stepIndex) step.classList.add('legal-step-active');
            else step.classList.add('legal-step-pending');
        });
    }

    var historyEl = document.getElementById('legal-case-history-list');
    if (historyEl) {
        var history = Array.isArray(data.history) ? data.history : [];
        if (!history.length) {
            historyEl.textContent = 'Нет данных';
        } else {
            historyEl.innerHTML = '';
            history.forEach(function(h) {
                var div = document.createElement('div');
                div.className = 'legal-detail-history-list-item';
                div.innerHTML = '<span>' + escapeHtml(h.stage || '—') + '</span><span>' + escapeHtml(h.date || '—') + '</span>';
                historyEl.appendChild(div);
            });
        }
    }

    var filesList = document.getElementById('legal-case-files-list');
    var noFiles = document.getElementById('legal-case-no-files');
    var files = Array.isArray(data.files) ? data.files : [];
    if (filesList) filesList.innerHTML = '';
    if (noFiles) noFiles.style.display = files.length > 0 ? 'none' : 'block';
    files.forEach(function(f) {
        var name = f.docName || f.name || 'Документ';
        var url = f.fileUrl || f.url || '#';
        var div = document.createElement('div');
        div.className = 'legal-detail-file-item';
        div.innerHTML = '<span class="legal-detail-file-name"><i class="fas fa-file-pdf"></i>' + escapeHtml(name) + '</span>' +
            '<a href="' + escapeHtml(url) + '" class="btn btn-sm btn-outline-primary" download="' + escapeHtml(name) + '" title="Скачать"><i class="fas fa-download"></i></a>';
        if (filesList) filesList.appendChild(div);
    });
})();
