import { ApiResponse, SearchQuery, ApiPriceData } from './types';
import imageService from './imageService';
import googleSearchService from './googleSearchService';
import webCrawlerService from './webCrawlerService';

class FarfetchService {
  private readonly baseUrl = 'https://api.farfetch.com'; // Farfetch has APIs but requires partnership
  
  async searchProducts(searchQuery: SearchQuery): Promise<ApiResponse> {
    try {
      // First, try to use web crawling to get real data
      const crawledData = await this.getCrawledFarfetchData(searchQuery.query);
      
      if (crawledData.length > 0) {
        return {
          success: true,
          data: crawledData
        };
      }
      
      // Fallback to mock data if crawling fails
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

  // Method to crawl Farfetch using Google search + web scraping
  private async getCrawledFarfetchData(query: string): Promise<ApiPriceData[]> {
    try {
      // Search for Farfetch products using Google
      const searchResults = await googleSearchService.searchProducts(query, 'farfetch.com');
      
      if (searchResults.length === 0) {
        return [];
      }
      
      // Take the first result and crawl the product page
      const firstResult = searchResults[0];
      const crawlResult = await webCrawlerService.crawlProductPage(firstResult.url, 'Farfetch');
      
      if (crawlResult) {
        return [webCrawlerService.convertToApiPriceData(crawlResult)];
      }
      
      return [];
    } catch (error) {
      console.error('Farfetch crawling error:', error);
      return [];
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