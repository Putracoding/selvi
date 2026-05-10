import { PhotoboothPackage } from './types';

export const PACKAGES: PhotoboothPackage[] = [
  {
    id: 'basic',
    name: 'Paket Basic',
    price: 500000,
    description: 'Cocok untuk pesta ulang tahun kecil dan kumpul keluarga.',
    features: [
      '2 Jam Sesi Foto',
      'Unlimited Print 4R',
      'Virtual Props Standar',
      'Digital Softcopy',
      '1 Background Pilihan'
    ],
    duration: '2 Jam'
  },
  {
    id: 'standard',
    name: 'Paket Standard',
    price: 850000,
    description: 'Pilihan terbaik untuk pernikahan dan acara sekolah.',
    features: [
      '3 Jam Sesi Foto',
      'Unlimited Print 4R & Strip',
      'Custom Design Layout',
      'Virtual Props Premium',
      'Online Gallery Access',
      '2 Background Pilihan'
    ],
    duration: '3 Jam'
  },
  {
    id: 'premium',
    name: 'Paket Premium',
    price: 1500000,
    description: 'Layanan lengkap untuk acara korporasi dan pernikahan mewah.',
    features: [
      '6 Jam Sesi Foto',
      'Unlimited Print All Size',
      'Custom Design Full Branding',
      'Virtual Props Eksklusif',
      'Live Social Media Feed',
      'Guestbook Foto',
      'Semua Background Pilihan'
    ],
    duration: '6 Jam'
  }
];

export const BACKGROUNDS = [
  { id: 'bg1', name: 'Pastel Dream', url: 'https://picsum.photos/seed/bg1/800/600' },
  { id: 'bg2', name: 'Elegant Gold', url: 'https://picsum.photos/seed/bg2/800/600' },
  { id: 'bg3', name: 'Neon Night', url: 'https://picsum.photos/seed/bg3/800/600' },
  { id: 'bg4', name: 'Minimalist White', url: 'https://picsum.photos/seed/bg4/800/600' },
];

export const FILTERS = [
  { id: 'none', name: 'Original', filter: 'none' },
  { id: 'grayscale', name: 'Black & White', filter: 'grayscale(100%)' },
  { id: 'sepia', name: 'Vintage', filter: 'sepia(80%)' },
  { id: 'brightness', name: 'Luminous', filter: 'brightness(1.2)' },
  { id: 'contrast', name: 'Vibrant', filter: 'contrast(1.2)' },
];

export const PROPS = [
  { id: 'prop1', name: 'Kacamata Keren', url: 'https://img.icons8.com/color/96/glasses.png' },
  { id: 'prop2', name: 'Kumis Tipis', url: 'https://img.icons8.com/color/96/mustache.png' },
  { id: 'prop3', name: 'Topi Ulang Tahun', url: 'https://img.icons8.com/color/96/party-hat.png' },
  { id: 'prop4', name: 'Balon Hati', url: 'https://img.icons8.com/color/96/hearts.png' },
  { id: 'prop5', name: 'Mahkota', url: 'https://img.icons8.com/color/96/crown.png' },
];
