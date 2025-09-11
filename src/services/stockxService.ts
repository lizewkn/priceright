import { ApiResponse, SearchQuery, ApiPriceData } from './types';
import imageService from './imageService';

class StockXService {
  private readonly baseUrl = 'https://stockx.com/api'; // StockX has private APIs
  
  async searchProducts(searchQuery: SearchQuery): Promise<ApiResponse> {
    try {
      const mockStockXData = await this.getMockStockXData(searchQuery.query);
      
      return {
        success: true,
        data: mockStockXData
      };
    } catch (error) {
      console.error('StockX API error:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to fetch StockX data'
      };
    }
  }

  private async getMockStockXData(query: string): Promise<ApiPriceData[]> {
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    const basePrice = Math.random() * 1200 + 300; // StockX tends to have higher prices
    const shipping = Math.random() * 40 + 20;
    const isAuthenticated = Math.random() > 0.1; // 90% authenticated
    
    return [{
      id: `stockx_${Date.now()}`,
      platform: 'StockX',
      price: Number((basePrice * 7.8).toFixed(2)),
      currency: 'HKD',
      shipping: Number((shipping * 7.8).toFixed(2)),
      shippingToHK: true,
      url: `https://stockx.com/search?s=${encodeURIComponent(query)}`,
      image: imageService.getProductImage(query, 'StockX'),
      title: `${query}${isAuthenticated ? ' - StockX Authenticated' : ''} | StockX`,
      availability: 'Available'
    }];
  }
}

const stockxService = new StockXService();
export default stockxService;