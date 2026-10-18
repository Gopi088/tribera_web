import { comparison, intelligenceChart, type Series, type IntelligenceSeries } from '~/utils/chart-model';

export function initComparison() {
  const a = document.querySelector<HTMLSelectElement>('#secA');
  const b = document.querySelector<HTMLSelectElement>('#secB');
  const footer = document.getElementById('cmpFt');
  if (!a || !b || !footer || a.dataset.ready) return;
  const data: Record<string, Series> = JSON.parse(a.dataset.series!);
  function paint() {
    if (!a || !b || !footer) return;
    const model = comparison(data[a.value], data[b.value], a.dataset.scale === 'relative');
    model.rows.forEach((row, i) => {
      document.getElementById('fa' + i)!.style.width = row.widthA + '%';
      document.getElementById('fb' + i)!.style.width = row.widthB + '%';
      document.getElementById('va' + i)!.textContent = String(row.a);
      document.getElementById('vb' + i)!.textContent = String(row.b);
      document.getElementById('bw' + i)!.classList.toggle('key', row.key);
    });
    footer.textContent = model.note;
  }
  paint();
  a.addEventListener('change', paint);
  b.addEventListener('change', paint);
  a.disabled = b.disabled = false;
  a.dataset.ready = 'true';
  document.getElementById('comparisonHint')?.remove();
}

export function initIntelligence() {
  const select = document.querySelector<HTMLSelectElement>('#fnSel');
  const footer = document.getElementById('intelFt');
  if (!select || !footer || select.dataset.ready) return;
  const data: Record<string, IntelligenceSeries> = JSON.parse(select.dataset.series!);
  function paint() {
    if (!select || !footer) return;
    const model = intelligenceChart(data[select.value]);
    model.rows.forEach((row, i) => {
      document.getElementById('if' + i)!.style.width = row.width + '%';
      document.getElementById('iv' + i)!.textContent = row.value + '%';
      document.getElementById('iw' + i)!.classList.toggle('key', row.key);
    });
    footer.textContent = model.note;
  }
  paint();
  select.addEventListener('change', paint);
  select.disabled = false;
  select.dataset.ready = 'true';
  document.getElementById('intelligenceHint')?.remove();
}
