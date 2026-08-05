import { pool } from './db';

const OPENINGS = [
  {
    id: 'opening-1',
    title: 'Agricultural Field Officer',
    type: 'Full-time',
    location: 'Kigali, Rwanda',
    description: 'Work directly with farmers to implement sustainable practices and distribute biochar fertilizers across farming communities.',
    tags: ['Agriculture', 'Field Work', 'Community'],
    status: 'open',
  },
  {
    id: 'opening-2',
    title: 'Sustainability Project Manager',
    type: 'Full-time',
    location: 'Kigali, Rwanda',
    description: 'Lead climate-smart agriculture and CO₂ capture projects from planning through field implementation and impact reporting.',
    tags: ['Project Management', 'Climate', 'Leadership'],
    status: 'open',
  },
  {
    id: 'opening-3',
    title: 'Sales & Partnerships Coordinator',
    type: 'Full-time',
    location: 'Kigali, Rwanda',
    description: 'Drive market expansion, build relationships with greenhouse operators and agri-businesses, and grow farmer engagement.',
    tags: ['Sales', 'Partnerships', 'Business Development'],
    status: 'open',
  },
];

const PARTNERS = [
  {
    id: 'partner-1',
    name: 'Tony Elumelu Foundation',
    logo: '/assets/partners/partner-tef.png',
    website: 'https://www.tonyelumelufoundation.org/',
    type: 'NGO & Donor',
    status: 'active',
  },
  {
    id: 'partner-2',
    name: 'Unipod',
    logo: '/assets/partners/partner-unipod.png',
    website: 'https://unipod.rw/',
    type: 'Greenhouse Operator',
    status: 'active',
  },
  {
    id: 'partner-3',
    name: 'FasterCapital',
    logo: '/assets/partners/fastercapital.png',
    website: 'https://fastercapital.com/',
    type: 'Investor',
    status: 'active',
  },
];

const FORM_SCHEMAS = {
  careers: {
    title: 'Apply for a Position',
    description: 'Join EcoCapture Solutions and help us build a sustainable future for Rwanda.',
    fields: [
      { id: 'f1', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true, options: [] },
      { id: 'f2', label: 'Email Address', type: 'email', placeholder: 'you@example.com', required: true, options: [] },
      { id: 'f3', label: 'Phone Number', type: 'tel', placeholder: '+250 7XX XXX XXX', required: false, options: [] },
      { id: 'f4', label: 'Position Applied For', type: 'text', placeholder: 'e.g. Agricultural Field Officer', required: true, options: [] },
      { id: 'f5', label: 'Cover Letter / Message', type: 'textarea', placeholder: 'Tell us why you want to join EcoCapture...', required: true, options: [] },
    ],
  },
  partners: {
    title: 'Partner With Us',
    description: 'Interested in partnering with EcoCapture Solutions? Fill in your details and we will get back to you.',
    fields: [
      { id: 'f1', label: 'Organisation Name', type: 'text', placeholder: 'e.g. Tony Elumelu Foundation', required: true, options: [] },
      { id: 'f2', label: 'Contact Person', type: 'text', placeholder: 'Your name', required: true, options: [] },
      { id: 'f3', label: 'Email Address', type: 'email', placeholder: 'contact@organisation.com', required: true, options: [] },
      { id: 'f4', label: 'Website', type: 'url', placeholder: 'https://organisation.com', required: false, options: [] },
      { id: 'f5', label: 'Partnership Interest', type: 'textarea', placeholder: 'Describe how you would like to partner with us...', required: true, options: [] },
    ],
  },
};

const SITE_STATS = [
  { key: 'co2-captured', label: 'CO₂ Captured', value: '120', suffix: '+', description: 'Tonnes captured and reused', sort_order: 1 },
  { key: 'biochar-produced', label: 'Biochar Produced', value: '18', suffix: 't', description: 'Returned to the soil', sort_order: 2 },
  { key: 'farmers-reached', label: 'Farmers Reached', value: '150', suffix: '+', description: 'Farmers supported directly', sort_order: 3 },
  { key: 'projects', label: 'Projects', value: '4', suffix: '+', description: 'Pilots and deployments', sort_order: 4 },
];

