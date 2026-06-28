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

const APPLICATIONS = [
  {
    id: 'app-1',
    data: {
      'Full Name': 'Amahoro Divine',
      'Email Address': 'divine.amahoro@gmail.com',
      'Phone Number': '+250 788 123 456',
      'Position Applied For': 'Agricultural Field Officer',
      'Cover Letter / Message': 'I have 4 years of experience working with smallholder farmers in Western Province. I am passionate about sustainable agriculture and eager to contribute to EcoCapture's biochar and CO₂ capture mission.',
    },
    status: 'new',
  },
  {
    id: 'app-2',
    data: {
      'Full Name': 'Niyonsenga Patrick',
      'Email Address': 'p.niyonsenga@outlook.com',
      'Phone Number': '+250 722 987 654',
      'Position Applied For': 'Sustainability Project Manager',
      'Cover Letter / Message': 'With an MSc in Environmental Management and 3 years leading climate-smart agriculture projects at CGIAR, I am excited to drive EcoCapture's impact at scale.',
    },
    status: 'reviewed',
  },
  {
    id: 'app-3',
    data: {
      'Full Name': 'Uwimana Claudette',
      'Email Address': 'claudette.uwimana@yahoo.com',
      'Phone Number': '+250 734 556 789',
      'Position Applied For': 'Sales & Partnerships Coordinator',
      'Cover Letter / Message': 'I previously managed agri-business partnerships at One Acre Fund Rwanda and built a network of 200+ greenhouse operators. I would love to bring that experience to EcoCapture.',
    },
    status: 'new',
  },
  {
    id: 'app-4',
    data: {
      'Full Name': 'Habimana Eric',
      'Email Address': 'eric.habimana@gmail.com',
      'Phone Number': '+250 780 234 567',
      'Position Applied For': 'Agricultural Field Officer',
      'Cover Letter / Message': 'I am a recent graduate in Agronomy from UR and have volunteered with local cooperatives in Musanze. I am eager to grow within a purpose-driven company like EcoCapture.',
    },
    status: 'new',
  },
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

  const { rows: aRows } = await pool.query('SELECT COUNT(*) FROM applications');
  if (Number(aRows[0].count) === 0) {
    for (const a of APPLICATIONS) {
      await pool.query(
        `INSERT INTO applications (id, data, status) VALUES ($1,$2,$3) ON CONFLICT (id) DO NOTHING`,
        [a.id, JSON.stringify(a.data), a.status]
      );
    }
    console.log('Applications seeded');
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
}
