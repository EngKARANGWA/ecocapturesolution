import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EcoCapture Solutions Ltd',
    short_name: 'EcoCapture',
    description: 'Turning CO₂ into opportunity for Africa — affordable carbon capture for agriculture, industry, and climate action.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2e7d32',
    icons: [
      { src: '/assets/logos/logo-ecocapture.png', sizes: '192x192', type: 'image/png' },
      { src: '/assets/logos/logo-ecocapture.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