const PRODUCTS = [
  {
    id: 'ecocapture-dac', name: 'EcoCapture DAC', slug: 'ecocapture-dac',
    summary: 'Direct air capture units that pull CO₂ from the atmosphere for storage or reuse.',
    features: ['Atmospheric capture', 'Modular design', 'Low-energy operation', 'Built for field deployment'],
    image: '/assets/projects/co2-capture.jpg', category: 'Direct Air Capture', status: 'active', sort_order: 1,
  },
  {
    id: 'ecocapture-biopure', name: 'EcoCapture BioPure', slug: 'ecocapture-biopure',
    summary: 'Biomethane upgrading and purification systems that turn biogas into clean renewable fuel.',
    features: ['Removes CO₂ and H₂S', 'Improves methane purity', 'Recovers valuable CO₂', 'Supports circular energy systems'],
    image: '/assets/projects/circular economy.jpg', category: 'Biomethane Upgrading', status: 'active', sort_order: 2,
  },
  {
    id: 'ecocapture-co2-recovery', name: 'EcoCapture CO₂ Recovery', slug: 'ecocapture-co2-recovery',
    summary: 'Systems that recover CO₂ from processing streams for greenhouse enrichment and industrial reuse.',
    features: ['CO₂ recovery', 'Greenhouse-ready output', 'Industrial integration', 'Traceable carbon flow'],
    image: '/assets/projects/greenhouse.jpg', category: 'CO₂ Recovery', status: 'active', sort_order: 3,
  },
  {
    id: 'ecocapture-biochar', name: 'EcoCapture Biochar', slug: 'ecocapture-biochar',
    summary: 'Biochar production systems that create soil amendments and long-term carbon storage.',
    features: ['Biomass conversion', 'Soil fertility gains', 'Permanent carbon removal', 'Farmer-ready application'],
    image: '/assets/projects/biochar.png', category: 'Biochar Production', status: 'active', sort_order: 4,
  },
];

const COMPANY_STORY = [
  'EcoCapture Solutions is a climate technology company designing systems that capture, recover, purify, and use carbon across agriculture and industry.',
  'We started with greenhouse CO₂ enrichment, then expanded into direct air capture, biomethane upgrading, CO₂ recovery, and biochar production.',
  'Today our work is connected by one idea: turn carbon from a waste stream into a resource that strengthens food systems, renewable energy, and climate resilience.',
];

const NEWS = [
  {
    id: 'news-1',
    title: 'EcoCapture expands from greenhouse enrichment into integrated carbon technologies',
    body: 'The company is now focused on direct air capture, biomethane upgrading, CO₂ recovery, biochar production, and greenhouse enrichment as one connected platform.',
    category: 'Company Update',
    publish_date: '2026-01-15',
    featured: true,
    archived: false,
    slug: 'eco-capture-integrated-carbon-technologies',
  },
  {
    id: 'news-2',
    title: 'Biochar and CO₂ recovery pilots continue in Kigali and Karongi',
    body: 'Pilot work is helping the team validate integrated carbon management workflows with farmers and greenhouse partners.',
    category: 'Projects',
    publish_date: '2025-10-02',
    featured: false,
    archived: false,
    slug: 'biochar-co2-recovery-pilots-kigali-karongi',
  },
];

