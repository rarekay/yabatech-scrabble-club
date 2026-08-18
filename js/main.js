document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.primary');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Sortable tables (results / ratings)
  document.querySelectorAll('table[data-sortable]').forEach(function (table) {
    var headers = table.querySelectorAll('th[data-key]');
    var tbody = table.querySelector('tbody');
    headers.forEach(function (th) {
      var arrow = document.createElement('span');
      arrow.className = 'arrow';
      arrow.textContent = '↕';
      th.appendChild(arrow);
      th.addEventListener('click', function () {
        var key = th.getAttribute('data-key');
        var type = th.getAttribute('data-type') || 'text';
        var asc = th.getAttribute('data-asc') !== 'true';
        headers.forEach(function (h) { h.removeAttribute('data-asc'); h.querySelector('.arrow').textContent = '↕'; });
        th.setAttribute('data-asc', asc);
        th.querySelector('.arrow').textContent = asc ? '↑' : '↓';

        var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
        rows.sort(function (a, b) {
          var av = a.querySelector('[data-' + key + ']').getAttribute('data-' + key);
          var bv = b.querySelector('[data-' + key + ']').getAttribute('data-' + key);
          if (type === 'number') { av = parseFloat(av); bv = parseFloat(bv); }
          if (av < bv) return asc ? -1 : 1;
          if (av > bv) return asc ? 1 : -1;
          return 0;
        });
        rows.forEach(function (r) { tbody.appendChild(r); });
      });
    });
  });

  // Search filter
  document.querySelectorAll('input[data-filter-target]').forEach(function (input) {
    var target = document.querySelector(input.getAttribute('data-filter-target'));
    if (!target) return;
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      target.querySelectorAll('tbody tr').forEach(function (row) {
        row.style.display = row.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
      });
    });
  });

  // Contact form: prevent real submit, show placeholder confirmation
  var form = document.querySelector('form[data-demo-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-status');
      if (note) note.textContent = 'This is a draft site — form submission isn\'t connected yet.';
    });
  }
});
