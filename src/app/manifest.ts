import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Luxury Hair Artist',
    short_name: 'LHA',
    description: 'Exclusive hair services in Warsaw and Los Angeles',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFBF7',
    theme_color: '#1A1816',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
