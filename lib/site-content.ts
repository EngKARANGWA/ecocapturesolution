import sql from '@/lib/db';

export interface HomeStat {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  description?: string;
}

export interface ProductCard {
  id: string;
  name: string;
  slug: string;
  summary: string;
  features: string[];
  image: string;
  category: string;
  status: string;
}

export interface NewsItem {
  id: string;
  title: string;
  body: string;
  category: string;
  date: string;
  featured: boolean;
  archived: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  timeline: string;
  partners: string[];
  results: string[];
  images: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  category: string;
  status: string;
}

const defaultHomeStats: HomeStat[] = [
  { id: 'co2-captured', label: 'CO₂ Captured', value: '120', suffix: '+', description: 'Tonnes captured and reused' },
  { id: 'biochar-produced', label: 'Biochar Produced', value: '18', suffix: 't', description: 'Returned to the soil' },
  { id: 'farmers-supported', label: 'Farmers Reached', value: '150', suffix: '+', description: 'Farmers supported directly' },
  { id: 'projects', label: 'Projects', value: '4', suffix: '+', description: 'Pilots and deployments' },
];

const defaultProducts: ProductCard[] = [
  {
    id: 'ecocapture-dac',
    name: 'EcoCapture DAC',
    slug: 'ecocapture-dac',
    summary: 'Direct air capture units that pull CO₂ from the atmosphere for storage or reuse.',
    features: ['Atmospheric capture', 'Modular design', 'Low-energy operation', 'Built for field deployment'],
    image: '/assets/projects/co2-capture.jpg',
    category: 'Direct Air Capture',
    status: 'active',
  },
  {
    id: 'ecocapture-biopure',
    name: 'EcoCapture BioPure',
    slug: 'ecocapture-biopure',
    summary: 'Biomethane upgrading and purification systems that turn biogas into clean renewable fuel.',
    features: ['Removes CO₂ and H₂S', 'Improves methane purity', 'Recovers valuable CO₂', 'Supports circular energy systems'],
    image: '/assets/projects/circular economy.jpg',
    category: 'Biomethane Upgrading',
    status: 'active',
  },
  {
    id: 'ecocapture-co2-recovery',
    name: 'EcoCapture CO₂ Recovery',
    slug: 'ecocapture-co2-recovery',
    summary: 'Systems that recover CO₂ from processing streams for greenhouse enrichment and industrial reuse.',
    features: ['CO₂ recovery', 'Greenhouse-ready output', 'Industrial integration', 'Traceable carbon flow'],
    image: '/assets/projects/greenhouse.jpg',
    category: 'CO₂ Recovery',
    status: 'active',
  },
  {
    id: 'ecocapture-biochar',
    name: 'EcoCapture Biochar',
    slug: 'ecocapture-biochar',
    summary: 'Biochar production systems that create soil amendments and long-term carbon storage.',
    features: ['Biomass conversion', 'Soil fertility gains', 'Permanent carbon removal', 'Farmer-ready application'],
    image: '/assets/projects/biochar.png',
    category: 'Biochar Production',
    status: 'active',
  },
];

const defaultStory = [
  'EcoCapture Solutions is a climate technology company designing systems that capture, recover, purify, and use carbon across agriculture and industry.',
  'We started with greenhouse CO₂ enrichment, then expanded into direct air capture, biomethane upgrading, CO₂ recovery, and biochar production.',
  'Today our work is connected by one idea: turn carbon from a waste stream into a resource that strengthens food systems, renewable energy, and climate resilience.',
];

const defaultNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'EcoCapture expands from greenhouse enrichment into integrated carbon technologies',
    body: 'The company is now focused on direct air capture, biomethane upgrading, CO₂ recovery, biochar production, and greenhouse enrichment as one connected platform.',
    category: 'Company Update',
    date: '2026-01-15',
    featured: true,
    archived: false,
  },
  {
    id: 'news-2',
    title: 'Biochar and CO₂ recovery pilots continue in Kigali and Karongi',
    body: 'Pilot work is helping the team validate integrated carbon management workflows with farmers and greenhouse partners.',
    category: 'Projects',
    date: '2025-10-02',
    featured: false,
    archived: false,
  },
];

