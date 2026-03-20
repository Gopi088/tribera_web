import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    permalinkSlug: z.string().optional(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    readingTime: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

const jobCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/data/jobs' }),
  schema: z
    .object({
      title: z.string(),

      status: z.enum(['open', 'closed', 'draft']).default('open'),
      department: z.enum([
        'Engineering',
        'Talent Advisory',
        'Business Development',
        'Operations',
        'Founders Office',
        'Design',
        'Marketing',
      ]),
      roleFamily: z.enum(['technical', 'talent', 'go-to-market', 'operations', 'intern']),
      employmentType: z.enum(['full-time', 'intern', 'contract']),
      location: z.string(),
      remotePolicy: z.enum(['remote', 'hybrid', 'onsite']),
      experienceLevel: z.string().optional(),

      featured: z.boolean().optional().default(false),
      sortOrder: z.number().int().optional().default(100),

      summary: z.string(),
      applyEmail: z.string().email().optional(),
      applyUrl: z.string().url().optional(),

      postedAt: z.date().optional(),
      updatedAt: z.date().optional(),

      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),

      metadata: metadataDefinition(),
    })
    .superRefine((data, ctx) => {
      if (!data.applyEmail && !data.applyUrl) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Provide either applyEmail or applyUrl.',
          path: ['applyEmail'],
        });
      }
    }),
});

export const collections = {
  post: postCollection,
  job: jobCollection,
};
