import type { ArtisanCard, ArtisanDetail, ArtisanFilters } from '@/lib/types/artisan';

const API_BASE = '/api/artisans';

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

const buildQueryString = (params: Record<string, string | number | undefined>) => {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  return query.length > 0 ? `?${query}` : '';
};

const normalizeFilters = (filters?: ArtisanFilters) => ({
  specialty: filters?.specialty,
  location: filters?.location,
  limit: filters?.limit ?? 12,
  offset: filters?.offset ?? 0,
});

export const artisanApi = {
  async getArtisans(filters?: ArtisanFilters): Promise<ArtisanCard[]> {
    const queryString = buildQueryString(normalizeFilters(filters));
    const response = await fetch(`${API_BASE}${queryString}`);
    if (!response.ok) {
      throw new Error('Failed to fetch artisans');
    }
    const body = (await response.json()) as ApiResponse<ArtisanCard[]>;
    return body.data;
  },

  async getArtisanById(id: number): Promise<ArtisanDetail> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch artisan');
    }
    const body = (await response.json()) as ApiResponse<ArtisanDetail>;
    return body.data;
  },
};

