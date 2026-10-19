import { scorecardReRead } from '../../../data/v9/case-studies';

const host = document.querySelector<HTMLElement>('.v9-hiring-case');
const field = host?.querySelector<HTMLElement>('[data-case-field]');
const controls = host?.querySelector<HTMLElement>('[data-case-controls]');
const status = host?.querySelector<HTMLElement>('[data-case-status]');
if (field && controls && status) {
  const buttons = Array.from(controls.querySelectorAll<HTMLButtonElement>('[data-case-stage]'));
  const descriptions = [
    `${scorecardReRead.profileCount} profiles seen before the intake.`,
    `${scorecardReRead.passedOver.length} passed-over profiles re-read against one written bar.`,
    `${scorecardReRead.returned.length} people back in contention.`,
    `${scorecardReRead.hired.length} hired after ${scorecardReRead.daysToClose} days.`,
  ];
  const choose = (stage: number) => {
    field.dataset.stage = String(stage);
    field.setAttribute('aria-label', descriptions[stage]);
    status.textContent = descriptions[stage];
    buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === stage)));
  };
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => choose(index));
    button.addEventListener('keydown', (event) => {
      const next =
        event.key === 'ArrowRight'
          ? (index + 1) % buttons.length
          : event.key === 'ArrowLeft'
            ? (index + buttons.length - 1) % buttons.length
            : event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? buttons.length - 1
                : -1;
      if (next < 0) return;
      event.preventDefault();
      choose(next);
      buttons[next].focus();
    });
  });
  controls.hidden = false;
}
