import { byId, claim } from './dom';
import { blogVolume, standardVolume } from './copy';
export function initVolume(root: ParentNode = document, blogCopy = false) {
  if (!claim(root, 'initVolume', '.vseg')) return;

  const V = blogCopy ? blogVolume : standardVolume;

  const segs = [].slice.call(root.querySelectorAll('.vseg')),
    out = byId(root, 'volOut');

  if (!segs.length || !out) return;

  const nm = byId(root, 'volNm'),
    vv = byId(root, 'volV'),
    dd = byId(root, 'volD'),
    pts = byId(root, 'volPts');

  function pick(i) {
    if (!out || !nm || !vv || !dd || !pts) return;
    const s = V[i];
    segs.forEach(function (b, j) {
      b.classList.toggle('is', j === i);
      b.setAttribute('aria-selected', String(j === i));
    });
    nm.textContent = s.nm;
    vv.innerHTML = s.v + ' <span>hires a year</span>';
    dd.textContent = s.d;
    pts.innerHTML = s.p
      .map(function (t) {
        return '<li>' + t + '</li>';
      })
      .join('');
    out.classList.remove('swap-in');
    void out.offsetWidth;
    out.classList.add('swap-in');
  }

  segs.forEach(function (b, i) {
    b.addEventListener('click', function () {
      pick(i);
    });
    b.addEventListener('mouseenter', function () {
      pick(i);
    });
  });

  pick(1);
}
