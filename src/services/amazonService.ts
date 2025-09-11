import { ApiResponse, SearchQuery, ApiPriceData } from './types';
import imageService from './imageService';

class AmazonService {
  private readonly baseUrl = 'https://api.amazon.com'; // Not a real endpoint - Amazon API requires partnership
  
  async searchProducts(searchQuery: SearchQuery): Promise<ApiResponse> {
    try {
      // Amazon's Product Advertising API requires approval and partnership
      // For demo, we'll simulate realistic Amazon data
      const mockAmazonData = await this.getMockAmazonData(searchQuery.query);
      
      return {
        success: true,
        data: mockAmazonData
      };
    } catch (error) {
      console.error('Amazon API error:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to fetch Amazon data'
      };
    }
  }

  private async getMockAmazonData(query: string): Promise<ApiPriceData[]> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const basePrice = Math.random() * 800 + 200;
    const shipping = Math.random() > 0.6 ? 0 : Math.random() * 30 + 15; // Amazon often has free shipping
    const isPrime = Math.random() > 0.4;
    
    return [{
      id: `amazon_${Date.now()}`,
      platform: 'Amazon US',
      price: Number((basePrice * 7.8).toFixed(2)),
      currency: 'HKD',
      shipping: Number((shipping * 7.8).toFixed(2)),
      shippingToHK: true, // Amazon usually ships internationally
      url: `https://www.amazon.com/s?k=${encodeURIComponent(query)}`,
      image: imageService.getProductImage(query, 'Amazon US'),
      title: `${query}${isPrime ? ' - Prime' : ''} | Amazon`,
      availability: 'In Stock'
    }];
  }
}

const amazonService = new AmazonService();
export default amazonService;