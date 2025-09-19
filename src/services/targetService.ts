import { ApiResponse, SearchQuery, ApiPriceData } from './types';
import imageService from './imageService';

class TargetService {
  private readonly baseUrl = 'https://api.target.com'; // Target RedSky API exists but requires partnership
  
  async searchProducts(searchQuery: SearchQuery): Promise<ApiResponse> {
    try {
      const mockTargetData = await this.getMockTargetData(searchQuery.query);
      
      return {
        success: true,
        data: mockTargetData
      };
    } catch (error) {
      console.error('Target API error:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to fetch Target data'
      };
    }
  }

  private async getMockTargetData(query: string): Promise<ApiPriceData[]> {
    await new Promise(resolve => setTimeout(resolve, 900));
    
    const basePrice = Math.random() * 600 + 150;
    const isTargetBrand = Math.random() > 0.6;
    
    return [{
      id: `target_${Date.now()}`,
      platform: 'Target',
      price: Number((basePrice * 7.8).toFixed(2)),
      currency: 'HKD',
      shipping: 0, // Target often doesn't ship internationally
      shippingToHK: false,
      url: `https://www.target.com/s?searchTerm=${encodeURIComponent(query)}`,
      image: imageService.getProductImage(query, 'Target'),
      title: `${query}${isTargetBrand ? ' - Target Brand' : ''} | Target`,
      availability: Math.random() > 0.3 ? 'In Stock' : 'Limited Stock'
    }];
  }
}

const targetService = new TargetService();
export default targetService;