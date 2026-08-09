import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { MetaData } from '~/types';
import { cleanSlug, getPermalink } from './permalinks';

export type JobStatus = 'open' | 'closed' | 'draft';
export type JobDepartment =
  | 'Engineering'
  | 'Talent Advisory'
  | 'Business Development'
  | 'Operations'
  | 'Founders Office'
  | 'Design'
  | 'Marketing';
export type JobRoleFamily = 'technical' | 'talent' | 'go-to-market' | 'operations' | 'intern';
export type JobEmploymentType = 'full-time' | 'intern' | 'contract';
export type JobRemotePolicy = 'remote' | 'onsite';

export interface Job {
  id: string;
  slug: string;
  permalink: string;

  title: string;
  status: JobStatus;
  department: JobDepartment;
  roleFamily: JobRoleFamily;
  employmentType: JobEmploymentType;
  location: string;
  remotePolicy: JobRemotePolicy;
  experienceLevel?: string;
  positions: number;

  featured: boolean;
  sortOrder: number;

  summary: string;
  applyEmail?: string;
  applyUrl?: string;

  postedAt?: Date;
  updatedAt?: Date;
  seoTitle?: string;
  seoDescription?: string;
  metadata?: MetaData;

  Content?: AstroComponentFactory;
  content?: string;
}

export interface JobGroup {
  department: JobDepartment;
  jobs: Array<Job>;
}

const compareJobs = (a: Job, b: Job) => {
  if (a.featured !== b.featured) {
    return a.featured ? -1 : 1;
  }

  if (a.sortOrder !== b.sortOrder) {
    return a.sortOrder - b.sortOrder;
  }

  const aPostedAt = a.postedAt?.valueOf() || 0;
  const bPostedAt = b.postedAt?.valueOf() || 0;
  if (aPostedAt !== bPostedAt) {
    return bPostedAt - aPostedAt;
  }

  return a.title.localeCompare(b.title);
};

const getNormalizedJob = async (job: CollectionEntry<'job'>): Promise<Job> => {
  const { id, data } = job;
  const { Content, remarkPluginFrontmatter } = await render(job);

  const {
    title,
    status = 'open',
    department,
    roleFamily,
    employmentType,
    location,
    remotePolicy,
    experienceLevel,
    positions = 1,
    featured = false,
    sortOrder = 100,
    summary,
    applyEmail,
    applyUrl,
    postedAt: rawPostedAt,
    updatedAt: rawUpdatedAt,
    seoTitle,
    seoDescription,
    metadata = {},
  } = data;

  const slug = cleanSlug(id);
  const remarkPublishDate = remarkPluginFrontmatter?.publishDate;
  const postedAt = rawPostedAt ? new Date(rawPostedAt) : remarkPublishDate ? new Date(remarkPublishDate) : undefined;
  const updatedAt = rawUpdatedAt ? new Date(rawUpdatedAt) : undefined;

  return {
    id: id,
    slug: slug,
    permalink: getPermalink(`careers/${slug}`),

    title: title,
    status: status,
    department: department,
    roleFamily: roleFamily,
    employmentType: employmentType,
    location: location,
    remotePolicy: remotePolicy,
    experienceLevel: experienceLevel,
    positions: positions,

    featured: featured,
    sortOrder: sortOrder,

    summary: summary,
    applyEmail: applyEmail,
    applyUrl: applyUrl,

    postedAt: postedAt,
    updatedAt: updatedAt,
    seoTitle: seoTitle,
    seoDescription: seoDescription,
    metadata: metadata,

    Content: Content,
  };
};

const load = async function (): Promise<Array<Job>> {
  const jobs = await getCollection('job');
  const normalizedJobs = jobs.map(async (job) => await getNormalizedJob(job));

  const results = (await Promise.all(normalizedJobs)).filter((job) => job.status !== 'draft').sort(compareJobs);

  return results;
};

let _jobs: Array<Job>;

/** */
export const fetchJobs = async (): Promise<Array<Job>> => {
  if (!_jobs) {
    _jobs = await load();
  }

  return _jobs;
};

/** */
export const findJobsBySlugs = async (slugs: Array<string>): Promise<Array<Job>> => {
  if (!Array.isArray(slugs)) return [];

  const jobs = await fetchJobs();

  return slugs.reduce(function (r: Array<Job>, slug: string) {
    jobs.some(function (job: Job) {
      return slug === job.slug && r.push(job);
    });
    return r;
  }, []);
};

/** */
export const findJobBySlug = async (slug: string): Promise<Job | undefined> => {
  if (!slug) return undefined;

  const jobs = await fetchJobs();

  return jobs.find((job) => job.slug === cleanSlug(slug));
};

/** */
export const findOpenJobs = async (): Promise<Array<Job>> => {
  const jobs = await fetchJobs();

  return jobs.filter((job) => job.status === 'open');
};

/** */
export const findFeaturedJobs = async (): Promise<Array<Job>> => {
  const jobs = await findOpenJobs();

  return jobs.filter((job) => job.featured);
};

/** */
export const groupJobsByDepartment = (jobs: Array<Job> = []): Array<JobGroup> => {
  const departments = new Map<JobDepartment, Array<Job>>();

  jobs.forEach((job) => {
    const currentJobs = departments.get(job.department) || [];
    currentJobs.push(job);
    departments.set(job.department, currentJobs);
  });

  return Array.from(departments.entries()).map(([department, groupedJobs]) => ({
    department,
    jobs: groupedJobs.sort(compareJobs),
  }));
};

/** */
export const findOpenJobsByDepartment = async (): Promise<Array<JobGroup>> => {
  const jobs = await findOpenJobs();
  return groupJobsByDepartment(jobs);
};

/** */
export const getStaticPathsJobs = async () => {
  return (await fetchJobs()).flatMap((job) => ({
    params: {
      slug: job.slug,
    },
    props: { job },
  }));
};