const defaultProjects: ProjectItem[] = [
  {
    id: 'project-1',
    title: 'Karongi Integrated Pilot',
    description: 'Our pilot combines CO₂ capture, greenhouse enrichment, and biochar production in a single circular system.',
    location: 'Karongi, Rwanda',
    status: 'Active',
    timeline: '2023 - Present',
    partners: ['Local farmers', 'Greenhouse operators'],
    results: ['CO₂ reused in greenhouses', 'Biochar distributed to farmers', 'Field data collected for scale-up'],
    images: ['/assets/projects/greenhouse.jpg', '/assets/projects/biochar.png'],
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Partner feedback',
    role: 'Pilot collaborator',
    quote: 'EcoCapture feels like a practical climate partner, not just a concept. The integrated approach makes sense for farmers and industry.',
    category: 'Partner',
    status: 'approved',
  },
  {
    id: 'testimonial-2',
    name: 'Farmer success story',
    role: 'Farmer community',
    quote: 'The biochar support improved our soil and gave us a clearer way to talk about carbon and productivity together.',
    category: 'Farmer',
    status: 'approved',
  },
];

async function readJsonColumn<T>(query: string, fallback: T): Promise<T> {
  try {
    const rows = await sql(query);
    return (rows as T) ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getHomeStats() {
  try {
    const rows = await sql`
      SELECT key AS id, label, value, suffix, description
      FROM site_stats
      WHERE status = 'active'
      ORDER BY sort_order ASC, label ASC
    `;
    return rows.length ? (rows as HomeStat[]) : defaultHomeStats;
  } catch {
    return defaultHomeStats;
  }
}

export async function getProducts() {
  try {
    const rows = await sql`
      SELECT id, name, slug, summary, features, image, category, status
      FROM products
      WHERE status = 'active'
      ORDER BY sort_order ASC, name ASC
    `;
    if (!rows.length) return defaultProducts;
    return (rows as Array<Omit<ProductCard, 'features'> & { features: string[] }>) as ProductCard[];
  } catch {
    return defaultProducts;
  }
}

export async function getStoryParagraphs() {
  try {
    const rows = await sql`
      SELECT paragraph
      FROM company_story
      WHERE status = 'active'
      ORDER BY sort_order ASC
    `;
    return rows.length ? rows.map((row) => String((row as { paragraph: string }).paragraph)) : defaultStory;
  } catch {
    return defaultStory;
  }
}

export async function getNewsItems() {
  try {
    const rows = await sql`
      SELECT id, title, body, category, publish_date AS date, featured, archived
      FROM news_items
      WHERE archived = false
      ORDER BY featured DESC, publish_date DESC, created_at DESC
    `;
    return rows.length ? (rows as NewsItem[]) : defaultNews;
  } catch {
    return defaultNews;
  }
}

export async function getProjects() {
  try {
    const rows = await sql`
      SELECT id, title, description, location, status, timeline, partners, results, images
      FROM projects
      ORDER BY created_at DESC
    `;
    return rows.length ? (rows as ProjectItem[]) : defaultProjects;
  } catch {
    return defaultProjects;
  }
}

export async function getTestimonials() {
  try {
    const rows = await sql`
      SELECT id, name, role, quote, category, status
      FROM testimonials
      WHERE status = 'approved'
      ORDER BY created_at DESC
    `;
    return rows.length ? (rows as Testimonial[]) : defaultTestimonials;
  } catch {
    return defaultTestimonials;
  }
}

export function getPartnerGroups() {
  return [
    { title: 'Investors', description: 'Back the scale-up of integrated carbon technologies.', items: ['Climate funds', 'Impact investors', 'Family offices'] },
    { title: 'Universities', description: 'Collaborate on trials, research, and field validation.', items: ['Research labs', 'Student projects', 'Applied studies'] },
    { title: 'Government', description: 'Work with public institutions on climate, agriculture, and energy goals.', items: ['Policy support', 'Pilot programs', 'Public procurement'] },
    { title: 'NGOs', description: 'Support farmer adoption and community impact.', items: ['Development programs', 'Community training', 'Climate resilience'] },
    { title: 'Research Institutions', description: 'Test, measure, and improve the technologies.', items: ['Technical pilots', 'Data sharing', 'Impact studies'] },
    { title: 'Corporate Partners', description: 'Reduce emissions while supporting food systems and local industry.', items: ['Industrial CO₂ recovery', 'CSR partnerships', 'Supply chain collaboration'] },
  ];
}

export const homeHighlights = [
  'Direct Air Capture (DAC)',
  'Biomethane Upgrading & Purification',
  'CO₂ Recovery & Utilization',
  'Biochar Production',
  'Greenhouse CO₂ Enrichment',
  'Carbon Removal Technologies',
];

export const companyStoryTitle = 'EcoCapture today';
