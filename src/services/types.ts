// API response types
export interface ApiPriceData {
  id: string;
  platform: string;
  price: number;
  currency: string;
  shipping: number;
  shippingToHK: boolean;
  url: string;
  image: string;
  title: string;
  availability: string;
}

export interface ApiResponse {
  success: boolean;
  data: ApiPriceData[];
  error?: string;
}

export interface SearchQuery {
  query: string;
  region?: string;
  currency?: string;
}