const PROJECTS = [
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

const TESTIMONIALS = [
  { id: 'testimonial-1', name: 'Partner feedback', role: 'Pilot collaborator', quote: 'EcoCapture feels like a practical climate partner, not just a concept. The integrated approach makes sense for farmers and industry.', category: 'Partner', status: 'approved' },
  { id: 'testimonial-2', name: 'Farmer success story', role: 'Farmer community', quote: 'The biochar support improved our soil and gave us a clearer way to talk about carbon and productivity together.', category: 'Farmer', status: 'approved' },
];

const RESOURCES = [
  { id: 'resource-1', title: 'Company Profile', description: 'Overview of EcoCapture Solutions and our climate technology roadmap.', file_url: '/uploads/company-profile.pdf', type: 'PDF', category: 'Company' },
  { id: 'resource-2', title: 'Product Brochure', description: 'A brochure covering EcoCapture DAC, BioPure, CO₂ Recovery, and Biochar.', file_url: '/uploads/product-brochure.pdf', type: 'PDF', category: 'Products' },
];

export async function seedInitialData() {
  const { rows: oRows } = await pool.query('SELECT COUNT(*) FROM openings');
  if (Number(oRows[0].count) === 0) {
    for (const o of OPENINGS) {
      await pool.query(
        `INSERT INTO openings (id, title, type, location, description, tags, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (id) DO NOTHING`,
        [o.id, o.title, o.type, o.location, o.description, JSON.stringify(o.tags), o.status]
      );
    }
    console.log('Openings seeded');
  }

  const { rows: pRows } = await pool.query('SELECT COUNT(*) FROM partners');
  if (Number(pRows[0].count) === 0) {
    for (const p of PARTNERS) {
      await pool.query(
        `INSERT INTO partners (id, name, logo, website, type, status)
         VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING`,
        [p.id, p.name, p.logo, p.website, p.type, p.status]
      );
    }
    console.log('Partners seeded');
  }

  const { rows: fRows } = await pool.query('SELECT COUNT(*) FROM form_schemas');
  if (Number(fRows[0].count) === 0) {
    for (const [key, schema] of Object.entries(FORM_SCHEMAS)) {
      await pool.query(
        `INSERT INTO form_schemas (key, schema) VALUES ($1,$2) ON CONFLICT (key) DO NOTHING`,
        [key, JSON.stringify(schema)]
      );
    }
    console.log('Form schemas seeded');
  }

  const { rows: statRows } = await pool.query('SELECT COUNT(*) FROM site_stats');
  if (Number(statRows[0].count) === 0) {
    for (const stat of SITE_STATS) {
      await pool.query(
        `INSERT INTO site_stats (key, label, value, suffix, description, status, sort_order)
         VALUES ($1,$2,$3,$4,$5,'active',$6) ON CONFLICT (key) DO NOTHING`,
        [stat.key, stat.label, stat.value, stat.suffix ?? null, stat.description ?? null, stat.sort_order]
      );
    }
    console.log('Site stats seeded');
  }

  const { rows: productRows } = await pool.query('SELECT COUNT(*) FROM products');
  if (Number(productRows[0].count) === 0) {
    for (const product of PRODUCTS) {
      await pool.query(
        `INSERT INTO products (id, name, slug, summary, features, image, category, status, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (id) DO NOTHING`,
        [product.id, product.name, product.slug, product.summary, JSON.stringify(product.features), product.image, product.category, product.status, product.sort_order]
      );
    }
    console.log('Products seeded');
  }

  const { rows: storyRows } = await pool.query('SELECT COUNT(*) FROM company_story');
  if (Number(storyRows[0].count) === 0) {
    for (const [index, paragraph] of COMPANY_STORY.entries()) {
      await pool.query(
        `INSERT INTO company_story (id, paragraph, status, sort_order)
         VALUES ($1,$2,'active',$3) ON CONFLICT (id) DO NOTHING`,
        [`story-${index + 1}`, paragraph, index + 1]
      );
    }
    console.log('Company story seeded');
  }

  const { rows: newsRows } = await pool.query('SELECT COUNT(*) FROM news_items');
  if (Number(newsRows[0].count) === 0) {
    for (const news of NEWS) {
      await pool.query(
        `INSERT INTO news_items (id, title, body, category, publish_date, featured, archived, slug)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT (id) DO NOTHING`,
        [news.id, news.title, news.body, news.category, news.publish_date, news.featured, news.archived, news.slug]
      );
    }
    console.log('News seeded');
  }

  const { rows: projectRows } = await pool.query('SELECT COUNT(*) FROM projects');
  if (Number(projectRows[0].count) === 0) {
    for (const project of PROJECTS) {
      await pool.query(
        `INSERT INTO projects (id, title, description, location, status, timeline, partners, results, images)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (id) DO NOTHING`,
        [project.id, project.title, project.description, project.location, project.status, project.timeline, JSON.stringify(project.partners), JSON.stringify(project.results), JSON.stringify(project.images)]
      );
    }
    console.log('Projects seeded');
  }

  const { rows: testimonialRows } = await pool.query('SELECT COUNT(*) FROM testimonials');
  if (Number(testimonialRows[0].count) === 0) {
    for (const testimonial of TESTIMONIALS) {
      await pool.query(
        `INSERT INTO testimonials (id, name, role, quote, category, status)
         VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING`,
        [testimonial.id, testimonial.name, testimonial.role, testimonial.quote, testimonial.category, testimonial.status]
      );
    }
    console.log('Testimonials seeded');
  }

  const { rows: resourceRows } = await pool.query('SELECT COUNT(*) FROM resources');
  if (Number(resourceRows[0].count) === 0) {
    for (const resource of RESOURCES) {
      await pool.query(
        `INSERT INTO resources (id, title, description, file_url, type, category)
         VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING`,
        [resource.id, resource.title, resource.description, resource.file_url, resource.type, resource.category]
      );
    }
    console.log('Resources seeded');
  }
}
