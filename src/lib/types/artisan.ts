export interface ArtisanHourlyRate {
  rate: number;
  currency: string;
}

export interface ArtisanCard {
  id: number;
  name: string;
  specialty: string;
  specialties: string[];
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: ArtisanHourlyRate | null;
  profilePicture?: string;
  bio?: string;
  experience?: number;
}

export interface ArtisanDetail extends ArtisanCard {
  contactInfo?: {
    email?: string;
    phone?: string;
    location?: string;
  };
}

export interface ArtisanFilters {
  specialty?: string;
  location?: string;
  limit?: number;
  offset?: number;
}

