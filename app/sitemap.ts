import type { MetadataRoute } from 'next';

const siteUrl = 'https://ecocapturesolution.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl,                      lastModified, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${siteUrl}/technology`,      lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/solutions`,       lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/projects`,        lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/impact`,          lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/about`,           lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/news`,            lastModified, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${siteUrl}/partner`,         lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/careers`,         lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/contact`,         lastModified, changeFrequency: 'yearly',  priority: 0.6 },
  ];
}
