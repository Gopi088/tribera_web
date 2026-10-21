import { v9Href } from './routes';
import data from './sectors.json';

/** One source for index lines, cards, hero bars and sector comparisons. */
export const sectors = data.sectors;
export type Sector = (typeof sectors)[number];
export const skills = data.dimensions as (keyof Sector['weights'])[];
export const sectorValues = (sector: Sector): number[] => skills.map((skill) => sector.weights[skill]);
export const sectorHref = (slug: string, pathname = '/__v9/industries') => v9Href(`/__v9/industries/${slug}`, pathname);
