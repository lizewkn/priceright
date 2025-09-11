import { ApiResponse, SearchQuery, ApiPriceData } from './types';
import imageService from './imageService';

class FarfetchService {
  private readonly baseUrl = 'https://api.farfetch.com'; // Farfetch has APIs but requires partnership
  
  async searchProducts(searchQuery: SearchQuery): Promise<ApiResponse> {
    try {
      const mockFarfetchData = await this.getMockFarfetchData(searchQuery.query);
      
      return {
        success: true,
        data: mockFarfetchData
      };
    } catch (error) {
      console.error('Farfetch API error:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to fetch Farfetch data'
      };
    }
  }

  private async getMockFarfetchData(query: string): Promise<ApiPriceData[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const basePrice = Math.random() * 2000 + 500; // Farfetch luxury items are typically expensive
    const shipping = Math.random() * 60 + 30;
    const isDesigner = Math.random() > 0.3; // 70% designer items
    
    return [{
      id: `farfetch_${Date.now()}`,
      platform: 'Farfetch',
      price: Number((basePrice * 7.8).toFixed(2)),
      currency: 'HKD',
      shipping: Number((shipping * 7.8).toFixed(2)),
      shippingToHK: true,
      url: `https://www.farfetch.com/shopping/search/items.aspx?q=${encodeURIComponent(query)}`,
      image: imageService.getProductImage(query, 'Farfetch'),
      title: `${query}${isDesigner ? ' - Designer Collection' : ''} | Farfetch`,
      availability: 'In Stock'
    }];
  }
}

const farfetchService = new FarfetchService();
export default farfetchService;