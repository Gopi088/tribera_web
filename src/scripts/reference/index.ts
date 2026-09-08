import { initVolume } from './volume';
import { initRubric } from './rubric';
import { initScoreCard } from './score-card';
import { initFunnel } from './funnel';
import { initReveals, initSignalFilters, initTallies } from './motion';
import { initStickyApply, initUploadFeedback } from './candidate-ui';

interface ReferenceOptions {
  blogCopy?: boolean;
  trackAudience?: boolean;
  flipTarget?: 'card' | 'flip';
}

// Imported only by the reference-derived routes, not the hiring/candidate demos.
export function initReferenceInteractions(root: ParentNode = document, options: ReferenceOptions = {}) {
  initVolume(root, options.blogCopy);
  initRubric(root, options.blogCopy);
  initScoreCard(root, options.flipTarget);
  initFunnel(root, options.blogCopy);
  initReveals(root);
  initSignalFilters(root);
  initTallies(root);
  initStickyApply(root, options.trackAudience);
  initUploadFeedback(root);
}
