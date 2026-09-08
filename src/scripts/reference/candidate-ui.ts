import { byId, claim } from './dom';
export function initStickyApply(root: ParentNode = document, trackAudience = false) {
  if (!claim(root, 'initStickyApply', '#candidates')) return;

  /* nav switcher reflects where you are */
  const cand = byId(root, 'candidates'),
    sw = [].slice.call(root.querySelectorAll('.nav__sw a')),
    bar = byId(root, 'stickcta'),
    applyBox = byId(root, 'apply');
  if (trackAudience) {
    if (cand && sw.length) {
      new IntersectionObserver(
        function (es) {
          es.forEach(function (e) {
            const inCand = e.isIntersecting;
            sw[0].classList.toggle('is', !inCand);
            sw[1].classList.toggle('is', inCand);
          });
        },
        { threshold: 0.18 }
      ).observe(cand);
    }
  }

  /* sticky apply bar: only while the candidate section is on screen,
     and never on top of the apply card itself */
  if (cand && bar && applyBox) {
    let inSection = false,
      atForm = false;
    function sync() {
      if (!bar) return;
      bar.classList.toggle('show', inSection && !atForm);
    }
    new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          inSection = e.isIntersecting;
          sync();
        });
      },
      { threshold: 0.12 }
    ).observe(cand);
    new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          atForm = e.isIntersecting;
          sync();
        });
      },
      { threshold: 0.3 }
    ).observe(applyBox);
  }
}
export function initUploadFeedback(root: ParentNode = document) {
  if (!claim(root, 'initUploadFeedback', '.apply__file input')) return;

  /* a filename is better feedback than a silent upload */
  const fileIn = root.querySelector<HTMLInputElement>('.apply__file input');

  if (fileIn)
    fileIn.addEventListener('change', function () {
      const lbl = fileIn.parentElement?.querySelector('span');
      if (lbl && fileIn.files && fileIn.files[0]) lbl.textContent = fileIn.files[0].name;
    });
}
