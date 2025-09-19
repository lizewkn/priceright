import { ApiResponse, SearchQuery, ApiPriceData } from './types';
import imageService from './imageService';
import googleSearchService from './googleSearchService';
import webCrawlerService from './webCrawlerService';

class AmazonService {
  private readonly baseUrl = 'https://api.amazon.com'; // Not a real endpoint - Amazon API requires partnership
  
  async searchProducts(searchQuery: SearchQuery): Promise<ApiResponse> {
    try {
      // First, try to use web crawling to get real data
      const crawledData = await this.getCrawledAmazonData(searchQuery.query);
      
      if (crawledData.length > 0) {
        return {
          success: true,
          data: crawledData
        };
      }
      
      // Fallback to mock data if crawling fails
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

  // Method to crawl Amazon using Google search + web scraping
  private async getCrawledAmazonData(query: string): Promise<ApiPriceData[]> {
    try {
      // Search for Amazon products using Google
      const searchResults = await googleSearchService.searchProducts(query, 'amazon.com');
      
      if (searchResults.length === 0) {
        return [];
      }
      
      // Take the first result and crawl the product page
      const firstResult = searchResults[0];
      const crawlResult = await webCrawlerService.crawlProductPage(firstResult.url, 'Amazon US');
      
      if (crawlResult) {
        return [webCrawlerService.convertToApiPriceData(crawlResult)];
      }
      
      return [];
    } catch (error) {
      console.error('Amazon crawling error:', error);
      return [];
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