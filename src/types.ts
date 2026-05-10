export interface PhotoboothPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  duration: string;
}

export interface CustomDesign {
  background: string;
  props: string[];
  filter: string;
  text?: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  packageId: string;
  design?: CustomDesign;
  status: 'pending' | 'confirmed' | 'completed';
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  userName: string;
  likes: number;
  createdAt: string;
}
