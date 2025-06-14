export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface ServiceProvider {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  avatar: string;
  location: string;
  distance: number;
  priceRange: string;
  availability: 'available' | 'busy' | 'offline';
  responseTime: string;
  completedJobs: number;
}

export interface SearchHistory {
  id: string;
  query: string;
  timestamp: Date;
}