(function() {
    function getDetailModal() { return document.getElementById('legal-detail-modal'); }
    var legalPassportData = {
        'SOHIB OMAD BARAKASI': { pinfl: '32705861240057', birth: '', addressReg: 'ANDIJON VILOYATI, ANDIJON SHAHRI, СОЙ МФЙ, СОЙ МФЙ, КУЗИАХМЕДОВ, uy:5', kadastr: '*kadastr: 17:15:01:04:03:0106, *sana: 2009-06-23', tempReg: 'mavjud emas', orgType: 'ООО', branch: '[00059] Andijo', series: 'серия: AA601', region: 'АНДИЖОН В', phone: '999045666', address: 'Nayman 56', sector: 'corporative', nibdd: 'ID 04440057', hub: '', photo: '' },
        'Euro Global Invest': { pinfl: '31204567890123', birth: '', addressReg: 'TOSHKENT SHAHRI, YASHNABOD TUMANI, MUSTAQILLIK KO\'CHASI, 15-uy', kadastr: '*kadastr: 26:15:01:02:01:0123, *sana: 2015-03-10', tempReg: 'mavjud emas', orgType: 'MCHJ', branch: '[00078] Toshkent', series: 'серия: AB1234', region: 'ТОШКЕНТ Ш', phone: '+99871-234-5678', address: 'Mustaqillik 15', sector: 'retail', nibdd: 'ID 05678912', hub: 'Toshkent North', photo: '' },
        'Agro Trade': { pinfl: '40812345678901', birth: '', addressReg: 'SIRDARYO VILOYATI, GULISTON SHAHRI, NAVOIY KO\'CHASI, 42', kadastr: '*kadastr: 20:08:01:01:02:0042, *sana: 2012-11-20', tempReg: 'mavjud emas', orgType: 'ООО', branch: '[00122] Sirdaryo', series: 'серия: AC5678', region: 'СИРДАРЁ В', phone: '+99867-345-6789', address: 'Navoiy 42', sector: 'agriculture', nibdd: 'ID 07890123', hub: 'Sirdaryo', photo: '' },
        'OLTIN MATO-GROUP MCHJ': { pinfl: '50698765432109', birth: '', addressReg: 'QORAQALPOG\'ISTON, NUKUS SHAHRI, KARAKALPAKSTAN KO\'CHASI, 7', kadastr: '*kadastr: 23:01:02:01:01:0007, *sana: 2008-07-15', tempReg: 'mavjud emas', orgType: 'MCHJ', branch: '[00666] Nukus', series: 'серия: AD9012', region: 'НУКУС', phone: '+99861-456-7890', address: 'Karakalpakstan 7', sector: 'textile', nibdd: 'ID 09012345', hub: 'Nukus', photo: '' }
    };

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

    function updateLegalPassportCard(groupName) {
        var card = document.getElementById('legal-passport-card');
        if (!card) return;
        var data = legalPassportData[groupName] || legalPassportData['default'] || {};
        function set(id, value) {
            var el = document.getElementById(id);
            if (el) el.textContent = value !== undefined && value !== '' ? value : '—';
        }
        set('legal-pinfl', data.pinfl);
        set('legal-birth', data.birth);
        set('legal-address-reg', data.addressReg);
        set('legal-kadastr', data.kadastr);
        set('legal-temp-reg', data.tempReg);
        set('legal-org-type', data.orgType);
        set('legal-branch', data.branch);
        set('legal-series', data.series);
        set('legal-region', data.region);
        set('legal-phone', data.phone);
        set('legal-address', data.address);
        var sectorRu = { corporative: 'корпоративный', retail: 'розница', agriculture: 'сельское хозяйство', textile: 'текстиль' };
        set('legal-sector', sectorRu[data.sector] || data.sector);
        set('legal-nibdd', data.nibdd);
        set('legal-hub', data.hub);
        var photoEl = document.getElementById('legal-passport-photo');
        var placeholderEl = document.getElementById('legal-passport-photo-placeholder');
        if (photoEl && placeholderEl) {
            if (data.photo) {
                photoEl.src = data.photo;
                photoEl.style.display = '';
                placeholderEl.style.display = 'none';
            } else {
                photoEl.style.display = 'none';
                placeholderEl.style.display = 'flex';
            }
        }
    }

    window.onLegalGroupChange = function(value) {
        var name = value === 'SOHIB OMAD BARAKASI' ? 'Сохиб Омад' : value;
        document.getElementById('legal-group-title').textContent = name;
        document.getElementById('legal-group-breadcrumb').textContent = name;
        document.getElementById('legal-group-page-title').textContent = name;
        updateLegalPassportCard(value);
        window.history.pushState({}, '', 'legal-group.html?group=' + encodeURIComponent(value));
    };

    var samplePdfUrl = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldev-17.pdf';

    window.openLegalDetailModal = function(rowNum) {
        var modalEl = getDetailModal();
        if (!modalEl) return;

        var rows = [
            { client: 'ООО "BEST TEXTILE"', lawyer: 'Ибрат Нуруллаев', fileType: 'PDF', docName: 'Исковое заявление.pdf', court: 'Банкротства', fileUrl: samplePdfUrl },
            { client: 'MCHJ "EURO GLOBAL"', lawyer: 'Умид Кудратов', fileType: 'PDF', docName: 'Исполнительный лист.pdf', court: 'Экономический суд', fileUrl: samplePdfUrl },
            { client: 'ООО "AGRO TRADE"', lawyer: 'Ибрат Нуруллаев', fileType: 'PDF', docName: 'Решение суда.pdf', court: 'Уголовный суд', fileUrl: samplePdfUrl },
            { client: 'ООО "MODERNA CEMENT"', lawyer: 'Бобур Тошматов', fileType: 'PDF', docName: 'Исполнительное письмо.pdf', court: 'Административный суд', fileUrl: samplePdfUrl }
        ];
        var r = rows[Math.max(0, (rowNum - 1))] || rows[0];

        var detailClient = document.getElementById('detail-client');
        var detailLawyer = document.getElementById('detail-lawyer');
        var detailFileType = document.getElementById('detail-file-type');
        var detailDocName = document.getElementById('detail-doc-name');
        var detailCourtType = document.getElementById('detail-court-type');
        if (detailClient) detailClient.value = r.client;
        if (detailLawyer) detailLawyer.value = r.lawyer;
        if (detailFileType) detailFileType.value = r.fileType;
        if (detailDocName) detailDocName.value = r.docName;
        if (detailCourtType) detailCourtType.value = r.court;

        var iframe = document.getElementById('legal-detail-file-preview');
        var wrap = iframe ? iframe.closest('.legal-modal-preview-wrap') : null;
        var placeholder = document.getElementById('legal-detail-preview-placeholder');
        var downloadBtn = document.getElementById('legal-detail-download-btn');

        if (r.fileUrl && iframe) {
            iframe.src = r.fileUrl;
            iframe.classList.add('has-src');
            if (wrap) wrap.classList.add('loaded');
            if (placeholder) placeholder.style.display = 'none';
        } else {
            if (iframe) { iframe.src = ''; iframe.classList.remove('has-src'); }
            if (wrap) wrap.classList.remove('loaded');
            if (placeholder) placeholder.style.display = 'flex';
        }

        if (downloadBtn) {
            downloadBtn.href = r.fileUrl || '#';
            downloadBtn.download = r.docName || 'document.pdf';
            downloadBtn.style.display = r.fileUrl ? '' : 'none';
        }

        try {
            var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        } catch (e) {
            try {
                new bootstrap.Modal(modalEl).show();
            } catch (e2) {
                modalEl.classList.add('show');
                modalEl.style.display = 'block';
                document.body.classList.add('modal-open');
                var backdrop = document.createElement('div');
                backdrop.className = 'modal-backdrop fade show';
                backdrop.id = 'legal-modal-backdrop';
                document.body.appendChild(backdrop);
            }
        }
    };

    window.closeLegalDetailModal = function() {
        var m = bootstrap.Modal.getInstance(getDetailModal());
        if (m) m.hide();
    };

    function getCurrentPassportData() {
        var group = getGroupFromUrl();
        var name = group === 'SOHIB OMAD BARAKASI' ? 'Сохиб Омад' : group;
        var data = legalPassportData[group] || legalPassportData['default'] || {};
        return { groupName: name, data: data };
    }

    function downloadAsPdf() {
        if (typeof window.jspdf === 'undefined') {
            alert('Библиотека PDF не загружена. Обновите страницу.');
            return;
        }
        var cur = getCurrentPassportData();
        var d = cur.data;
        var v = function(x) { return x !== undefined && x !== '' ? x : '—'; };
        var rows = [
            ['Группа клиентов', cur.groupName],
            ['PINFL', v(d.pinfl)],
            ['TUG\'ILGAN SANA', v(d.birth)],
            ['DOIMIY RO\'YXATGA OLINGAN', v(d.addressReg)],
            ['kadastr / sana', v(d.kadastr)],
            ['VAQTINCHALIK RO\'YXATGA OLINGAN', v(d.tempReg)],
            ['Клиент / Компания / Организация', v(d.orgType)],
            ['Банковский филиал', v(d.branch)],
            ['Паспортные данные', v(d.series)],
            ['Область / Район', v(d.region)],
            ['Номер телефона', v(d.phone)],
            ['Адрес', v(d.address)],
            ['Sektor', v(d.sector)],
            ['NIBDD', v(d.nibdd)],
            ['Biriktirilgan HUB', v(d.hub)]
        ];
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        doc.setFontSize(14);
        doc.text('Информация о клиенте', 14, 16);
        doc.setFontSize(10);
        var y = 24;
        rows.forEach(function(r) {
            doc.setFont(undefined, 'bold');
            doc.text(r[0] + ': ', 14, y);
            doc.setFont(undefined, 'normal');
            var line = String(r[1]);
            var split = doc.splitTextToSize(line, 160);
            doc.text(split, 14, y + 5);
            y += 6 + split.length * 5;
        });
        doc.save('informaciya-o-kliente-' + (cur.groupName.replace(/\s+/g, '-')) + '.pdf');
    }

    function downloadAsWord() {
        var cur = getCurrentPassportData();
        var d = cur.data;
        var v = function(x) { return x !== undefined && x !== '' ? x : '—'; };
        var rows = [
            ['Группа клиентов', cur.groupName],
            ['PINFL', v(d.pinfl)],
            ['TUG\'ILGAN SANA', v(d.birth)],
            ['DOIMIY RO\'YXATGA OLINGAN', v(d.addressReg)],
            ['kadastr / sana', v(d.kadastr)],
            ['VAQTINCHALIK RO\'YXATGA OLINGAN', v(d.tempReg)],
            ['Клиент / Компания / Организация', v(d.orgType)],
            ['Банковский филиал', v(d.branch)],
            ['Паспортные данные', v(d.series)],
            ['Область / Район', v(d.region)],
            ['Номер телефона', v(d.phone)],
            ['Адрес', v(d.address)],
            ['Sektor', v(d.sector)],
            ['NIBDD', v(d.nibdd)],
            ['Biriktirilgan HUB', v(d.hub)]
        ];
        var tableRows = rows.map(function(r) {
            return '<tr><td style="padding:6px 10px;border:1px solid #ddd;font-weight:bold;width:220px;">' + escapeHtml(r[0]) + '</td><td style="padding:6px 10px;border:1px solid #ddd;">' + escapeHtml(r[1]) + '</td></tr>';
        }).join('');
        function escapeHtml(s) {
            var div = document.createElement('div');
            div.textContent = s;
            return div.innerHTML;
        }
        var html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>Информация о клиенте</title></head><body><h2>Информация о клиенте</h2><table style="border-collapse:collapse;width:100%;">' + tableRows + '</table></body></html>';
        var blob = new Blob(['\ufeff' + html], { type: 'application/msword' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'informaciya-o-kliente-' + (cur.groupName.replace(/\s+/g, '-')) + '.doc';
        a.click();
        URL.revokeObjectURL(a.href);
    }

    window.openAddCaseModal = function() {
        var activeTab = document.querySelector('.legal-courts-nav .nav-link.active');
        var instanceName = activeTab ? activeTab.textContent.trim() : '1-инстанция';
        if (typeof alert !== 'undefined') {
            alert('Добавление дела в раздел «' + instanceName + '». Здесь можно открыть форму или модальное окно для создания нового дела.');
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        setGroupTitle();
        updateLegalPassportCard(getGroupFromUrl());
        var pdfBtn = document.getElementById('legal-download-pdf');
        var wordBtn = document.getElementById('legal-download-word');
        if (pdfBtn) pdfBtn.addEventListener('click', downloadAsPdf);
        if (wordBtn) wordBtn.addEventListener('click', downloadAsWord);
        var addCaseBtn = document.getElementById('legal-add-case-btn');
        if (addCaseBtn) addCaseBtn.addEventListener('click', openAddCaseModal);
    });
})();
