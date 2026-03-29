export const formIntentConfigs = {
  demo: {
    audienceLabel: 'For Hiring Teams',
    title: 'Book a Demo',
    body: 'Tell us about your team and hiring goals. We will set up the right walkthrough.',
    submitLabel: 'Book a Demo',
    formType: 'demo',
    successTitle: 'Demo Request Submitted',
    successBody: 'Thanks for reaching out. Our team will contact you shortly.',
    responseNote: 'We typically respond within 24 hours.',
  },
  sales: {
    audienceLabel: 'For Hiring Teams',
    title: 'Contact Sales',
    body: 'Tell us what you are hiring for. We will reach out with the right next step.',
    submitLabel: 'Talk to Sales',
    formType: 'sales',
    successTitle: 'Request Submitted',
    successBody: 'Thanks for reaching out. Our team will contact you shortly.',
    responseNote: 'Response within 24 hours for qualified hiring requests.',
  },
  candidate: {
    audienceLabel: 'For Candidates',
    title: 'Create Your Profile',
    body: 'Share your details and resume. We will match you with high-intent opportunities.',
    submitLabel: 'Create Profile',
    formType: 'candidate',
    successTitle: 'Profile Submitted',
    successBody: 'Thanks for sharing your details. Our team will review and reach out shortly with the next steps.',
  },
} as const;

export type FormIntent = keyof typeof formIntentConfigs;

export const defaultHiringFormIntent: FormIntent = 'sales';
export const defaultCandidateFormIntent: FormIntent = 'candidate';
