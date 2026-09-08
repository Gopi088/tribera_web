export const formIntentConfigs = {
  role: {
    audienceLabel: 'For hiring teams',
    title: 'Start with one role',
    body: 'Tell us about the role and the hiring manager who owns it. We will confirm the brief, interviewer coverage and next steps with you.',
    submitLabel: 'Discuss this role',
    formType: 'sales',
    successTitle: 'Role enquiry submitted',
    successBody: 'Our team will contact you to discuss the role and agree the next steps.',
    responseNote: 'We typically respond within 24 hours.',
  },
  demo: {
    audienceLabel: 'For hiring teams',
    title: 'Book a demo',
    body: 'Tell us about your team and hiring goals. We will set up the right walkthrough.',
    submitLabel: 'Book a demo',
    formType: 'demo',
    successTitle: 'Demo request submitted',
    successBody: 'Thanks for reaching out. Our team will contact you shortly.',
    responseNote: 'We typically respond within 24 hours.',
  },
  sales: {
    audienceLabel: 'For hiring teams',
    title: 'Contact sales',
    body: 'Tell us what you are hiring for. We will reach out with the right next step.',
    submitLabel: 'Talk to sales',
    formType: 'sales',
    successTitle: 'Request submitted',
    successBody: 'Thanks for reaching out. Our team will contact you shortly.',
    responseNote: 'Response within 24 hours for qualified hiring requests.',
  },
  candidate: {
    audienceLabel: 'For candidates',
    title: 'Create your profile',
    body: 'Share your details and resume. We will match you with high-intent opportunities.',
    submitLabel: 'Create profile',
    formType: 'candidate',
    successTitle: 'Profile submitted',
    successBody: 'Thanks for sharing your details. Our team will review and reach out shortly with the next steps.',
  },
} as const;

export type FormIntent = keyof typeof formIntentConfigs;

export const defaultHiringFormIntent: FormIntent = 'sales';
export const defaultCandidateFormIntent: FormIntent = 'candidate';
